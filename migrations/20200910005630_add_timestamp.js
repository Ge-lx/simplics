
exports.up = knex => {
	return knex.schema.table('events', table => {
		table
			.dateTime('tstamp')
			.defaultTo(knex.fn.now())
	});
};

exports.down = knex => {
	return knex.schema.table('events', table => {
		table.dropColumn('tstamp');
	});
};
