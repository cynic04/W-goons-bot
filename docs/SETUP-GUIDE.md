# A very rough and dirty setup guide 

## 1. Clone the repository
```powershell
git clone https://github.com/cynic04/W-goons-bot.git
```

## 2. Get your environment variables
We have environment variables for the localhost links right now. This isn't necessary at this phase of development, but later when we need to secure API links and such, this setup will be heavily preferred.

There is a .env for both the frontend and the backend. Ask Tyler for the files and he'll toss them over. You cannot run the frontend or backend locally without these files!

## 3. Get the backend running
### Before you start
This app will be managing packages and dependencies on the backend using [uv](https://docs.astral.sh/uv/getting-started/installation/). 

Below the **Standalone installer** section header, install uv using the command specified for your os.

Open a new terminal and type "uv" to ensure that it has been installed. View [this page](https://docs.astral.sh/uv/getting-started/first-steps/) to see the expected output.

### Now, start the process of getting the backend running
1. cd into the backend directory in this repository.
2. Run the following command (this command creates a virtual environment if there isn't one already created and will install all necessary dependencies for this project)
```powershell
uv sync
```
3. Run the backend with the following command
```powershell
uv run fastapi dev
```
If you see this output:
```powershell
⚡️ Starting FastAPI in development mode
 
 🐍 Using import string: main:app (auto-discovered, use --verbose to learn more)
 
 💡 You can configure an entrypoint in pyproject.toml for this app with:
 
    [tool.fastapi]
    entrypoint = "main:app"
 
 🌐 Server started at http://127.0.0.1:8000
    Documentation at http://127.0.0.1:8000/docs
 
  Logs:
 
 ▕  Will watch for changes in these directories: ['C:\\Users\\tb982\\Downloads\\W-goons-bot\\backend']
 ▕  Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
 ▕  Started reloader process [10744] using WatchFiles
 ▕  Started server process [9328]
 ▕  Waiting for application startup.
 ▕  Application startup complete.
```
You're good to go!

## 4. Get the frontend running
1. cd into the frontend directory in this repository.
2. Run the following command
```powershell
npm install
```
3. Once the install is complete, run the following command
```powershell
npm run dev
```
4. Open the localhost link. If it opens and loads some text, you're good to go!