import dayjs from "dayjs";
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

import Subscription from "../models/subscription.model.js";
import {sendReminderEmail} from "../utils/send-email.js";

const REMINDERS = [7, 5, 2, 1];

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}



export const sendReminders = serve(async (context) => {
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

        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }

})

const triggerReminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`)
        //Send email, SMS, push notification  etc
        await sendReminderEmail({
            to : subscription.user.email,
            type : label,
            subscription

        })
    })
}

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate('user', 'name email')
    })
}