import type { DetailedJob, HistoryItem, Job } from './types';
/**
 * Saves the token internally for future requests.
 * @param token The API key from the cron-job.org dashboard
 */
export declare const setAuth: (token: string) => void;
export declare const listJobs: () => Promise<{
    jobs: Job[];
    someFailed: boolean;
}>;
export declare const job: (id: string) => Promise<{
    jobDetails: DetailedJob[];
}>;
export declare const createJob: (job: DetailedJob) => Promise<{
    jobId: number;
}>;
export declare const updateJob: (id: string, job: Partial<DetailedJob>) => Promise<void>;
export declare const deleteJob: (id: string) => Promise<void>;
export declare const jobExecutionHistory: (id: string) => Promise<{
    history: HistoryItem[];
    predictions: number[];
}>;
export declare const jobExecutionHistoryItemDetails: (id: string, identifier: string) => Promise<{
    jobHistoryDetails: HistoryItem;
}>;
