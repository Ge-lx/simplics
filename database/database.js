const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];

module.exports = async () => {
	const knex = require('knex')(config);

	const migrated = await knex.migrate.latest();
	if (migrated[1].length !== 0) {
		console.log(`Migrated database up with ${migrated[1].join(', ')}`);
	} else {
		console.log('Database migrations up to date.');
	}
	
	return knex;
};