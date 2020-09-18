//importing
const express = require('express')
const mongoose = require('mongoose');
const Messages = require('./dbMessages');
const Pusher = require('pusher');
const cors = require('cors')

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: '1075412',
    key: '2cff151ee712296fed25',
    secret: 'fdce648bf67fece71c2e',
    cluster: 'eu',
    encrypted: true
  });

//middleware
app.use(express.json())
app.use(cors())

//DB config
const connection_url = 'mongodb+srv://admin:G8E7b3xFx29TTZ5@cluster0.2hvei.mongodb.net/messengerDB?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTodology: true
})

const db = mongoose.connection
db.once('open', ()=>{
    console.log('DB is connected')

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch()

    changeStream.on('change', (change)=>{
        console.log(change)

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument
            pusher.trigger('messages', 'inserted',{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp:messageDetails.timestamp
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })

})


//api routes
app.get('/',(req,res)=>res.status(200).send('Hello world'));

app.get('/messages/sync', (req, res)=>{
    Messages.find((err, data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data)=>{
        if (err){
            res.status(500).send(err)
        } else{
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));