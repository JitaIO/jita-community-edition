/*
|--------------------------------------------------------------------------
| The `I` in API
|--------------------------------------------------------------------------
| 1. Setup configs and environment variables
| 2. Setup servers
|    - ApolloServer
|       - Resolvers also needs to be defined to init ApolloServer
|    - Express
|    - (Hyperledger)
| 3. Setup Middlewares
|    - Authentication
|    - Routes dispatch
|    - Parser/Encoding
|    - Cross-Origin Resource Sharing (CORS)
|--------------------------------------------------------------------------
*/

const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const flash = require('flash');
const dotenv = require('dotenv');
// const errorHandler = require('errorhandler');
// const morgan = require('morgan');
// const logger = require('./config/winston');
const { ApolloServer } = require('apollo-server-express');
const neo4j = require('neo4j-driver').v1;

dotenv.config();

/* 
/* Configure isProduction variable
 */
const isProduction = process.env.NODE_ENV === 'production';

if(!isProduction) console.log("Initiating API Core in \x1b[33m%s\x1b[0m Mode:", "Development");
/* 
 *  Initializing Apollo Server and bind it with Express 
 */
const app = express();


/**
 * Configer server middleware
 * Cross-Origin Resource Sharing (CORS) 
 * Load parsers & set encoding 
 * Error handle
 * Logging
 */

// app.use(cors());
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "Cross-Origin Resource Sharing (CORS)");

// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "bodyParser");

// app.use(cookieParser());
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "cookieParser");
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "session");

// app.use(morgan('combined', { stream: logger.stream }));
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "morgan");

// app.use(flash());
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "flash");

// app.use(passport.initialize());
// app.use(passport.session());
// if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "passport");


// if(!isProduction) {
//   app.use(errorHandler());
//   console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "errorHandler");
// }

/* 
 * Setup routes
 */
if(!isProduction) console.log("\nLoading \x1b[33m%s\x1b[0m:", "Routes");
app.use('/'    , require('./routes/DefaultRoute'));
if(!isProduction) console.log("Route \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/");


/* 
 *  Initializing Apollo Server and bind it with Express 
 *  Use the following code to enable Apollo built-in GraphQL web UI:
 * 
 *  server.applyMiddleware({ app, path: '/graphql' });
*/
if(!isProduction) console.log("\nInitializing \x1b[33m%s\x1b[0m:", "Apollo Server");
const schema = require('./models/Schema');
if(!isProduction) console.log("Apollo Server \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "Schema");

const driver = neo4j.driver(
  process.env.NEO4J_PROTOCOL + "://" + 
  process.env.NEO4J_HOST + ":" +
  process.env.NEO4J_PORT || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || "neo4j",
    process.env.NEO4J_PASSWORD || "openupsummit"
  )
);
if(!isProduction) console.log("Apollo Server \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "Neo4j driver");

const server = new ApolloServer({
  schema: schema,
  context: { 
    resolvers: schema.resolvers,
    driver 
  }
});


/*
 * Bind ApolloServer with Express server
 */
server.applyMiddleware({ app });
if(!isProduction) console.log("Apollo Server binding to \x1b[36m[%s]\x1b[0m...\x1b[32mcomplete\x1b[0m", "Express Server");

if(!isProduction) console.log("\nInitializing \x1b[33m%s\x1b[0m:", "Express Server");
const port = process.env.GRAPHQL_PORT;
app.listen(port, () => {
  if(!isProduction) {
    console.log("...\x1b[32mcomplete\x1b[0m");
    console.log("\nListening on \x1b[35m%s\x1b[0m", "http://localhost:"+port+"/graphql");
  }
});