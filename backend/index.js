const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURL')
const cors = require('cors')

const app = express()

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('MongoDB Connected')
  }
  catch (err) {
    console.error(err.message)
    process.exit(1);
  }
}

connectDB();
app.use(cors());
app.use(express.json({}))

app.use('/', require('./routes/index'))
app.use('/url', require('./routes/url'))

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
