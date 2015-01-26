var client;
if (__DEV__) {
    client = require('./clients/localStorageClient');
} else {
    client = require('./clients/restClient');
}

module.exports = client;

