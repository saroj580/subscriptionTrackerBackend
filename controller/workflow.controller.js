import dayjs from "dayjs";
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from "../models/subscription.model.js";

const REMINDERS = [7, 5, 2, 1];

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`)
        //Send email, SMS, push notification  etc
    })
}

export const setReminders = serve(async (context) => {
    const {subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== "active") return ;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stoping Workflow.`);
        return;
    }

    for(const daysBefore of REMINDERS ){
        const remindersdate = renewalDate.subtract(daysBefore, 'days');

        if(remindersdate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, remindersdate)
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }

})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}