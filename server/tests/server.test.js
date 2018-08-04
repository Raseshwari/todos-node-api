const expect = require('expect');
const request = require('supertest');
const {ObjectID} =  require('mongodb');

const {app} = require('./../server');
const {Todo} =  require('./../models/todos');

const todos = [{
	_id: new ObjectID(),
	text : 'Sample todo 1'
}, {
	_id: new ObjectID(),
	text: 'Sample todo 2',
	completed: true,
	completedAt: 333
}];

//testing lifecycle method to remove all changes made in db
beforeEach((done) => {
	Todo.remove({}).then(() =>{
		return Todo.insertMany(todos);
	}).then(() => done());
});


describe('POST/todos', () =>{
	it('it should create a new todo', (done) => {
		var text = 'Test todo text';
		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) =>{
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err){
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
			done();
			}).catch((e) => done(e));
		});
	});

	it('should not create todo with invalid body data', (done)=>{
		 request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err,res) => { //passing dollowing code to end() because checking db asynchronously
			if(err){
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
 });


describe('GET /todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	})
});

describe('GET /todos/:id', ()=>{
	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text)
		})
		.end(done);
	});

	it('should return a 404 if todo not found', (done)=>{
		var hexId = new ObjectID().toHexString();
		request(app)
		.get('/todos/8b53c2c38669bf2030634267')
		.expect(200)
		.end(done);
	});

	it('should return 404 for non-object id', (done)=>{
		request(app)
		.get('/todos/123')
		.expect(404)
		.end(done);
	});
});

describe('DELETE /todos/:id', () => {
	it('should remove a todo',(done)=>{
		var hexId =  todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err,res)=>{
			if(err){
				return done(err);
			}	

			Todo.findById(hexId).then((todo)=>{
				expect(todo).toBeNull();
				done();
			}).catch((e)=> done(e));
		});
	});

	it('should return 404 if todo not found', (done)=>{
		var hexId = new ObjectID().toHexString();
		request(app)
		.delete('/todos/8b53c2c38669bf2030634267')
		.expect(404)
		.end(done);
	});

	it('should return 404 if object id is invalid', (done)=>{
		request(app)
		.delete('/todos/123')
		.expect(404)
		.end(done);
	})
});

describe('PATCH /todos/:id', (done)=>{
	it('should update the todo', (done)=>{
		var hexId =  todos[0]._id.toHexString();
		var text = "testing case 1";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed:true,
			text: text
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(typeof res.body.todo.completedAt).toBe('number')
		})
		.end(done);
	});

	it('should clear completedAt when the todo is not complete', (done)=>{
		var hexId =  todos[0]._id.toHexString();
		var text = "testing case 2";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed:false,
			text: text
		})
		.expect(200)
		.expect((res)=>{
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeNull();
		})
		.end(done);
	});
});