import os
import uvicorn

if __name__ == "__main__":
    # 获取端口，如果没有设置，默认为8000
    port = int(os.environ.get("PORT", 8000))
    
    # 启动服务器
    uvicorn.run("src.main:app", host="0.0.0.0", port=port, reload=True) 