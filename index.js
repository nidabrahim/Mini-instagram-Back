require ('custom-env').env('prod')
require ('custom-env').env('db')
require ('custom-env').env('jwt')
import express from 'express'
import bodyParser from "body-parser"
import MyLogger from "./middleWare/myLogger"
import Cors from "./middleWare/cors"
import Routes from "./components"
import mongoose from "mongoose"

var connectionString = '';

if( process.env.NODE_ENV != 'production'){
    connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
}else{
    console.log("DB_URL : " + process.env.OPENSHIFT_MONGODB_DB_URL);
    console.log("APP_NAME : " + process.env.OPENSHIFT_APP_NAME);
    connectionString = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}

// if(process.env.OPENSHIFT_MONGODB_DB_URL){
//     connectionString = process.env.OPENSHIFT_MONGODB_DB_URL + "db";
// }

mongoose.connect(connectionString);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() { 

const app = express()

app.use(Cors)
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(MyLogger)


app.use("/", Routes)

var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.APP_PORT
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

app.listen(server_port, server_ip_address, ()=>
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
)

// });

module.exports = app; // for testing