from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import List, Optional
import os
import json

# 导入Browserbase API路由
from .browserbase_api import router as browserbase_router

# 创建FastAPI实例
app = FastAPI(
    title="N8N Lite API",
    description="N8N Lite工作流自动化平台的API",
    version="0.1.0",
)

# 添加CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含Browserbase API路由
app.include_router(browserbase_router)

# 模拟数据库
workflows_db = []
users_db = [
    {
        "id": 1,
        "username": "admin",
        "full_name": "管理员",
        "email": "admin@example.com",
        "hashed_password": "password123",  # 在实际应用中应该使用哈希密码
        "disabled": False,
    }
]

# 数据模型
class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class WorkflowBase(BaseModel):
    name: str
    description: Optional[str] = None
    active: bool = True

class WorkflowCreate(WorkflowBase):
    nodes: List[dict] = []
    connections: List[dict] = []

class Workflow(WorkflowBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner_id: int
    nodes: List[dict] = []
    connections: List[dict] = []

# OAuth2 设置
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(db, username: str):
    for user in db:
        if user["username"] == username:
            return UserInDB(**user)
    return None

def fake_decode_token(token):
    # 在实际应用中，应该使用JWT等方式验证token
    user = get_user(users_db, token)
    return user

async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="无效的身份验证凭据",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="用户已禁用")
    return current_user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(users_db, form_data.username)
    if not user or form_data.password != user.hashed_password:  # 实际应用中应该比较哈希
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 在实际应用中，这里应该生成JWT令牌
    access_token = user.username
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/")
async def root():
    return {"message": "欢迎使用N8N Lite API！"}

@app.get("/workflows", response_model=List[Workflow])
async def list_workflows(current_user: User = Depends(get_current_active_user)):
    return workflows_db

@app.post("/workflows", response_model=Workflow)
async def create_workflow(workflow: WorkflowCreate, current_user: User = Depends(get_current_active_user)):
    now = datetime.now()
    new_workflow = {
        "id": len(workflows_db) + 1,
        "created_at": now,
        "updated_at": now,
        "owner_id": 1,  # 假设用户ID为1
        **workflow.dict()
    }
    workflows_db.append(new_workflow)
    return new_workflow

@app.get("/workflows/{workflow_id}", response_model=Workflow)
async def get_workflow(workflow_id: int, current_user: User = Depends(get_current_active_user)):
    for workflow in workflows_db:
        if workflow["id"] == workflow_id:
            return workflow
    raise HTTPException(status_code=404, detail="工作流未找到")

@app.put("/workflows/{workflow_id}", response_model=Workflow)
async def update_workflow(
    workflow_id: int, 
    workflow_update: WorkflowCreate, 
    current_user: User = Depends(get_current_active_user)
):
    for i, workflow in enumerate(workflows_db):
        if workflow["id"] == workflow_id:
            workflows_db[i] = {
                **workflow,
                **workflow_update.dict(),
                "updated_at": datetime.now()
            }
            return workflows_db[i]
    raise HTTPException(status_code=404, detail="工作流未找到")

@app.delete("/workflows/{workflow_id}")
async def delete_workflow(workflow_id: int, current_user: User = Depends(get_current_active_user)):
    for i, workflow in enumerate(workflows_db):
        if workflow["id"] == workflow_id:
            del workflows_db[i]
            return {"detail": "工作流已删除"}
    raise HTTPException(status_code=404, detail="工作流未找到")

@app.post("/workflows/{workflow_id}/execute")
async def execute_workflow(workflow_id: int, current_user: User = Depends(get_current_active_user)):
    for workflow in workflows_db:
        if workflow["id"] == workflow_id:
            # 这里应该实际执行工作流逻辑
            return {"status": "success", "message": f"工作流 {workflow['name']} 执行成功"}
    raise HTTPException(status_code=404, detail="工作流未找到")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 