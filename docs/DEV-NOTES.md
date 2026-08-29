# For GH Copilot access from a separate account:
Open Windows Credential Manager:

- Search for Credential Manager in Start.
- Open Windows Credentials.
- Locate entries related to git:https://github.com.
- Remove the GitHub credential only if it is for the wrong account.
- Run a push again:

Should cause an authentication window to pop up - you can then sign in with a different account

# We are using uv for Python instead of pip, which is claimed to be like 1000x faster than pip in terms of installation
Documentation for installation: https://docs.astral.sh/uv/getting-started/installation/
