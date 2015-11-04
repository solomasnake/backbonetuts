var Vehicle = Backbone.Model.extend({
	idAttribute: 'registrationNumber',
	urlRoot: '/api/vehicles',
	validate: function(attrs) {
		if (!attrs.registrationNumber) {
			return 'Registration number is required!';
		}
	},
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

var Vehicles = Backbone.Collection.extend({
	model: Vehicle
});

var cars = new Vehicles([
	car1 = { registrationNumber: 'XLI887', colour: 'Blue' },
	car2 = { registrationNumber: 'ZNP123', colour: 'Blue' },
	car3 = { registrationNumber: 'XUV456', colour: 'Gray' },
]);

// console.log(cars.where({ colour: 'Blue' }));

var sandero = cars.findWhere({ registrationNumber: 'XLI887' });

// console.log(sandero);

cars.remove(sandero);

// console.log(cars.toJSON());

cars.each(function(car) {
	// console.log(car.toJSON());
});

var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
	model: Song
});

var SongView = Backbone.View.extend({
	initialize: function() {
		this.model.on('change', this.render, this)
	},
	events: {
		'click': 'onClick',
		'click .bookmark': 'onClickBookmark'
	},
	onClick: function() {
		console.log('Listen clicked!');
	},
	onClickBookmark: function() {
		console.log('Bookmark clicked!');
	},
	render: function() {
		this.$el.html(this.model.get('title'));
		return this;
	}
});

var SongsView = Backbone.View.extend({
	render: function() {
		var self = this;
		this.model.each(function(song) {
			var songView = new SongView({ model: song });
			self.$el.append(songView.render().$el);
		});
	}
});

var songs = new Songs([
	new Song({ title: 'Blue in Green' }),
	new Song({ title: 'So what' }),
	new Song({ title: 'All Blues' })
]);

var songsView = new SongsView({ model: songs, el: '#container' });




songsView.render();