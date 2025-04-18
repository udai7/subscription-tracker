import { Router } from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res) => res.send({title:'Get all subscriptions'}));

subscriptionRouter.get('/:id',(req,res) => res.send({title:'Get subscriptions details'}));

subscriptionRouter.post('/',(req,res) => res.send({title:'create subscriptions'}));

subscriptionRouter.put('/',(req,res) => res.send({title:'update subscriptions'}));

subscriptionRouter.delete('/:id',(req,res) => res.send({title:'delete subscriptions'}));

subscriptionRouter.get('/:user:id',(req,res) => res.send({title:'Get all user subscriptions'}));

subscriptionRouter.put('/:id/cancel',(req,res) => res.send({title:'cancel all subscriptions'}));

subscriptionRouter.get('/upcoming-renewals',(req,res) => res.send({title:'Get all upcoming renewals'}));

export default subscriptionRouter;
