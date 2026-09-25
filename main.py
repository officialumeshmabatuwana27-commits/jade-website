"""
JADE Coatings — Production Antigravity Backend Server
FastAPI application for Google Cloud Platform (GCP) App Engine
"""

import os
import json
import time
import hmac
import hashlib
import base64
from pathlib import Path
from typing import Optional, List

try:
    from fastapi import FastAPI, Request, HTTPException, UploadFile, File, Form, Depends, status
    from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
    from fastapi.staticfiles import StaticFiles
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
except ImportError:
    # If fastapi is not installed locally, let the user know it will be installed via requirements.txt
    FastAPI = None

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DB_FILE = DATA_DIR / "db.json"
UPLOADS_DIR = BASE_DIR / "uploads"
ASSESTS_DIR = BASE_DIR / "assests"

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "adminjade2026")
SESSION_SECRET = os.environ.get("ADMIN_SESSION_SECRET", "jade_coatings_secret_session_key_2026_super_secure_token")

# Ensure required directories exist
DATA_DIR.mkdir(parents=True, exist_ok=True)
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# ─── Database Helpers ────────────────────────────────────────────────────────

def read_db() -> dict:
    # Check if jade-coatings/data/db.json exists and copy/use it if root db.json doesn't exist
    next_db = BASE_DIR / "jade-coatings" / "data" / "db.json"
    if not DB_FILE.exists() and next_db.exists():
        try:
            with open(next_db, "r", encoding="utf-8") as f:
                data = json.load(f)
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            return data
        except Exception:
            pass

    if not DB_FILE.exists():
        default_db = {"products": [], "projects": [], "contacts": [], "seeded": False}
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(default_db, f, indent=2)
        return default_db

    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"products": [], "projects": [], "contacts": []}

def write_db(data: dict):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

# ─── Auth Token Helpers ──────────────────────────────────────────────────────

def create_session_token(username: str) -> str:
    timestamp = int(time.time())
    expires_at = timestamp + (7 * 24 * 3600)
    payload = f"{username}:{timestamp}:{expires_at}"
    sig = hmac.new(SESSION_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    encoded = base64.urlsafe_b64encode(payload.encode()).decode()
    return f"{encoded}.{sig}"

def verify_session_token(token: str) -> bool:
    try:
        encoded, sig = token.split(".")
        payload = base64.urlsafe_b64decode(encoded.encode()).decode()
        username, _, expires_at_str = payload.split(":")
        if time.time() > int(expires_at_str):
            return False
        expected_sig = hmac.new(SESSION_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
        return hmac.compare_digest(sig, expected_sig)
    except Exception:
        return False

# ─── FastAPI Application ────────────────────────────────────────────────────

if FastAPI is not None:
    app = FastAPI(
        title="JADE Coatings Antigravity Backend",
        description="Production API and Application Server for JADE Coatings on GCP App Engine",
        version="1.0.0"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount static assets if directories exist
    if ASSESTS_DIR.exists():
        app.mount("/assests", StaticFiles(directory=str(ASSESTS_DIR)), name="assests")
    if UPLOADS_DIR.exists():
        app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

    # ─── Healthcheck & Status ───
    @app.get("/health")
    async def health_check():
        return {
            "status": "healthy",
            "service": "JADE Coatings Antigravity Backend",
            "environment": "Google Cloud Platform (GCP) App Engine",
            "timestamp": int(time.time())
        }

    # ─── Public API Endpoints ───
    @app.get("/api/products")
    async def get_products(division: Optional[str] = None):
        db = read_db()
        products = db.get("products", [])
        if division and division != "All":
            products = [p for p in products if p.get("division") == division]
        return {"products": products}

    @app.get("/api/projects")
    async def get_projects():
        db = read_db()
        items = db.get("projects", [])
        projects = [p for p in items if p.get("type") == "project"]
        clients = [p for p in items if p.get("type") == "client"]
        return {"projects": projects, "clients": clients}

    # ─── Admin Authentication ───
    class LoginRequest(BaseModel):
        username: str
        password: str

    @app.post("/api/admin/login")
    async def admin_login(creds: LoginRequest):
        if creds.username != ADMIN_USERNAME or creds.password != ADMIN_PASSWORD:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        token = create_session_token(creds.username)
        response = JSONResponse(content={"success": True, "user": {"username": creds.username}})
        response.set_cookie(
            key="jade_admin_session",
            value=token,
            httponly=True,
            samesite="lax",
            max_age=7 * 24 * 3600
        )
        return response

    @app.post("/api/admin/logout")
    async def admin_logout():
        response = JSONResponse(content={"success": True, "message": "Logged out successfully"})
        response.delete_cookie(key="jade_admin_session")
        return response

    @app.get("/api/admin/me")
    async def admin_me(request: Request):
        cookie = request.cookies.get("jade_admin_session")
        if not cookie or not verify_session_token(cookie):
            raise HTTPException(status_code=401, detail="Unauthorized")
        return {"authenticated": True, "user": {"username": ADMIN_USERNAME}}

    # ─── File Upload Endpoint ───
    @app.post("/api/upload")
    async def upload_file(request: Request, file: UploadFile = File(...)):
        cookie = request.cookies.get("jade_admin_session")
        if not cookie or not verify_session_token(cookie):
            raise HTTPException(status_code=401, detail="Unauthorized")

        allowed_extensions = {".jpg", ".jpeg", ".png", ".webp", ".svg"}
        filename = file.filename or "upload.png"
        ext = os.path.splitext(filename)[1].lower()
        if ext not in allowed_extensions:
            raise HTTPException(status_code=400, detail="Invalid file type")

        clean_name = f"{int(time.time()*1000)}_{os.path.basename(filename)}"
        target_path = UPLOADS_DIR / clean_name

        contents = await file.read()
        with open(target_path, "wb") as f:
            f.write(contents)

        return {"success": True, "url": f"/uploads/{clean_name}", "fileName": clean_name}

    # ─── Frontend Root ───
    @app.get("/{full_path:path}", response_class=HTMLResponse)
    async def serve_frontend(full_path: str):
        # Serve preview.html if exists
        preview_file = BASE_DIR / "preview.html"
        if preview_file.exists():
            with open(preview_file, "r", encoding="utf-8") as f:
                return HTMLResponse(content=f.read())
        return HTMLResponse(content="<h1>JADE Coatings Antigravity Backend Online</h1>")

else:
    # Fallback standard WSGI application if FastAPI is not installed
    def app(environ, start_response):
        status_line = "200 OK"
        headers = [("Content-type", "text/html; charset=utf-8")]
        start_response(status_line, headers)
        return [b"<h1>JADE Coatings Antigravity Backend Initialized</h1><p>FastAPI starting on GCP App Engine.</p>"]

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
