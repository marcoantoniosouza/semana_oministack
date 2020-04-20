const crypto = require('crypto');
const conn = require('../db/conn');

class Ong{
	async index(request, response) {
		const ongs = await conn('ongs').select('*');

		return response.json(ongs);
	}

	async create(request, response) {
		const {nome, email, whatsapp, cidade, uf} = request.body;

		const id = crypto.randomBytes(4).toString('HEX');

		await conn('ongs').insert({
			id, nome, email, whatsapp, cidade, uf
		});

		return response.json({id});
	}

	async login(request, response) {
		const {id} = request.body;

		const ong = await conn('ongs').where('id', id).select('nome').first();

		if (!ong) {
			return response.status(400).json({error: 'ONG não encontrada'});
		}

		return response.json(ong);
	}
}

module.exports = Ong;