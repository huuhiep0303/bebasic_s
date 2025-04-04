import express from 'express'

const app = express() 
const port = 3000

app.use(express.json())

app.get('/', 
    (req, res, next) => {
        res.json({ message: 'Hello World!' })
        return next()
    },
    (req, res, next) => {
        res.json({ message: 'Hello World 2!' })
        return next()
    },
    (req, res) => {
        res.send('Hello')
    }
)
    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})