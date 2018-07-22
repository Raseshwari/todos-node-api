var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodosApp');

module.exports = {mongoose}