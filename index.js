
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8080;

// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


// Routes
app.get('/login', (req, res) => {

    res.send(`<h2>enter your username</h2><form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/user" method="POST" ><input id="username" type="text" name="username" /><input type="submit" value="enter" /></form>`);
});

app.post('/user', (req, res) => {
    const { username } = req.body;
 
    res.redirect('/');
});

app.get('/', (req, res) => {
    fs.readFile('messages.txt','utf8',(err,data)=>{
        if(err){
            res.send(`<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/messages" method="POST">
                <input  type="text" name="message" /><input  type="hidden" name="username" id="username" /><input type="submit" value="send message" />
            </form>`)
        }else{
            res.send(`<p>${data}</p><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/messages" method="POST">
            <input  type="text" name="message" /><input  type="hidden" name="username" id="username" /><input type="submit" value="send message" />
        </form>`)
        }
    })
   
});

app.post('/messages', (req, res,next) => {
    fs.appendFileSync('messages.txt',`${req.body.username}: ${req.body.message} `);
    res.redirect('/');
    
});

app.use('/', (req, res) => {
    // Read messages from file (you can replace this with your actual retrieval logic)
   res.status(404).send("nothing is here")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});