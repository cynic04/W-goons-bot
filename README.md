# WGoonsBot
Honestly, we've got quite the project here.

For GH Copilot access from a separate account:
Then open Windows Credential Manager:

Search for Credential Manager in Start.
Open Windows Credentials.
Locate entries related to git:https://github.com.
Remove the GitHub credential only if it is for the wrong account.
Run a push again:

Should cause an authentication window to pop up - you can then sign in with a different account

Also, because FastAPI is recommending it, we're using uv instead of pip...
Installing uv: https://docs.astral.sh/uv/#installation