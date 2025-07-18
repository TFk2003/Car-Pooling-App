#!/usr/bin/env python3
"""
Development server runner for Commute.io Backend
"""
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)