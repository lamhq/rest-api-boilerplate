# RESTful API Boilerplate

## Overview

This is a starter repository that provides the essential components for RESTful API projects. The goal is to keep things simple and include only what is needed for most projects, such as:

- A pre-configured linter for code style checking
- IDE settings for running and debugging the application
- Documentation for development workflow and branching strategy
- CI/CD setup for running unit tests, releases, and deployments
- Sample code for common tasks like CRUD operations, authentication, and email sending
- ...

Additionally, there are separate branches for specific features, each containing the corresponding code, such as:

- Role-based access control
- File uploading
- Online payment processing
- Caching
- Handling race conditions
- ...

## Tech stack

- Application type: RESTful API
- Language: Typescript/Node.js
- Framework: NestJs
- Database: PostgreSQL
- Package manager: yarn (v1)
- IDE: VS Code
- Linter: ESLint
- Repository hosting service: Github
- CI/CD platform: Github Actions


## Highlights

### Automated code checking

- Source code is automatically checked on commit by ESLint to ensure code follow [Airbnb's style guide](https://github.com/airbnb/javascript).
- Committed messages are automatically checked to conform to [Conventional Commit format](https://conventionalcommits.org/).
- Upon commit, the branch name is also verified automatically to ensure compliance with application's [branching strategy](dev-workflow.md).


### CI/CD setup

- A Github Action is configured to run unit tests and check code style for each open pull request.
- Release and deployment tasks become easy by accessing Github and approving deployment, no need to manually checkout the code or run any commands, see [Release and Deploy](docs/release-and-deploy.md).


### API documentation

API doc is generated from code and can be accessed at http://localhost:3000/api/doc after starting the application.

### Error tracking and Performance monitoring

This application has integrated with Sentry for tracking errors and monitoring runtime performance.

To use your own account, specify the values for `SENTRY_DSN` and `SENTRY_ENVIRONMENT` environment variables:

```bash
SENTRY_DSN=
SENTRY_ENVIRONMENT=
```

### Implemented sample code

- Unit test (with mocking)
- End-to-end test
- Authentication
- CRUD operation
- Update profile API
- Database ORM and migration
- Authorization: Role-based access control
- File upload (AWS S3)
- Caching


## Installation

1. Install project's dependencies:
    ```bash
    yarn install
    ```
1. Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VS Code


## Run & debug the app with VS Code

1. Select the **Run and Debug** icon in the **Activity Bar** on the side of VS Code
    ![](https://code.visualstudio.com/assets/docs/editor/debugging/run.png)
2. Select the configuration named **Launch and Debug** using the Configuration dropdown in the **Run and Debug** view.
3. Once you have your launch configuration set, start your debug session with `F5`.


## Run & debug Unit test with VS Code

To run and debug unit tests with VS Code, follow these steps:

1. Open the file containing the unit test in the editor.
2. Select the **Run and Debug** icon located in the **Activity Bar** on the side of VS Code.
3. Select the configuration named **Run test for current file** from the Configuration dropdown found in the **Run and Debug** view.
4. Set your launch configuration accordingly and start your debug session by pressing `F5`.

![Debugging Session](https://code.visualstudio.com/assets/docs/editor/debugging/debug-session.png)


## How to start coding?

Please take a look at the document of branching strategy and development workflow [here](docs/dev-workflow.md).


## How to deploy the app?

Please take a look at the document of release and deploy [here](docs/release-and-deploy.md).


## Reference

Follow these guides to build this codebase:

- https://docs.nestjs.com/#installation
- https://typicode.github.io/husky/#/?id=automatic-recommended
- https://commitlint.js.org/#/guides-local-setup?id=guide-local-setup
- https://www.npmjs.com/package/git-branch-is
- https://www.npmjs.com/package/eslint-config-airbnb
- https://www.npmjs.com/package/eslint-config-airbnb-typescript
- https://github.com/google-github-actions/release-please-action
- https://docs.nestjs.com/openapi/introduction
- https://docs.nestjs.com/recipes/passport