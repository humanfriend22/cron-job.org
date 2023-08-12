"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobExecutionHistoryItemDetails = exports.jobExecutionHistory = exports.deleteJob = exports.updateJob = exports.createJob = exports.job = exports.listJobs = exports.setAuth = void 0;
let headers = {
    auth: {
        'Authorization': 'Bearer ',
    },
    payload: {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json'
    }
};
/**
 * Saves the token internally for future requests.
 * @param token The API key from the cron-job.org dashboard
 */
const setAuth = (token) => {
    headers.auth['Authorization'] = 'Bearer ' + token;
    headers.payload['Authorization'] = 'Bearer ' + token;
};
exports.setAuth = setAuth;
function request(endpoint, method, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch('https://api.cron-job.org/jobs' + endpoint, {
            method,
            headers: payload ? headers.payload : headers.auth,
            body: payload ? JSON.stringify(payload) : null
        })).json();
    });
}
;
// List Jobs
const listJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield request('', 'get');
});
exports.listJobs = listJobs;
// CRUD: Job
const job = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield request('/' + id, 'get');
});
exports.job = job;
const createJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
    return yield request('', 'put', job);
});
exports.createJob = createJob;
const updateJob = (id, job) => __awaiter(void 0, void 0, void 0, function* () {
    yield request('/' + id, 'patch', job);
});
exports.updateJob = updateJob;
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield request('/' + id, 'delete');
});
exports.deleteJob = deleteJob;
// Extra
const jobExecutionHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield request('/' + id + '/history', 'get');
});
exports.jobExecutionHistory = jobExecutionHistory;
const jobExecutionHistoryItemDetails = (id, identifier) => __awaiter(void 0, void 0, void 0, function* () {
    return yield request('/' + id + '/history/' + identifier, 'get');
});
exports.jobExecutionHistoryItemDetails = jobExecutionHistoryItemDetails;
