require('dotenv').config({
  path: './config/config.env'
})

const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require('path')

// connect to MongoDB
const connectDB = require('./config/db')
connectDB()


// Init Middlewares
app.use(express.json({ extended: false }))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Load Routes
const usersRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const contactsRoutes = require('./routes/contacts')

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/contacts', contactsRoutes)

// Serve static folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


// load port and start listening
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})