
import axios from 'axios';
import constant from './Constant'
import handleError from './HandleError';
import axiosRetry, { } from 'axios-retry';

/**
 * @headers -getHeaders
 */
const getHeaders = () => {
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
};
/** 
* @param {Axios} axios An axios instance (the axios object or one created from axios.create)
* @param {Object} [defaultOptions]
* @param {number} [defaultOptions.retries=3] Number of retries
* @param {boolean} [defaultOptions.shouldResetTimeout=false]
*        Defines if the timeout should be reset between retries
* @param {Function} [defaultOptions.retryCondition=isNetworkOrIdempotentRequestError]
*        A function to determine if the error can be retried
* @param {Function} [defaultOptions.retryDelay=noDelay]
*        A function to determine the delay between retry requests
* */
//it retries if it is a network error or a 5xx error on an idempotent request (GET, HEAD, OPTIONS, PUT or DELETE).
//axiosRetry(axios, { axiosRetry: isNetworkOrIdempotentRequestError });
axiosRetry(axios, { retries: constant.retryValue});
/**
 * 
 * @param {*} string 
 * @param {*} params 
 */
// HTTP GET Request - Returns Resolved or Rejected Promise
export const getuserData = (string, params) => {
  return new Promise((resolve, reject) => {
    axios.get(`${constant.testUrl}${string}`, { params })
      .then(response => {
        resolve(response) // The first request fails and the second returns 'ok'
      })
    // axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});
     /**Exponential backoff is the process of a client periodically retrying a failed request over an increasing amount of time.
     *
     *axiosRetry(axios, { shouldResetTimeout:true}); 
     */
     axiosRetry(axios, { retryDelay: (retryCount) => {
      return retryCount * 1000;
    }}); 
    axios.get(`${constant.testUrl1}${string}`, { params })
      .then(response => {
        resolve(response) // 'ok'
        axiosRetry({ retries: 0 }); // Retries set to '0'
      })
      .catch(error => {
        reject(handleError(error)) //error!== undefined
      });
  });
};
/**
 * 
 * @param {*} string 
 * @param {*} params 
 */
// Custom retry delay
export const retryUserData = (string, params) => {
  return new Promise((resolve, reject) => {
    const client = axios.create({ baseURL: constant.testUrl });
    axiosRetry(client, { retries: constant.retryValue },
      client.get(`${string}`, { params })
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          reject(handleError(error))
        })
    );
  });
};
// HTTP get request with Data
export const getuserWithData = (string, data) => {
  return new Promise((resolve, reject) => {
    axios.patch(`${constant.testUrl}${string}`, data, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};
// HTTP POST Request - Returns Resolved or Rejected Promise
export const postData = (string, data) => {
  return new Promise((resolve, reject) => {
    axios.post(`${constant.testUrl}${string}`, data, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};
// HTTP DELETE Request - Returns Resolved or Rejected Promise
export const deldeleteRequest = (string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${constant.testUrl}${string}`, getHeaders())
      .then(response => { resolve(response) })
      .catch(error => { reject(handleError(error)) });
  });
};

/**
 * @param  {Error}  error
 * @return {boolean}
 
export function isNetworkError(error) {
  return (
    !error.response &&
    Boolean(error.code) && // Prevents retrying cancelled requests
    error.code !== 'ECONNABORTED' && // Prevents retrying timed out requests
    isRetryAllowed(error)
  ); // Prevents retrying unsafe errors
}
*/
/**
 * @param  {Error}  error
 * @return {boolean}
 *
export function isNetworkOrIdempotentRequestError(error) {
  return isNetworkError(error);
}
*/

