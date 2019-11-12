import express from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/UserController';


const router = express.Router();

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

router.get('/signup', UserController.signup);
if(!isProduction) console.log("----- \x1b[36m[%s]\x1b[0m \x1b[33m%s\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/user/signup","GET");

router.get('/activate', UserController.activate);
if(!isProduction) console.log("----- \x1b[36m[%s]\x1b[0m \x1b[33m%s\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/user/activate","GET");

router.get('/id/:user_id', UserController.getUserById);
if(!isProduction) console.log("----- \x1b[36m[%s]\x1b[0m \x1b[33m%s\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/user/id/:user_id","GET");

module.exports = router;