import dayjs from 'dayjs';
import  {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import { sendRemainderEmail } from '../utils/send-email.js';

import Subscription from '../models/subscription.model.js';

const REMAINDERS = [7,5,2,1]

export const sendRemainders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(subscriptionId);

    if (!subscription || subscription.status!== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date for subscription ${subscriptionId} has passed`);
        return;
    }

    for(const daysBefore of REMAINDERS) {
        const remainderDate = renewalDate.subtract(daysBefore, 'day');
        if(remainderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Remainder for ${daysBefore} days before`, remainderDate);
        }
        await triggerRemainder(context, `Remainder for ${daysBefore} days before`);
    }
});

const fetchSubscription = async (subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilReminder = async (context, Label, date) => {
    console.log(`Sleeping until ${label} remainder at ${date}`);
    await context. sleepuntil(label, date.toDate());
}

const triggerRemainder = async (context, label) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} remainder`);
        await sendRemainderEmail({
            to : subscription.user.email,
            type: remainder.label.subscription,
        })

    })
}