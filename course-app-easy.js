const express = require("express");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json());

const port = 3000

let ADMINS = [];

const authenticateAdmin = (req, res, next) => {
    const { username, password } = req.headers;
    console.log(username);
    console.log(password);
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if(admin){
        next();
    } else{
        res.status(403).json({message : 'Admin Authentication Failed!'});
    }
};

app.post('/admin/signup', (req, res) => {
    const admin = req.body;
    const adminExist = ADMINS.find(a => a.username === admin.username);
    if(adminExist){
        res.status(403).json({message : 'Admin already Exist.'});
    } else{
        ADMINS.push(admin);
        res.status(201).json({message : 'Admin Created Successfully.'});
    }
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
    res.json({message : 'Logged in Successfully.'});
});


app.listen(port, () => {
    console.log(`Course app listening on port ${port}`)
})