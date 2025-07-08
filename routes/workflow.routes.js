import {Router} from 'express';
import {sendReminders} from "../controller/workflow.controller.js";
const workflowRouter = Router();

workflowRouter.post('/subcreiption/reminder', sendReminders)


export default workflowRouter;