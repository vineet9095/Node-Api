const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./api/routes/user.js')
const product = require('./api/routes/product.js')
const qrCode = require('./api/routes/qrCode.js');
app.use(express.json())
const fileUpload = require('express-fileupload');

app.use(fileUpload({useTempFiles:true}))

app.use('/user', User)
app.use('/pro', product)
app.use('/qr', qrCode)
app.use((req, res, next) => {
  res.status(404).json({ error: 'routes not found' })
})

mongoose.connect('mongodb://localhost:27017/sbs')
  .then(() => console.log('Connected To MongoDB'))
  .catch(error => console.log(error))


app.listen(5300, () => {
  console.log(`Server is running on 5300`)
})
