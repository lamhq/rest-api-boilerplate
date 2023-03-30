
## Description

Starter repository for RESTful API projects.

## Features

- Code linting by ESLint with [Airbnb's style guide](https://github.com/airbnb/javascript).
- Commit message linting in [conventional commit format](https://conventionalcommits.org/).
- Git branch check to follow branching strategy.
- Configured Prettier integrated with ESLint.
- IDE configuration for VSCode.


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