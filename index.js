//let express = require('express');

//STEP 5 LowDB: Store data to local
//5.1 install and load lowdb: in terminal: % npm install lowdb@6.1.1; in package.json add "type": "module"    
import express from 'express' //load lowdb
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

let app = express();
// let msgData = [];

//5.2 connect to the DB
let defaultData = { msgData: []}
let adapter = new JSONFile('db.json');
let db = new Low(adapter, defaultData);

app.use('/', express.static('public'));
app.use(express.json());

//STEP 6 Configured for Glitch
//6.1 set the port variable to be equal to the environment variable
// app.listen(3000, ()=> {
//     console.log('Listening at locahost:3000');
// })
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening at ', port);
});
//6.2 In package.json, set the node engine to v16
//6.3 Made sure to include a .gitignore file with the necessary items: ".DS_store" and "node_modules"

//STEP 2. add a route on server that is listening for a POST request
app.post('/new-message', (req, res)=>{
    // console.log(req.body);
    let msgDate = Date();
    let newMsgObj = {
        name: req.body.name,
        message: req.body.message,
        date: msgDate
    }
    // msgData.push(newMsgObj);
    // console.log(msgData);

    //5.3 add value to the DB ('db.json')
    db.data.msgData.push(newMsgObj);
    db.write()
    .then(()=> {
        res.json({task:"success"}); //must always send a response to a request
    })
    
})

//STEP 3 (SERVER END): Route to server the Data
app.get('/messages', (req, res) => {
    //5.4 fetch from the DB
    db.read()
    .then(()=>{
        //save the messages to an object
        let msgDataObj = {messages: db.data.msgData}
        //send the messages to the client
        res.json(msgDataObj);
    }) 
})
