const connectToMongo = require('./database');
const express  = require('express')
var cors = require('cors')
const app = express()

const port = 5000

connectToMongo();

app.use(cors())
app.use(express.json())
app.get('/', (req, res)=>{
   res.send('Say hello to this iNotebook App')
})

app.use('/auth', require('./routes/auth'))
app.use('/notes', require('./routes/notes'))

app.listen(port, ()=>{
   console.log(`The Server is running at http://localhost:${port}`)

})