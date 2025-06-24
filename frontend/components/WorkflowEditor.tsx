import React, { useState } from 'react';

interface Node {
  id: string;
  type: string;
  name: string;
  position: {
    x: number;
    y: number;
  };
}

interface WorkflowEditorProps {
  initialNodes?: Node[];
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ initialNodes = [] }) => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleNodeClick = (id: string) => {
    setSelectedNode(id === selectedNode ? null : id);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return;

    setIsDragging(true);
    setSelectedNode(id);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedNode) return;

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode
          ? {
              ...node,
              position: {
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
              },
            }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
      position: {
        x: 100,
        y: 100 + nodes.length * 100,
      },
    };
    setNodes([...nodes, newNode]);
    setSelectedNode(newNode.id);
  };

  return (
    <div 
      className="relative w-full h-full bg-gray-100 border border-gray-200 rounded-lg shadow-inner overflow-hidden"
      style={{ minHeight: '500px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-4 left-4 flex space-x-2">
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addNode('function')}
        >
          添加函数
        </button>
        <button
          className="bg-secondary-600 hover:bg-secondary-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addNode('http')}
        >
          添加HTTP请求
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
          onClick={() => addNode('ai')}
        >
          添加AI节点
        </button>
      </div>

      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute p-4 rounded-md shadow-md w-48 cursor-move ${
            node.id === selectedNode
              ? 'ring-2 ring-primary-500 bg-white'
              : 'bg-white hover:bg-gray-50'
          }`}
          style={{
            left: `${node.position.x}px`,
            top: `${node.position.y}px`,
          }}
          onClick={() => handleNodeClick(node.id)}
          onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
        >
          <div className={`h-2 w-full rounded-full mb-2 ${
            node.type === 'function' ? 'bg-primary-500' : 
            node.type === 'http' ? 'bg-secondary-500' : 'bg-green-500'
          }`} />
          <h3 className="font-medium text-gray-800">{node.name}</h3>
          <p className="text-xs text-gray-500">{node.type}</p>
        </div>
      ))}

      {selectedNode && (
        <div className="absolute bottom-4 right-4 w-64 bg-white p-4 rounded-md shadow-md">
          <h3 className="font-medium text-gray-800 mb-2">节点设置</h3>
          <div className="text-sm text-gray-600">
            {nodes.find((n) => n.id === selectedNode)?.name}
          </div>
          <button
            className="mt-4 text-xs text-red-600 hover:text-red-800"
            onClick={() => {
              setNodes(nodes.filter((n) => n.id !== selectedNode));
              setSelectedNode(null);
            }}
          >
            删除节点
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkflowEditor; 