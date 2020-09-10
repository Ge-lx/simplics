const http = require('http');
const express = require('express');


const configure_routes = (router, knex) => {
    router.get('alive', (req, res, next) => {
        req.sendStatus(200);
    });


    router.get('/event/join', async (req, res, next) => {
        const rows = await knex('events')
            .select(['id'])
            .where({ type: 'join' });

        res.json({
            count: rows.length
        });
    });


    router.put('/event/:type', async (req, res, next) => {
        console.log('got event: ', { type: req.params.type, data: req.body });
        
        await knex('events').insert({
            type: req.params.type,
            data: JSON.stringify(req.body)
        });

        return res.sendStatus(200);
    });
};

require('./database/database.js')()
    .then(async knex => {
        console.log('Database successfully initialized.\n');

        const router = require('express-promise-router')();
        configure_routes(router, knex);

        const app = express();
        app.use(express.json());
        app.use(router);

        const port = process.env.PORT || 3000;
        try {
            await app.listen(port);
            console.log(`Simplics listening on port ${port}!`);
        } catch (error) {
            console.error(`Error starting express on ${port}: `, error);
        }

    })
    .catch(error => {
        console.error('Error initializing database: ', error);
    });