# ReactAPILAyer
JavaScript API Layer

Fetching data from an API is not a React specific concept however; there Axios is a tool that helps 

Axios is a PROMISE based HTTP client for making HTTP requests from a browser to any web server.

Features of Axios :

    • Makes XMLHttpRequests from browser to web server
    • Makes HTTP request from node.js also
    • Supports the promise API
    • Handles request and response
    • Cancel requests
    • Automatically transforms JSON data

Installation Using npm
$ npm install axios -- save

package on npm
https://npmjs.com/package/axios

homepage
https://github.com/axios/axios


Load Data From an API in React :

Whenever we have to load data into a React app, we should consider doing that in the componentDidMount lifecycle method.Why? Because you want to use setState to store the data inside your component’s state as soon as the response returns.

API Layer Structure in project :

Src :
APIUtils.js
APIConstants.js
HandleError.js

Usage : Import above files in component .js file and we can perform the API data operations. 
