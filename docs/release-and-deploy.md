# Release and Deploy

## What is a release?

A release refers to a specific version of software that is made available for distribution or deployment.

The following things need to be done when creating a new release:

- **Updating the version number** stored in the application manifest. This is usually a file that contains information about the software, such as its name, version, author, and other relevant details. The version number needs to be updated to reflect the new release.
- **Amend the changelog about changes in the new release**. It's important to keep the changelog up-to-date so that it's easy to see what has changed from one release to another.
- **Create a git tag for the new version**. Creating a tag for the new version helps to identify it more easily and allow reverting to that version if needed.

Those can be done automatically by using the Github Action Workflow `.github/workflows/create-prod-release.yml` defined in this codebase.


## Create a production release

The [Release PR](https://github.com/googleapis/release-please#whats-a-release-pr) is automatically generated every time a change is made to the main branch of the repository. It contains the updated changelog and application manifest.

To publish a new production version, follow these simple steps:

1. Go to GitHub and find the latest Release PR.

   ![Screenshot of Release PR](https://github.com/googleapis/release-please/raw/main/screen.png)

2. Merge the Release PR into the main branch.

   After merging the Release PR, a new version tag will be automatically created. This tag will be used to mark the release and identify it in future deployments.

That's it! With this automated process, you can easily keep track of all your releases and deploy them to production without any hassle.


## Create an alpha release (not support yet)

Typically during development, we need to deploy the application to the test environment to verify its functioning before releasing it.

This can be accomplished by merging the Alpha Release PR to development branch, it will create an alpha version tag and trigger a deployment for that version.


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