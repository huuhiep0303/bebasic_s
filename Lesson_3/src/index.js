import express from 'express'

// const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let Users = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane KKK', age: 25 },
    { id: 3, name: 'Jane OOo', age: 22 },
]

app.get('/users', (req, res) => {
    res.json(Users)
})

// app.get('/users', (req, res) => {
//     res.send(Users)
// })

// app.post('/users', (req, res) => {
//     const { name, age } = req.body
//     const newUser = { id: Users.length + 1, name, age }
//     Users.push(newUser)
//     res.status(201).json(newUser)
//     console.log('User vừa được tạo:', newUser)
// })

// app.get('/users/:id', (req, res) => {
//     const { id } = req.params
//     const foundUser = Users.find((user) => user.id === parseInt(req.params.id))
//     res.send(foundUser)
// })

// app.delete('/users/:id', (req, res) => {
//     Users = Users.filter((user) => user.id !== parseInt(req.params.id)) 
//     res.send("Deleted")
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})