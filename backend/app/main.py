import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Car Pooling API",
    description="A modern rideshare application API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "🚗 Car Pooling API is running on Vercel!",
        "status": "success",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/test-db")
async def test_db():
    database_url = os.getenv("DATABASE_URL")
    return {
        "database_configured": bool(database_url),
        "database_type": "NeonDB" if database_url and "neon" in database_url else "Unknown"
    }

# Your existing routes would go here
# Include routers, etc.

# Export for Vercel
def handler(request, response):
    return app

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

def vercel_handler(request):
    from fastapi.requests import Request
    from fastapi.responses import JSONResponse
    from fastapi import status

    async def app_wrapper(scope, receive, send):
        req = Request(scope, receive)
        response = await app(req)
        await response(scope, receive, send)

    return app_wrapper(request.scope, request.receive, request.send)