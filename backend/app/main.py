import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
# Vercel-compatible ASGI handler
async def app_handler(scope, receive, send):
    await app(scope, receive, send)

# Required for Vercel
def handler(request):
    return app_handler(request.scope, request.receive, request.send)


# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True, log_level="info")