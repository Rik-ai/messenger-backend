//importing
const express = require('express')
const mongoose = require('mongoose')

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware

//DB config
const connection_url = 'mongodb+srv://admin:G8E7b3xFx29TTZ5@cluster0.2hvei.mongodb.net/messengerDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTodology: true
})

//????

//api routes
app.get('/',(req,res)=>res.status(200).send('Hello world'));

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));