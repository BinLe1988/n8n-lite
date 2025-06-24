import json
import asyncio
import httpx
from typing import Dict, Any, List, Callable
import logging
import traceback

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("workflow-engine")

class WorkflowEngine:
    """
    工作流执行引擎，负责执行工作流中的节点并处理它们之间的数据传递
    """
    
    def __init__(self):
        # 注册可用的节点类型及其处理函数
        self.node_handlers = {
            "http": self.handle_http_node,
            "function": self.handle_function_node,
            "ai": self.handle_ai_node,
            "filter": self.handle_filter_node,
            "transform": self.handle_transform_node,
            "delay": self.handle_delay_node,
            "conditional": self.handle_conditional_node,
        }
        
        # 节点执行结果缓存
        self.execution_results = {}
        
    async def execute_workflow(self, workflow: Dict[str, Any], initial_data: Dict[str, Any] = None) -> Dict[str, Any]:
        """执行完整的工作流，并返回最终结果"""
        try:
            self.execution_results = {}
            
            if initial_data:
                # 将初始数据设置为工作流的起始点
                self.execution_results["workflow_input"] = initial_data
            
            nodes = workflow.get("nodes", [])
            connections = workflow.get("connections", [])
            
            # 构建依赖图
            dependencies = self._build_dependency_graph(nodes, connections)
            
            # 找出起始节点（没有输入连接的节点）
            start_nodes = self._find_start_nodes(nodes, dependencies)
            
            if not start_nodes:
                logger.warning("没有找到起始节点，工作流无法执行")
                return {"status": "error", "message": "没有找到起始节点"}
            
            # 从起始节点开始执行
            final_results = {}
            for node_id in start_nodes:
                result = await self._execute_node_and_dependents(node_id, nodes, dependencies)
                final_results.update(result)
                
            return {"status": "success", "results": final_results}
            
        except Exception as e:
            logger.error(f"工作流执行失败: {str(e)}")
            logger.error(traceback.format_exc())
            return {"status": "error", "message": str(e)}
    
    async def _execute_node_and_dependents(self, node_id: str, all_nodes: List[Dict[str, Any]], dependencies: Dict[str, List[str]]) -> Dict[str, Any]:
        """执行当前节点及其所有依赖节点"""
        # 如果节点已经执行过，直接返回结果
        if node_id in self.execution_results:
            return {node_id: self.execution_results[node_id]}
        
        # 找到当前节点
        node = next((n for n in all_nodes if n["id"] == node_id), None)
        if not node:
            logger.error(f"找不到节点 ID: {node_id}")
            return {node_id: {"error": f"节点 {node_id} 不存在"}}
        
        # 执行节点
        try:
            # 获取输入数据
            input_data = self._get_input_data_for_node(node_id, all_nodes, dependencies)
            
            # 根据节点类型调用相应的处理函数
            node_type = node.get("type", "unknown")
            handler = self.node_handlers.get(node_type, self.handle_unknown_node)
            
            logger.info(f"执行节点 {node_id} (类型: {node_type})")
            result = await handler(node, input_data)
            
            # 存储执行结果
            self.execution_results[node_id] = result
            
            # 执行所有依赖于当前节点的下游节点
            downstream_results = {}
            for dep_node_id in dependencies.get(node_id, []):
                dep_result = await self._execute_node_and_dependents(dep_node_id, all_nodes, dependencies)
                downstream_results.update(dep_result)
                
            return {**{node_id: result}, **downstream_results}
            
        except Exception as e:
            error_msg = f"节点 {node_id} 执行失败: {str(e)}"
            logger.error(error_msg)
            logger.error(traceback.format_exc())
            self.execution_results[node_id] = {"error": error_msg}
            return {node_id: {"error": error_msg}}
    
    def _build_dependency_graph(self, nodes: List[Dict[str, Any]], connections: List[Dict[str, Any]]) -> Dict[str, List[str]]:
        """构建节点依赖关系图"""
        # 记录每个节点的下游节点
        dependencies = {}
        
        for connection in connections:
            source = connection.get("source")
            target = connection.get("target")
            
            if source and target:
                if source not in dependencies:
                    dependencies[source] = []
                dependencies[source].append(target)
                
        return dependencies
    
    def _find_start_nodes(self, nodes: List[Dict[str, Any]], dependencies: Dict[str, List[str]]) -> List[str]:
        """找出没有输入连接的起始节点"""
        # 所有节点ID
        all_node_ids = {node["id"] for node in nodes}
        
        # 有输入的节点ID（即所有connections中的target）
        nodes_with_inputs = set()
        for deps in dependencies.values():
            nodes_with_inputs.update(deps)
            
        # 起始节点 = 所有节点 - 有输入的节点
        start_nodes = list(all_node_ids - nodes_with_inputs)
        
        return start_nodes
    
    def _get_input_data_for_node(self, node_id: str, all_nodes: List[Dict[str, Any]], dependencies: Dict[str, List[str]]) -> Dict[str, Any]:
        """获取节点的输入数据"""
        # 找出所有以当前节点为target的连接对应的source节点
        input_data = {}
        
        for source_id, targets in dependencies.items():
            if node_id in targets and source_id in self.execution_results:
                input_data[source_id] = self.execution_results[source_id]
                
        # 如果没有输入数据，使用工作流初始数据（如果有的话）
        if not input_data and "workflow_input" in self.execution_results:
            input_data["workflow_input"] = self.execution_results["workflow_input"]
            
        return input_data
    
    # 节点处理函数
    
    async def handle_http_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理HTTP请求节点"""
        try:
            config = node.get("config", {})
            method = config.get("method", "GET").upper()
            url = config.get("url", "")
            headers = config.get("headers", {})
            params = config.get("params", {})
            data = config.get("data", {})
            
            # 支持从输入数据中替换变量
            url = self._replace_variables(url, input_data)
            
            # 处理请求体（支持JSON格式）
            if isinstance(data, str):
                try:
                    data = json.loads(data)
                except:
                    pass
                    
            logger.info(f"HTTP请求: {method} {url}")
            
            async with httpx.AsyncClient() as client:
                if method == "GET":
                    response = await client.get(url, headers=headers, params=params)
                elif method == "POST":
                    response = await client.post(url, headers=headers, params=params, json=data if isinstance(data, dict) else data)
                elif method == "PUT":
                    response = await client.put(url, headers=headers, params=params, json=data)
                elif method == "DELETE":
                    response = await client.delete(url, headers=headers, params=params)
                else:
                    return {"error": f"不支持的HTTP方法: {method}"}
                
                # 尝试解析JSON响应
                try:
                    response_data = response.json()
                except:
                    response_data = response.text
                    
                return {
                    "status_code": response.status_code,
                    "headers": dict(response.headers),
                    "data": response_data
                }
                
        except Exception as e:
            logger.error(f"HTTP节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_function_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理函数节点，执行自定义JavaScript或Python代码"""
        try:
            config = node.get("config", {})
            code = config.get("code", "")
            language = config.get("language", "javascript").lower()
            
            if not code:
                return {"error": "未提供代码"}
                
            if language == "python":
                # 实际环境中应该使用更安全的执行方式，例如通过API调用隔离的执行环境
                # 这里只是演示
                
                # 准备一个本地命名空间
                local_vars = {"input_data": input_data, "result": {}}
                
                # 添加安全的Python内置函数
                allowed_builtins = {
                    "dict": dict,
                    "list": list,
                    "set": set,
                    "str": str,
                    "int": int,
                    "float": float,
                    "bool": bool,
                    "len": len,
                    "range": range,
                    "sum": sum,
                    "max": max,
                    "min": min,
                    "sorted": sorted,
                    "filter": filter,
                    "map": map,
                    "zip": zip,
                    "enumerate": enumerate,
                    "print": lambda *args: logger.info(" ".join(str(a) for a in args))
                }
                
                # 执行代码
                exec(code, {"__builtins__": allowed_builtins}, local_vars)
                
                # 返回结果
                return local_vars.get("result", {})
            else:
                return {"error": f"不支持的语言: {language}"}
                
        except Exception as e:
            logger.error(f"函数节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_ai_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理AI节点，调用AI模型API"""
        try:
            config = node.get("config", {})
            model = config.get("model", "gpt-3.5-turbo")
            prompt = config.get("prompt", "")
            
            # 支持从输入数据中替换变量
            prompt = self._replace_variables(prompt, input_data)
            
            logger.info(f"AI请求: 模型={model}, 提示词长度={len(prompt)}")
            
            # 这里应该连接到实际的AI API，例如OpenAI API
            # 为了演示，我们返回模拟数据
            await asyncio.sleep(1)  # 模拟API调用延迟
            
            return {
                "model": model,
                "prompt": prompt,
                "response": f"这是对提示词的AI响应: {prompt[:30]}...",
                "tokens": len(prompt) // 4
            }
            
        except Exception as e:
            logger.error(f"AI节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_filter_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理过滤节点，根据条件过滤数据"""
        try:
            config = node.get("config", {})
            condition = config.get("condition", "")
            
            if not condition:
                return input_data
                
            # 提取需要过滤的数据
            data_to_filter = {}
            for source_id, data in input_data.items():
                if isinstance(data, dict) and "data" in data:
                    data_to_filter[source_id] = data["data"]
                else:
                    data_to_filter[source_id] = data
            
            # 实际环境中应该使用更安全的条件评估方式
            # 这里用简化的方式处理一些基本情况
            filtered_data = {}
            for source_id, data in data_to_filter.items():
                if isinstance(data, list):
                    # 如果是列表，尝试过滤列表项
                    filtered_list = []
                    for item in data:
                        # 在实际应用中，这应该用一个表达式引擎来评估条件
                        # 这里只是简单演示
                        if "item" in condition and isinstance(item, dict):
                            # 非常简化的条件评估
                            try:
                                local_vars = {"item": item}
                                if eval(condition, {"__builtins__": {}}, local_vars):
                                    filtered_list.append(item)
                            except:
                                pass
                    filtered_data[source_id] = filtered_list
                else:
                    # 如果不是列表，直接传递数据
                    filtered_data[source_id] = data
            
            return filtered_data
            
        except Exception as e:
            logger.error(f"过滤节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_transform_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理转换节点，转换数据格式"""
        try:
            config = node.get("config", {})
            mapping = config.get("mapping", {})
            
            if not mapping:
                return input_data
            
            # 提取需要转换的数据
            data_to_transform = {}
            for source_id, data in input_data.items():
                if isinstance(data, dict) and "data" in data:
                    data_to_transform = data["data"]
                else:
                    data_to_transform = data
                break  # 只处理第一个输入源
            
            # 根据映射转换数据
            transformed_data = {}
            for target_key, source_path in mapping.items():
                value = self._get_value_by_path(data_to_transform, source_path)
                if value is not None:
                    transformed_data[target_key] = value
            
            return {"data": transformed_data}
            
        except Exception as e:
            logger.error(f"转换节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_delay_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理延迟节点，添加延迟"""
        try:
            config = node.get("config", {})
            delay_seconds = float(config.get("delay", 0))
            
            logger.info(f"延迟节点: 等待{delay_seconds}秒")
            await asyncio.sleep(delay_seconds)
            
            # 向下传递输入数据
            return input_data
            
        except Exception as e:
            logger.error(f"延迟节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_conditional_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理条件节点，根据条件选择路径"""
        try:
            config = node.get("config", {})
            condition = config.get("condition", "")
            true_branch = config.get("true_branch", "")
            false_branch = config.get("false_branch", "")
            
            if not condition:
                return input_data
            
            # 提取数据
            data_to_evaluate = {}
            for source_id, data in input_data.items():
                if isinstance(data, dict) and "data" in data:
                    data_to_evaluate = data["data"]
                else:
                    data_to_evaluate = data
                break  # 只处理第一个输入源
            
            # 在实际应用中，这应该用一个表达式引擎来评估条件
            try:
                local_vars = {"data": data_to_evaluate}
                result = eval(condition, {"__builtins__": {}}, local_vars)
                
                return {
                    "condition_result": result,
                    "branch": true_branch if result else false_branch,
                    "data": data_to_evaluate
                }
                
            except Exception as e:
                logger.error(f"条件评估失败: {str(e)}")
                return {"error": f"条件评估失败: {str(e)}"}
            
        except Exception as e:
            logger.error(f"条件节点执行失败: {str(e)}")
            return {"error": str(e)}
    
    async def handle_unknown_node(self, node: Dict[str, Any], input_data: Dict[str, Any]) -> Dict[str, Any]:
        """处理未知类型的节点"""
        node_type = node.get("type", "unknown")
        logger.warning(f"未知节点类型: {node_type}")
        return {"error": f"不支持的节点类型: {node_type}", "input_data": input_data}
    
    def _replace_variables(self, template: str, data: Dict[str, Any]) -> str:
        """替换模板中的变量占位符"""
        if not template or not isinstance(template, str):
            return template
            
        # 用简单的 {{变量名}} 语法来替换变量
        import re
        
        def replace_var(match):
            var_name = match.group(1).strip()
            parts = var_name.split('.')
            
            current = data
            for part in parts:
                if isinstance(current, dict) and part in current:
                    current = current[part]
                else:
                    # 变量不存在，保留原始占位符
                    return match.group(0)
            
            # 如果值是复杂类型，转换为JSON字符串
            if isinstance(current, (dict, list)):
                return json.dumps(current)
            
            # 否则直接转换为字符串
            return str(current)
        
        # 替换所有 {{变量}} 形式的占位符
        return re.sub(r'\{\{\s*(.+?)\s*\}\}', replace_var, template)
    
    def _get_value_by_path(self, data: Any, path: str) -> Any:
        """根据路径获取嵌套数据中的值"""
        if not path:
            return None
            
        parts = path.split('.')
        current = data
        
        for part in parts:
            if isinstance(current, dict) and part in current:
                current = current[part]
            elif isinstance(current, list) and part.isdigit() and int(part) < len(current):
                current = current[int(part)]
            else:
                return None
                
        return current


# 示例用法
async def test_engine():
    engine = WorkflowEngine()
    
    # 示例工作流
    workflow = {
        "nodes": [
            {
                "id": "node1",
                "type": "http",
                "name": "获取用户数据",
                "config": {
                    "method": "GET",
                    "url": "https://jsonplaceholder.typicode.com/users"
                }
            },
            {
                "id": "node2",
                "type": "filter",
                "name": "过滤用户",
                "config": {
                    "condition": "item.get('id') < 5"
                }
            },
            {
                "id": "node3",
                "type": "transform",
                "name": "转换用户数据",
                "config": {
                    "mapping": {
                        "usernames": "0.username",
                        "emails": "0.email",
                        "count": "length"
                    }
                }
            }
        ],
        "connections": [
            {"source": "node1", "target": "node2"},
            {"source": "node2", "target": "node3"}
        ]
    }
    
    # 执行工作流
    result = await engine.execute_workflow(workflow)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(test_engine()) 