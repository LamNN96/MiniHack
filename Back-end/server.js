const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const viewRouter = require("./viewRouter.js");
let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/game', viewRouter);
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/rule.html');
});

mongoose.connect("mongodb://localhost:MiniHack", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connected');
    }
});

app.use(express.static(__dirname + '/public'));

app.listen(6969, () => {
    console.log('Server is up!');
});
