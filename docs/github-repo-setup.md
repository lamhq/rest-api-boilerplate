# Github Repository Setup

If you decide to host your code to Github. There are recommended settings to maximise your development experience.

## General

### Default branch

Set to `master`

### Pull Requests

- Uncheck **Allow merge commits**. &#x1F4A1; *merge commits typically contain a larger and more complex set of changes, reviewing these changes may be less straightforward*
- Check **Allow squash merging**, **Default to pull request title and description** &#x1F4A1; *to simplify the commit history*
- Uncheck **Allow rebase merging**. &#x1F4A1; *avoid having multiple commits for the same change*
- Check **Allow auto-merge** (optional)
- Check **Automatically delete head branches**


## Branches

### Branch protection rules

Add a rule with following settings:

- **Branch name pattern**: set to `master`
- Check **Require a pull request before merging**
  - Check **Require approvals**
  - Check **Dismiss stale pull request approvals when new commits are pushed**
- Check **Require status checks to pass before merging**
  - Check **Require branches to be up to date before merging**
  - Search for status checks: **Lint** and **Unit test** from the search box
- Check **Require linear history**. &#x1F4A1; *good for reviewing commit history*


## Environments

Create 3 environments:

- `dev`: for development team to test
- `staging`: for QA team to test before releasing
- `production`: for customers to use

### `production`

- Check **Required reviewers**. Add people to review when deploying to this environment.
- In **Deployment branches**. Change to **Selected Branches**. Add deployment branch rule: `v?.?.?` (only release tags can be deployed to this environment)


### `dev` and `staging`

Configure as you want. It may not be strict as `production`.


## Secrets and variables

### Actions (Actions secrets and variables)

#### Create a Github Token for deployment

You can skip this step if you don't want to use the [release strategy](release-and-deploy.md) defined in this codebase.

First, create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with scopes: `repo` and `workflow`.

![](https://docs.github.com/assets/cb-139735/mw-1000/images/help/settings/userbar-account-settings.webp)

Copy the token. Then, create a **repository secret** named `RELEASE_TOKEN` with the value is the personal access token created above.