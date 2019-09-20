const express = require('express');
const app = express();

const config = require('./DB.js');

//help us to read data from post and put requests

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());

const PORT = 4000;


const mangoose = require('mongoose');
mangoose.Promise = global.Promise;

//cross origin resource sharing =>  handling port block error

const cors = require('cors');
app.use(cors());

const proRoutes = require('./product.route');

mangoose.connect(config.DB , { useNewUrlParser : true }).then (
    res=> {
        console.log('database successfully connected...');
    },
    err => {
        console.log(err);
    }
);


//setting up primary route
app.use('/product', proRoutes);


app.listen(PORT, function(){
    console.log('server is running on url http://localhost:4000');
});