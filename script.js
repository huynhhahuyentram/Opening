body {
    font-family: Segoe UI;
    background: linear-gradient(135deg, #eef2f7, #d9e4f5);
}

.container {
    width: 900px;
    margin: 40px auto;
}

.image-box img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.row {
    display: flex;
    gap: 20px;
}

.group {
    flex: 1;
    background: rgba(255,255,255,0.9);
    padding: 20px;
    border-radius: 12px;
    margin-top: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
}

.frad {
    display: flex;
    gap: 10px;
}

.buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
}

.btn {
    flex: 1;
    height: 45px;
    border-radius: 8px;
    border: none;
    color: white;
    cursor: pointer;
}

.primary { background: #2d89ef; }
.secondary { background: #6c757d; }
.info { background: #17a2b8; }
.danger { background: #e74c3c; }
.voice { background: #9b59b6; }

.btn:hover {
    transform: translateY(-2px);
}

#voiceStatus {
    margin-top: 10px;
    font-weight: bold;
    color: #333;
}
