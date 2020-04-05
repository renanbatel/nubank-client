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

You can use the library on Node or Browser, there are no dependencies that force you to use it on a specific environment, you'll only have to split the authentication on different requests if you plan to build an API with Node. Here's an example of using the library inside a React component:

```javascript
import { Nubank, NubankAuthorizer } from 'nubank-client';
import React, { Component } from 'react';

class Example extends Component {
  state = { qrCode: '' };

  async componentDidMount() {
    // Create a new instance of NubankAuthorizer
    const nubankAuthorizer = new NubankAuthorizer();
    // Generates the uuid and the qrcode base64 image for qrcode authentication
    const liftId = await nubankAuthorizer.getLiftId();

    // You need to show the qrcode image for the user for qrcode authentication. Here I'm updating
    // the component state with the qrcode base64 image, so I can use it to update the `src` value
    // of an img component
    this.setState({ qrCode: liftId.qrCode });

    // Do the login request. The login is your cpf with only numbers in it.
    const loginResponse = await nubankAuthorizer.login('login', 'password');
    // Do the qrcode authentication request. You'll need the generated uuid and the access_token
    // received from login response. The qrcode must have been already read by the user, otherwise
    // this request will return a 404 error. You can pass a `retries` number, so if the request
    // fails it will retry the number of `retries` provided. Maximum is 15.
    const liftResponse = await nubankAuthorizer.lift(liftId.uuid, loginResponse.access_token, 15);
    // Creates a new Instance of Nubank providing the qrcode authentication response
    const nubank = new Nubank(liftResponse);
    // Get the bills resource
    const bills = await nubank.getBills();
    // Get the open bill details
    const open = await bills.getOpen();
    // Get future bills, this wil get all your future bills details
    const future = await bills.getFuture();
    // Get a specific bill details by providing a close date
    const bill = await bills.getByCloseDate('YYYY-MM-DD');

    console.log('open bill:', open);
    console.log('future bill:', future);
    console.log('bill from close date:', bill);
  }

  render() {
    return <img src={this.state.qrCode} />
  }
}
```

## Contributing

If you want to contribute with this project, fork this repository and open a PR with your code.

After cloning your fork repository, install project's dependencies:

```sh
$ yarn # npm i
```

Building and watching for code changes:

```sh
$ yarn build # npm run build
$ yarn watch # npm run watch
```

Running tests:

```sh
$ yarn test # npm run test
```

Linting and formatting code:

```sh
$ yarn lint # npm run lint
$ yarn format # npm run format
```

I recommend you to use Visual Studio Code and to install the recommended extensions for a better development workflow ;)

## References

A special thanks to [Danilo Barion Nogueira](https://github.com/danilobarion1986) and his [nubank_rb](https://github.com/danilobarion1986/nubank_rb) project, it was used a lot for better understanding Nubank API's authentication workflow.

## License

[MIT](https://github.com/renanbatel/nubank-client/blob/master/LICENCE) © Renan Batel Rodrigues
