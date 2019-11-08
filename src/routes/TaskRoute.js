import express from 'express';
import dotenv from 'dotenv';
import TaskController from '../controllers/TaskController';


const router = express.Router();

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

router.get('/id/:task_id', TaskController.getTaskById);
if(!isProduction) console.log("----- \x1b[36m[%s]\x1b[0m \x1b[33m%s\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/task/id/:task_id","GET");

module.exports = router;