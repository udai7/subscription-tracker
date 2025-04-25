import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription } from '../controllers/subscription.controller.js';
import { getUserSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res) => res.send({title:'Get all subscriptions'}));

subscriptionRouter.get('/:id',(req,res) => res.send({title:'Get subscriptions details'}));

subscriptionRouter.post('/', authorize, createSubscription)

subscriptionRouter.put('/',(req,res) => res.send({title:'update subscriptions'}));

subscriptionRouter.delete('/:id',(req,res) => res.send({title:'delete subscriptions'}));

subscriptionRouter.get('/:user:id',authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel',(req,res) => res.send({title:'cancel all subscriptions'}));

subscriptionRouter.get('/upcoming-renewals',(req,res) => res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;
