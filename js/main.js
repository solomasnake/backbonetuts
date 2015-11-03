var Vehicle = Backbone.Model.extend({
	idAttribute: 'registrationNumber',
	urlRoot: '/api/vehicles',
	validate: function(attrs) {
		if (!attrs.registrationNumber) {
			return 'Registration number is required!';
		}
	}
	start: function() {
		console.log('Vehicle started');
	}
});

var Car = Vehicle.extend({
	start: function() {
		console.log('Car with registration number ' + this.get('registrationNumber') + ' started.');
	}
});

var nissan = new Car({
	registrationNumber: 'XLI887',
	color: 'Blue'
});

nissan.unset('registrationNumber');

if (!nissan.isValid()) {
	console.log(nissan.validationError);
}
