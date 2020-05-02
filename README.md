# catpiler

API used by kate-ant-klaviaturos for multi-language code compilation and execution

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- Yarn (install using npm `npm i -g yarn` or download [standalone installer](https://yarnpkg.com/en/docs/install/))
- [Docker Desktop](https://docs.docker.com/)

## Setup

- Install npm packages with `yarn install`.
- Create .env.dev (.env.prod) file(s) with following constants:
  - AWS_S3_BUCKET_NAME=
  - AWS_ACCESS_KEY_ID=
  - AWS_SECRET_ACCESS_KEY=

## Running

### Starting the container

- Windows:
  `yarn win-start-container`
- macOS/Linux:
  `yarn unx-start-container`

### Launching the project

- Windows:
  `yarn win-start`
- macOS/Linux:
  `yarn start`

### Deploying

    `git push live`
