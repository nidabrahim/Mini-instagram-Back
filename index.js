require ('custom-env').env('staging')
require ('custom-env').env('db')
import express from 'express'
import bodyParser from "body-parser"
import MyLogger from "./middleWare/myLogger"
import Routes from "./components"
import mongoose from "mongoose"


const connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(connectionString);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() { 

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(MyLogger)

app.use("/", Routes)


app.listen(process.env.APP_PORT,()=>
console.log(`Server is listening on port 8080`))

});
