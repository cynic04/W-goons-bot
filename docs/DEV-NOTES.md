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
- ```./.venv/Scripts/Activate``` to activate your virtual environment

Both actions update the pyproject.toml/uv.lock files if changes need to be made 

# Goons related details
### r34/e621/api docs
- https://api.rule34.xxx/ --> API docs for r34
- https://rule34.xxx/index.php?page=help&topic=cheatsheet --> cheatsheet, helps with filtering API calls on the backend
- https://e621.net/help/api --> API docs for e621

### More about the r34 API
This API is frustratingly undocumented.
The [Tags API](https://api.rule34.xxx/) states that there are only two parameters to add to the API; &id={}, and &limit={}. This is a flat out lie.

You can also add these parameters:
- &pid=[insert number]: the page ID, allows you to iterate down the list of tags using API calls (based on trial and error, this goes up to ~615743?)
- &order=[count, maybe others?]: sorts by count
- &direction=[asc, desc, maybe others?]: returns in ascending or descending order

These are pretty important operations that should be documented, kinda sucks that they're not

### Deployed app
- https://w-goons-bot.vercel.app/

# CSS related details
This language sucks ass to learn I can't lie

### Some good notes to keep in mind as you chug forward with this
Page formatting is a demon, but use FlexContainer.css as reference moving forward.

```overflow-map: anywhere``` - wraps text in the CSS element you've defined

Combining ```width: 100%``` with ```max-width: 80rem``` - width should expand to the entire screen, but the max width contains it so that it doesn't expand too far left or right

```margin: 0 auto``` - zero top/bottom margins, automatic left/right margins. with the max-width limit described above, this definition ensures that the left-right margins keep the defined element centered properly

### Understanding display: flex and its combination with justify-content + align-items
First things first, Flexbox is a CSS layout system, which controls arrangement of items on the page (direction, spacing, alignment, how they should grow/shrink)

In our FlexContainer.css file, we define the display as flex, so it now becomes a flex contianer. 

```justify-content: center``` - center flex items along the main axis. If you define ```flex-direction: row```, that main axis becomes the horizontal axis.

```align-items: center``` - center flex items along the cross axis, which would be the vertical axis assuming ```flex-direction: row```. The roles are switched (main axis=vertical, cross axis=horizontal) if you choose ```flex-direction: column```

So, combining ```align-items: center``` and ```justify-content: center``` effectively centers flex children in both directions.
