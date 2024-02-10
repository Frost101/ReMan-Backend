//* External imports
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const dotenv = require('dotenv');                  //? For environment variables
const path = require('path');                      //? To handle file paths
const cookieParser = require('cookie-parser');     //? To parse cookies
const swaggerUI = require('swagger-ui-express');   //? To serve swagger docs
const swaggerJsDoc = require('swagger-jsdoc');     //? To generate swagger docs

// testing auth
const authRoutes = require('./router/common/authRoutes.js');
const { requireAuth, checkUser } = require('./middlewares/common/authMiddleware.js');

//* Internal imports
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler.js');
const apiRouter = require('./router/apiRouter.js');



//* Load env vars
//* Now you can use process.env.VARIABLE_NAME to access the variable
dotenv.config();



//* Initialize app
const app = express();


// app.use(cors());
app.use(express.json());                             //? To Parse JSON objects in the body
app.use(express.urlencoded({ extended: true }));     //? To Parse URL encoded data(form data) in the body. And {extended: true} parse query data



//* Set view engine
//* Now you can render ejs files but we will use React so we wont be needing it hopefully
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');



//* Swagger Docs
//* Swagger docs will be served at /api-docs
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ReMan API',
            version: '1.0.0',
            description: 'Express API for ReMan',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`
            },
            {
                url: 'https://reman-backend.vercel.app'
            }
        ]
    },
    apis: ['./router/*/*.js', './router/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);                      //? Generate swagger docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));   //? Serve swagger docs



//* set static public folder. Users can access files in public folder directly
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/.well-known/pki-validation')));



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

app.use(authRoutes);

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
