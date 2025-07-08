import { Client as WorkflowClient } from '@upstash/workflow'

import {QPSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY} from "./env.js";

export const workflowClient = new WorkflowClient({
    baseUrl : QPSTASH_URL,
    token : QSTASH_TOKEN
});
