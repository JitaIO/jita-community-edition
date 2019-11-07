import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'flash';
import dotenv from 'dotenv';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import { augmentTypeDefs, augmentSchema } from 'neo4j-graphql-js';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import { v1 as neo4j } from 'neo4j-driver';
import { typeDefs, resolvers } from './models/combined-schema';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

/**
 * Configer server middleware
 * Cross-Origin Resource Sharing (CORS) 
 * Load parsers & set encoding 
 * Error handle
 * Logging
 */
app.use(cors());
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "Cross-Origin Resource Sharing (CORS)");

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "bodyParser");

app.use(cookieParser());
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "cookieParser");
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "session");

app.use(morgan('combined'));
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "morgan");

app.use(flash());
if(!isProduction) console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "flash");


if(!isProduction) {
  app.use(errorHandler());
  console.log("Middleware \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "errorHandler");
}

/* 
 * Setup routes
 */
if(!isProduction) console.log("\nLoading \x1b[33m%s\x1b[0m:", "Routes");
app.use('/'    , require('./routes/DefaultRoute'));
if(!isProduction) console.log("Route \x1b[36m[%s]\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/");

/* 
 *  Initializing Apollo Server and bind it with Express 
 *  Use the following code to enable Apollo built-in GraphQL web UI:
 */
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

const schema = makeExecutableSchema({
  typeDefs: augmentTypeDefs(typeDefs),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  resolvers
});

/*
 * Add auto-generated mutations
 */
const augmentedSchema = augmentSchema(schema);

const server = new ApolloServer({
  schema: augmentedSchema,
  context: ({ req }) => {
    return {
      driver,
      req
    };
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