var mongoose = require('mongoose');

mongoose.Promise = global.Promise; //setup Promise
mongoose.connect('mongodb://raseshwari:raseshwari1@ds143461.mlab.com:43461/todo-nodejs-app'||'mongodb://localhost:27017/TodosApp');
//mongoose.connect('mongodb://localhost:27017/TodosApp');

module.exports = {mongoose}