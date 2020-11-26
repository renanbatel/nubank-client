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
import React, { useEffect, useState } from 'react';
import { Nubank } from 'nubank-client';

function App() {
  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    (async () => {
      // Create a Nubank instance. The login is your cpf with only numbers in it.
      const nubank = new Nubank({ login: 'login', password: 'password' });
      // Generates the qrcode base64 image for user authentication.
      const qrCode = await nubank.generateQRCode();

      // You need to show the qrcode image for the user for authentication. Here I'm updating
      // the component state with the qrcode base64 image, so I can use it to update the `src` value
      // of an img component
      setQRCode(qrCode);

      // To successfully authenticate, the QR code must have been already read by the user,
      // otherwise, the request will return a 404 error. By default, it'll retry the authentication
      // request 15 times, as long as it replies with a 404 status.
      await nubank.authenticate();

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
    })();
  }, []);

  return <img src={qrCode} width="250" alt="qr-code" />;
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

## License

[MIT](https://github.com/renanbatel/nubank-client/blob/master/LICENCE) © Renan Batel Rodrigues
