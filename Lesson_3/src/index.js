import express from 'express'
import fs from 'fs'

const dataFile = 'data.json'


// const express = require('express')
const app = express() 
const port = 3000

app.use(express.json())

// let Users = [
//     { id: 1, name: 'John Doe', age: 30 },
//     { id: 2, name: 'Jane KKK', age: 25 },
//     { id: 3, name: 'Jane OOo', age: 22 },
// ]

// app.get('/users', (req, res) => {
//     res.json(Users)
// })

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

app.get('/users', (req, res) => {
  fs.readFile(dataFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Read data failed' })
    }
    res.json(JSON.parse(data))
  })
})

app.post('/users', (req, res) => {
  fs.readFile(dataFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Read data failed' })
    }
    let users = JSON.parse(data)
    // const newUser = { id: users.length + 1, ...req.body } 
    const newUser = { id: users.length + 1, name: req.body.name }
    users.push(newUser)
    fs.writeFile(dataFile, JSON.stringify(users), (error) => {
      if (error) {
        return res.status(500).json({ error: 'Write data failed' })
      }
      res.status(201).json(newUser)
    })
  })
})

app.delete('/users/:id', (req, res) => {
  fs.readFile(dataFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ error : 'Read data failed' })
    }
    let users = JSON.parse(data)
    const newUsers = users.filter(users => users.id !== parseInt(req.params.id))
    if (newUsers.length === users.length) {
      return res.status(404).json({ error: 'User not found' })
    } 
    fs.writeFile(dataFile, JSON.stringify(newUsers), (error) => {
      if (error) {
        return res.status(500).json({ error: 'Write data failed' })
      }
      res.json({ message: 'Deleted success' })
    })
  })
})

app.put('/users/:id', (req, res) => {
  fs.readFile(dataFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ error: 'Read data failed' })
    }
    let users = JSON.parse(data)
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id))
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Not found user' })
    }
    users[userIndex].name = req.body.name
    // users[userIndex] = { ...users[userIndex], ...req.body }
    fs.writeFile(dataFile, JSON.stringify(users), (error) => {
      if (error) {
        return res.status(500).json({ error: 'Write data failed' })
      }
      res.json(users[userIndex])
    })
  })
})

// Thiếu get a user, nên viết đọc và ghi file thành 2 hàm riêng, sử dụng try catch để xử lý lỗi trong các method

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})