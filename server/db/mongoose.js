var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup Promise
//var process.env.MONGODB_URI = 'mongodb://raseshwari:raseshwari1@ds143461.mlab.com:43461/todo-nodejs-app'
//mongoose.connect(process.env.MONGODB_URI )
mongoose.connect('mongodb://raseshwari:raseshwari1@ds143461.mlab.com:43461/todo-nodejs-app');
//mongoose.connect('mongodb://localhost:27017/TodosApp');

module.exports = {mongoose}
