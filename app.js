//* External imports
const express = require('express');
const dotenv = require('dotenv');                  //? For environment variables
const path = require('path');                      //? To handle file paths
const cookieParser = require('cookie-parser');     //? To parse cookies



//* Internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler.js');
const apiRouter = require('./router/apiRouter.js');



//* Load env vars
//* Now you can use process.env.VARIABLE_NAME to access the variable
dotenv.config();



//* Initialize app
const app = express();



app.use(express.json());                             //? To Parse JSON objects in the body
app.use(express.urlencoded({ extended: true }));     //? To Parse URL encoded data(form data) in the body. And {extended: true} parse query data



//* Set view engine
//* Now you can render ejs files but we will use React so we wont be needing it hopefully
app.set('view engine', 'ejs');      



//* set static public folder. Users can access files in public folder directly
app.use(express.static(path.join(__dirname, 'public')));



//* Parse cookies
//* We will use signed cookies so we need to provide a secret key
app.use(cookieParser(process.env.COOKIE_SECRET));



//* Routes
//* apiRouter will handle all the api requests
app.use('/api', apiRouter);



//* Error Handling Middleware
//! 404 Not Found error handler
app.use(notFoundHandler);
//! Default error handler
app.use(errorHandler);



//* Start server
app.listen(process.env.PORT, () => {
    console.log(`Server started. Listening on port ${process.env.PORT}`);
    console.log(`http://localhost:${process.env.PORT}`);
});



