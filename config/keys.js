// Serve either production or development keys, depending on the current environment
if (process.env.NODE_ENV == 'production') {
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
}