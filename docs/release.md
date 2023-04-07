# Release

A release refers to a specific version of software that is made available for distribution or deployment.

The following things need to be done when creating a new release:

- **Updating the version number** stored in the application manifest. This is usually a file that contains information about the software, such as its name, version, author, and other relevant details. The version number needs to be updated to reflect the new release.
- **Amend the changelog about changes in the new release**. It's important to keep the changelog up-to-date so that it's easy to see what has changed from one release to another.
- **Create a git tag for the new version**. Creating a tag for the new version helps to identify it more easily and allow reverting to that version if needed.

Those can be done automatically by using the Github Action Workflow `.github/workflows/create-prod-release.yml` defined in this codebase.


## Setup the release workflow

First, create a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with scopes: `repo` and `workflow`.

![](https://docs.github.com/assets/cb-139735/mw-1000/images/help/settings/userbar-account-settings.webp)

Then, create a repository secret named `RELEASE_TOKEN` with the value is the personal access token created above.


## Create a production release

After making changes to the main branch, simply go to GitHub and merge the [Release PR](https://github.com/googleapis/release-please#whats-a-release-pr).

![Screenshot of Release PR](https://github.com/googleapis/release-please/raw/main/screen.png)

The Release PR is created automatically and contains the updated changelog and application manifest. The version tag is created after merging the PR.


## Create an alpha release

TBC.


## Deploy

To deploy a release, follow these steps:

1. Navigate to the main page of the repository on Github
1. Under your repository name, click **Actions**.
1. In the left sidebar, click the workflow **Deploy API app**
1. From the list of workflow runs, click the name of the run to see the workflow run summary.
1. You will see a notification for the review request. On the notification, click **Review deployments**.
1. Select the job environment(s) to approve or reject. Optionally, leave a comment.
1. Approve or reject:
    - To approve the job, click **Approve and deploy**. Once a job is approved (and any other environment protection rules have passed), the job will proceed. At this point, the job can access any secrets stored in the environment.
    - To reject the job, click **Reject**. If a job is rejected, the workflow will fail.