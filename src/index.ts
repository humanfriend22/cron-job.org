import type {
    DetailedJob,
    HistoryItem,
    Job
} from './types';

let headers = {
    auth: {
        'Authorization': 'Bearer ',
    },
    payload: {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json'
    }
}

/**
 * Saves the token internally for future requests.
 * @param token The API key from the cron-job.org dashboard
 */
export const setAuth = (token: string) => {
    headers.auth['Authorization'] = 'Bearer ' + token;
    headers.payload['Authorization'] = 'Bearer ' + token;
};

async function request(endpoint: string, method: 'get' | 'put' | 'patch' | 'delete', payload?: object) {
    return await (await fetch('https://api.cron-job.org/jobs' + endpoint, {
        method,
        headers: payload ? headers.payload : headers.auth,
        body: payload ? JSON.stringify(payload) : null
    })).json();
};

// List Jobs
export const listJobs = async (): Promise<{
    jobs: Job[],
    someFailed: boolean
}> => {
    return await request('', 'get');
};

// CRUD: Job
export const job = async (id: string): Promise<{ jobDetails: DetailedJob[] }> => {
    return await request('/' + id, 'get');
};

export const createJob = async (job: DetailedJob): Promise<{ jobId: number }> => {
    return await request('', 'put', job);
};

export const updateJob = async (id: string, job: Partial<DetailedJob>) => {
    await request('/' + id, 'patch', job);
};

export const deleteJob = async (id: string) => {
    await request('/' + id, 'delete');
};

// Extra
export const jobExecutionHistory = async (id: string): Promise<{ history: HistoryItem[], predictions: number[] }> => {
    return await request('/' + id + '/history', 'get');
};

export const jobExecutionHistoryItemDetails = async (id: string, identifier: string): Promise<{ jobHistoryDetails: HistoryItem }> => {
    return await request('/' + id + '/history/' + identifier, 'get');
};