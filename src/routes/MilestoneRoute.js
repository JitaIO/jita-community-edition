import express from 'express';
import dotenv from 'dotenv';
import MilestoneController from '../controllers/MilestoneController';
import passport from 'passport';


const router = express.Router();

dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';

router.get('/id/:milestone_id', passport.authenticate('jwt', { session: false }), MilestoneController.getMilestoneById);
if(!isProduction) console.log("----- \x1b[36m[%s]\x1b[0m \x1b[33m%s\x1b[0m loading...\x1b[32mcomplete\x1b[0m", "/milestone/id/:milestone_id","GET");

module.exports = router;