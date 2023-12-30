//* Import External dependencies
const express = require('express');
const dotenv = require('dotenv');     //^ For Environmental Variables
const { Pool } = require('pg');       //^ Postgress sql
const cors = require('cors');
const path = require('path');



//* App Helpers
const app = express();
app.use(express.json());    //^ To Parse JSON data
app.use(express.urlencoded({extended:true}));   //^ To Parse HTML form data and 'extended:true' => now it can parse query data
app.use(express.static(path.join(__dirname,"public")));     //^ Setting up static Folders, the contents of these folders can be directly accessed by the user
app.use(cors());    //^ To allow cross-origin requests



//* Set view Engine
//* =>Default folder : 'views'
app.set("view engine","ejs");


//* Import environmental variables
dotenv.config();


// Define a route
app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get("/test", (_req, res) => {
    res.status(200).send("Hello world");
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:` + process.env.PORT);
});

module.exports = app;

