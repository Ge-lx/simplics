
exports.up = knex => {
	return knex.schema.createTable('events', table => {
		table.increments('id');
		table.string('type');
		table.string('data');
	});
};

exports.down = knex => {
	return knex.schema.dropTable('events');
};
