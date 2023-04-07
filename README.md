
## Description

Starter repository for RESTful API projects.

## Features

### Code Standards

- Configured ESLint to perform code linting with [Airbnb's style guide](https://github.com/airbnb/javascript).
- Committed messages are linted in the [Conventional Commit format](https://conventionalcommits.org/).
- Git branch checks ensure that the branching strategy is being followed.
- Prettier has been integrated with ESLint to enable code formatting.

### IDE integration

- Launch & debug with VSCode

### CI/CD setup

- [Development Workflow](docs/dev-workflow.md) and Branching Strategy have been defined.
- [Release](docs/release.md) workflow with automatic versioning using Semantic Versioning and Conventional Commit.

### API documentation

- Auto-generated API documentation with Swagger. Visit http://localhost:3000/api/doc


## Tech stack

- TypeScript v4.7
- NestJS v9.0


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


## Reference

- https://docs.nestjs.com/#installation
- https://typicode.github.io/husky/#/?id=automatic-recommended
- https://commitlint.js.org/#/guides-local-setup?id=guide-local-setup
- https://www.npmjs.com/package/git-branch-is
- https://www.npmjs.com/package/eslint-config-airbnb-typescript
- https://github.com/google-github-actions/release-please-action
- https://docs.nestjs.com/openapi/introduction