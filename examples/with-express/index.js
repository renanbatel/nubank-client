require('reflect-metadata')

const express = require('express')
const bodyParser = require('body-parser')
const nubank = require('nubank-client')

const app = express()

app.use(bodyParser.json())

// ! Note: in a real scenario, nubank instance and its resources must be session scoped
const nubankInstance = nubank.createInstance()

app.get('/auth/request', async (req, res) => {
  const qrCode = await nubankInstance.generateQRCode()

  res.contentType('text/html').send(`<img src="${qrCode}" />`)
})

app.post('/auth', async (req, res) => {
  const { login, password } = req.body

  nubankInstance.setCredentials({ login, password })

  try {
    await nubankInstance.authenticate(5)

    res.send()
  } catch (err) {
    res.status(401).json({ message: 'failed to authenticate, try again' })
  }
})

// ! Note: in a real scenario, nubank resources must be session scoped
let bills

const getBillsResource = async () => {
  if (!bills) {
    bills = await nubankInstance.getBills()
  }

  return bills
}

app.get('/bills', async(req, res) => {
  const bills = await getBillsResource()
  const bill = await bills.getByCloseDate(req.query.closeDate);

  res.json(bill)
})

app.get('/bills/open', async (req, res) => {
  const bills = await getBillsResource()
  const openBills = await bills.getOpen()

  res.json(openBills)
})

app.get('/bills/future', async (req, res) => {
  const bills = await getBillsResource()
  const futureBills = await bills.getFuture()

  res.json(futureBills)
})


app.listen(8000)
