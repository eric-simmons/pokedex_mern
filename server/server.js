const express = require('express')
const path = require('path')
const connection = require('./config/connection')

const PORT = process.env.PORT || 3001
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})
//.once is event listener from mongoose
connection.once('open', async () => {
    app.listen(PORT, () => {
        console.log('Express server listening on http://localhost:${PORT}')
    })
})