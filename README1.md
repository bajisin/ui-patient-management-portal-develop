# (PT) Trainer FrontEnd

## Overview

## Requirements

`• Node version 14.17.3 or later`
`• Npm version 6.14.3 or later`
`• Yarn version 1.22.19 or later`

## Coding standards

1. When installing new packages please use the yarn `--exact or -E` flag or mannually remove the `^` from the package addition. e.g. `yarn add react --exact`
2. Folder structure - Component files live in the same folder as their styles and unit tests.
3. Filenames - kebabcase is used throughout the project. Components have the postfix `-component.jsx`. Tests use the `-test` postfix. Styles use no postifx. e.g. `header-component.jsx`, `header-test.js`, & `header.scss`
4. `console.log` has been set to warning in the linter intentionally. Please do not commit them unless for a very good reason.
5. Static Type checking is done with [Flow](https://flow.org/en/) (Our React Native app uses Flow)
6. Style selectors are written in BEM (Block, Element, Modifier) methodology. For more information on BEM checkout: [https://css-tricks.com/bem-101/](https://css-tricks.com/bem-101/)
7. Style font sizes are set with `font-size` set to `62.5%` which translates to `1rem = 10pixles`. i.e. If you want a typeface to be roughly 15 pixels tall set it's `font-size: 1.5rem;`

## Installation:

### 1. Project:

1. Install Node via [NVM](https://github.com/nvm-sh/nvm)
2. Install yarn with the global flag: `npm install -g yarn`
3. Clone this repository `git clone https://github.com/equinox-platformx/webadmin-frontend.git`
4. In the terminal / CMD: navigate to this project folder
5. Run: `yarn install`

### 2. .ENV file

Fill in env values `.env.development` for dev/stage environment and `.env.production` for production environment

### 3. Docker

_(For development it isn't necessary to run the app in docker but it is good idea to test your code in the dockerized app as it mirrors what runs in other environments.) Also Note: The dockerized app runs on port `8080` not `8081` where the webpack dev server runs._

1. Install [Docker](https://docs.docker.com/install/)
2. In the terminal / CMD: navigate to this project folder
3. Run: ` docker build . -t YOUR_DOCKER_USERNAME/webadmin-frontend`
4. Run: ` docker run -p 8080:8080 --name webadmin-frontend -d YOUR_DOCKER_USERNAME/webadmin-frontend:latest`
5. Navigate to [http://localhost:8080/](http://localhost:8080/)

## Development

For development this project uses webpack-dev-server for hot reloading. To run webpack: Run `yarn run dev`

## Config

The config file is populated ENV variables injected at build time, and with the [dotenv](https://www.npmjs.com/package/dotenv) file. The dotenv file is run via arguments in the build scripts to eleminate the need for including it in the build bundle. It can be helpful for implementing feature flags in the future.
The consts are exported from the file individually so you can access `PORT` & `HOST` for example by:
`const { PORT, HOST } = require('../config');`

## Other Scripts / Commands

---

## Yarn

| Command                 | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `yarn run dev`          | Transpiles and loads client side code into webpack-dev-server |
| `yarn run build:stage`  | Runs server in dev mode                                       |
| `yarn run build:client` | Builds client production artifacts                            |
| `yarn run build:server` | Builds server production artifacts                            |
| `yarn run lint`         | Runs lint on the repo                                         |
| `yarn update`           | Interactively updates yarn dependancies                       |

## Make

| Command      | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `make clean` | Removes node_module folder & re-installs project dependencies |

## Commit Hooks

[Husky](https://github.com/typicode/husky) runs linting and tests on `pre-push`. _Runs: ( `yarn lint` && `yarn lint:style` && `yarn lint:fn` && `yarn test`)_ If you need to push your branch quicky you can push with the `--no-verify` git flag. Never run this on a branch other than your own feature branch.

## Tip to run the code on the local machine

1. Copy the contents of the .env.example file
2. Create a new .env file at the root directory of your project folder
3. Paste the copied contents in the .env file

## Cypress installation and steps to run tests:

1. npm install (To install all node modules)
2. To run test:
   npm run cypress open (Cypress test runner window will be opened. There select spec.js file to run tests.)
3. Check Coverage Report in Project Directory:
   coverage/lcov-report/index.html
