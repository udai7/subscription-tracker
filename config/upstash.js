import {client as WorkflowClient} from '@upstash/workflow';
import { QSTASH_TOKEN, QSTASH_URL } from './env.js';

export const upstash = WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});