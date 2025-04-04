import express from 'express'

const app = express() 
const port = 3000

app.use(express.json())
import fs from 'fs'
const dataFile = 'data.json'

// app.get('/', 
//     (req, res, next) => {
//         res.json({ message: 'Hello World!' })
//         return next()
//     },
//     (req, res, next) => {
//         res.json({ message: 'Hello World 2!' })
//         return next()
//     },
//     (req, res) => {
//         res.send('Hello')
//     }
// )

function readDataFile(dataFile) {
    try {
        const data = fs.readFileSync(dataFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error( error)
        return []
    }
}

function writeDataFile(dataFile, data) {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
        console.log('Write file successfully.')
    } catch (error) {
        console.error(error)
    }
}

app.get('/users', (req, res) => {
    try {
        const data = readDataFile(dataFile)
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/users/:id', (req, res) => {
    try {
        const {id} = req.params
        const data = readDataFile(dataFile)
        const user = data.find((user) => user.id === parseInt(id))
        if (!user) {
            return res.status(404).json({ error: 'Not found user.' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/users', (req, res) => {
    try {
        const {name} = req.body
        if (!name) {
            return res.status(400).json({ error: 'Please enter name.' })
        }
        const data = readDataFile(dataFile)
        // const existingIDs = data.map((user) => user.id).sort((a,b) => a - b)
        
        // let newID = 1
        // for (let i = 0; i < existingIDs.length; i++) {
        //     if (existingIDs[i] !== newID) {
        //         break;
        //     }
        //     newID++
        // }

        const existingIds = new Set(data.map(user => user.id));
        let newID = 1;
        while (existingIds.has(newID)) {
            newID++;
        }

        const newUser = { id: newID, name }
        data.push(newUser)
        writeDataFile(dataFile, data)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put('/users/:id', (req, res)=> {
    try {
        const {id} = req.params
        const {name} = req.body
        if (!name) {
            return res.status(400).json({ error: 'Please enter name.' })
        }
        const data = readDataFile(dataFile)
        const user = data.find((user) => user.id === parseInt(id))
        if (!user) {
            return res.status(404).json({ error: 'Not found user.' })
        }
        user.name = name
        writeDataFile(dataFile, data)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/users/:id', (req, res) => {
    try {
        const {id} = req.params 
        const data = readDataFile(dataFile)
        const newUsers = data.filter((user) => user.id !== parseInt(id))
        if (newUsers.length === data.length) {
            return res.status(404).json({ error: 'Not found user.' })
        }
        writeDataFile(dataFile, newUsers)
        res.status(200).json({ message: 'Deleted successfully.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})