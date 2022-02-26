# Nubank Client

💳 A Nubank API client library for JavaScript (Node and Browser).

> DISCLAIMER: This is not related to Nu Pagamentos S.A. It's not an official library from them, but it uses its public API. All requests depend on Nubank API's availability, and there aren't retries for network or other kinds of unexpected errors.

## How it works

Nubank has a public API for its Web Application. This library was built to simplify this API usage by offering a simple interface to it. To make requests in the API you need to be authenticated using a Bearer token. To get the token you need to log in with your CPF and application password, and then read a QR Code using Nubank's mobile application (Go to "Perfil" and then "Acesso pelo site").

By the moment you can only get your bill's details with this library, the idea is to add more features like getting NuConta's statement. Feel free to contribute to this project if you want those features.

## Usage

Install the package:

```sh
$ yarn add nubank-client # npm i nubank-client --save
```

> This project uses [tsyringe](https://github.com/microsoft/tsyringe) for dependency injection, so in some JavaScript environments you'll need to use polyfills for the Reflect API, you can see more about it [here](https://github.com/microsoft/tsyringe#installation).

You can use the library on Node or Browser, there are no dependencies that force you to use it on a specific environment, you'll only have to split the authentication on different requests if you plan to build an API with Node. Here are some available examples:

- [With React](examples/with-react/src/App.js)
- [With Node.js Express](examples/with-express/index.js)

## Contributing

If you want to contribute with this project, fork this repository and open a PR with your code.

After cloning your fork repository, install project's dependencies:

```sh
$ npm i
```

Building and watching for code changes:

```sh
$ npm run build
$ npm run watch
```

Running tests:

```sh
$ npm run test
```

Linting and formatting code:

```sh
$ npm run lint
$ npm run format
```

I recommend you to use Visual Studio Code and to install the recommended extensions for a better development workflow ;)

## License

[MIT](https://github.com/renanbatel/nubank-client/blob/master/LICENCE) © Renan Batel
