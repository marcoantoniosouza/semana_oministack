/* MODULOS */
const express = require('express');
const crypto = require('crypto');

/* ARQUIVOS */
const conn = require('./db/conn');
const ongController = require('./controllers/OngController');
const casoController = require('./controllers/CasoController');

const routes = express.Router();

/* ONGS */
const ong = new ongController();
routes.get('/ongs', ong.index);
routes.post('/ongs', ong.create);
routes.post('/login', ong.login);
/* ONGS */

/* CASOS */
const caso = new casoController();
routes.get('/caso', caso.index);
routes.post('/caso', caso.create);
routes.delete('/caso/:id', caso.delete);
routes.get('/casosOng', caso.casosOng);
/* CASOS */

module.exports = routes;