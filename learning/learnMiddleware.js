const express = require('express');
const app = express();


//console.log('hello world with express');

// establish express route
/*app.get('/', (req, res, next) => {
    res.send('<h1>Hello world</h1>')
});*/

// global middleware
function middlewareModifyingRequest(requestObject, responseObject, nextMiddleware) {
    // nextMiddleware passed in by express framework
    console.log('In middlewareModifyingRequest');
    requestObject.customProperty = 100;  // available to subsequent middleware
    nextMiddleware();  // must be called else browser hangs
}

function middleware2(requestObject, responseObject, nextMiddleware) {
    // nextMiddleware passed in by express framework
    console.log('In middleware2');
    //console.log('custom property from previous middleware = ' || requestObject.customProperty);
    console.log(`custom property from previous middleware = ${requestObject.customProperty}`);  // ` denotes template literal
    nextMiddleware();  // must be called else browser hangs
}

// route specific middleware
function middleware1(requestObject, responseObject, nextMiddleware) {
    // nextMiddleware passed in by express framework
    console.log('In middleware1');
    nextMiddleware();  // must be called else browser hangs
}

// route specific middleware
function middlewareRaisingError(requestObject, responseObject, nextMiddleware) {
    // nextMiddleware passed in by express framework
    console.log('In middlewareRaisingError');

    const errObj = new Error('I am an error');
    nextMiddleware(errObj); 
}

function standardExpressCallback( requestObject, responseObject, nextMiddleware ) {
    console.log('In standardExpressCallback');
    responseObject.send(`<h1>Hello world. Custom property = ${requestObject.customProperty}</h1>`)
}

// error handling middleware
function middlewareErrorHandler(errorObject, requestObject, responseObject, nextMiddleware) {
    // nextMiddleware passed in by express framework
    // errorObject passed in by express framework if it exists
    // just another middleware with 1 extra parameter (errorObject)

    console.log('In middlewareErrorHandler');

    if (errorObject) {
        responseObject.send(`<h1>There was an error! Custom property = ${requestObject.customProperty}</h1>`);
    }
}

// define  (1st) global middleware - executed regardless of route and before route specific middleware
app.use(middlewareModifyingRequest);
app.use(middleware2);


// establish express route
// call middleware1 then standardExpressCallback
// can be thought of as route specific middleware
app.get('/', middleware1, middlewareRaisingError, standardExpressCallback);

// error handling midleware goes at the end!
// On error, express skips rest of middleware and propagates error to here
app.use(middlewareErrorHandler);

app.listen(3000);