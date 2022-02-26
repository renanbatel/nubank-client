import 'reflect-metadata'

import nubank from 'nubank-client'
import { useEffect, useState } from 'react';

function App() {
  const [qrCode, setQRCode] = useState('');

  useEffect(() => {
    (async () => {
      // Create a Nubank instance. The login is your cpf with only numbers in it.
      const nubankInstance = nubank.createInstance({ login: 'login', password: 'password' });
      // Generates the qrcode base64 image for user authentication.
      const qrCode = await nubankInstance.generateQRCode();

      // You need to show the qrcode image for the user for authentication. Here I'm updating
      // the component state with the qrcode base64 image, so I can use it to update the `src` value
      // of an img component
      setQRCode(qrCode);

      // To successfully authenticate, the QR code must have been already read by the user,
      // otherwise, the request will return a 404 error. By default, it'll retry the authentication
      // request 15 times, as long as it replies with a 404 status.
      await nubankInstance.authenticate();

      // Get the bills resource
      const bills = await nubankInstance.getBills();
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

export default App;
