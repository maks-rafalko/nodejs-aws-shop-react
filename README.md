# React-shop-cloudfront

This is frontend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Vite](https://vitejs.dev/) as a project bundler
- [React](https://beta.reactjs.org/) as a frontend framework
- [React-router-dom](https://reactrouterdotcom.fly.dev/) as a routing library
- [MUI](https://mui.com/) as a UI framework
- [React-query](https://react-query-v3.tanstack.com/) as a data fetching library
- [Formik](https://formik.org/) as a form library
- [Yup](https://github.com/jquense/yup) as a validation schema
- [Vitest](https://vitest.dev/) as a test runner
- [MSW](https://mswjs.io/) as an API mocking library
- [Eslint](https://eslint.org/) as a code linting tool
- [Prettier](https://prettier.io/) as a code formatting tool
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool

## Deployed application demo

* http://shopstack-shopstaticsiteservebucket56451a5b-143scj5ju9ezk.s3-website-us-east-1.amazonaws.com - S3 bucket, returns 403, this is just to show that bucket is not publicly available
* https://d1yr9zv5davrmu.cloudfront.net/ - deployed application to CloudFront

## Available Scripts

### `start`

Starts the project in dev mode with mocked API on local environment.

### `build`

Builds the project for production in `dist` folder.

### `preview`

Starts the project in production mode on local environment.

### `deploy`

Builds the project for production in `dist` folder and then deploys the site to closed S3 bucket and distribute via CloudFront.

> It assumes `cdk` is installed globally.

### `deploy:diff`

Builds the project and show the diff in infrastructure using `cdk diff`.

### `test`, `test:ui`, `test:coverage`

Runs tests in console, in browser or with coverage.

### `lint`, `prettier`

Runs linting and formatting for all files in `src` folder.
