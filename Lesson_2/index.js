// const express = require('express');
// const app = express();

// app.get('/hello', (req, res) => {
//     res.json({ message: "Hello, world!" });
// });

// app.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})