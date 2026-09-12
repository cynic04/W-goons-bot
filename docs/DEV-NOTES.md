# For GH Copilot access from a separate account:
Open Windows Credential Manager:

- Search for Credential Manager in Start.
- Open Windows Credentials.
- Locate entries related to git:https://github.com.
- Remove the GitHub credential only if it is for the wrong account.
- Run a push again:

Should cause an authentication window to pop up - you can then sign in with a different account

ENSURE THAT YOU RUN THESE COMMANDS TO AVOID ISSUES AS WELL:
```git config user.email "firegate0@gmail.com"```
```git config user.name "cynic04"```

# We are using uv for Python instead of pip, which is claimed to be like 1000x faster than pip in terms of installation
Documentation for installation: https://docs.astral.sh/uv/getting-started/installation/

# Supabase related details:
1. Database URL can be found on the homepage of the app
2. Go to project settings --> API keys --> Legacy anon, service_role API keys
3. Copy the service_role secret value (I think)

# Git related details:
1. Reset most recent commit: ```git reset --soft HEAD~1```
2. ENSURE THAT YOUR USERNAME AND PASSWORD ARE SET PROPERLY
---> ```git config user.name``` and ```git config user.email``` to confirm this information

# uv related details:
- Use ```uv add [library-name]``` to install a dependency
- Use ```uv remove [library-name]``` to remove a dependency

Both actions update the pyproject.toml/uv.lock files if changes need to be made 