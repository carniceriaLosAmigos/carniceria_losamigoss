@echo off
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias por primera vez...
  call npm install
)
if not exist .env (
  copy .env.example .env >nul
  echo Se creo .env. Abrilo y pega tu clave privada de OpenAI.
  notepad .env
  pause
)
node server.js
pause
