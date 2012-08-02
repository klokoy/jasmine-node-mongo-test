var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
	name: String,
	age: Number
});

var TestModel = mongoose.model('TestModel', testSchema);

describe('Create a instance of testModel', function() {
	beforeEach(function() {
		mongoose.connect('mongodb://localhost/testdb');
	});

	afterEach(function() {
		mongoose.connection.db.executeDbCommand({
			dropDatabase: 1
		}, function(err, result) {
			console.log(err);
			console.log(result);
			process.exit(0);
		});
	});

	it('should save to the database', function() {
		var testModel = new TestModel();
		testModel.name = 'Lui';
		testModel.age = 2;
		testModel.save(function(err) {
			expect(err).toBeNull();
			TestModel.find(function(err, result) {
				expect(result.length).toBe(1);
				expect(result[0].name).toBe('Lui');
				expect(result[0].age).toEqual(2);
				asyncSpecDone();
			});
		});
		asyncSpecWait();
	});
});