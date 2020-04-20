const conn = require('../db/conn');

class Caso{
	async index(request, response) {
		const {page = 1} = request.query;

		const [count] = await conn('casos').count();

		response.header('X-Total-Casos', count['count(*)']);

		const casos = await conn('casos')
			.join('ongs', 'ongs.id', '=', 'casos.ong_id')
			.limit(5).offset((page - 1) * 5)
			.select([
				'casos.*',
				'ongs.nome as ong_nome',
				'ongs.email as ong_email',
				'ongs.whatsapp as ong_whatsapp',
				'ongs.cidade as ong_cidade',
				'ongs.uf as ong_uf'
			]);

		return response.json(casos);
	}

	async casosOng(request, response) {
		const ong_id = request.headers.authorization;

		const casos = await conn('casos').select('*').where('ong_id', ong_id);

		return response.json(casos);
	}

	async create(request, response) {
		const {titulo, descricao, valor} = request.body;

		const ong_id = request.headers.authorization;

		const [id] = await conn('casos').insert({
			ong_id, titulo, descricao, valor
		});

		return response.json({ id });
	}

	async delete(request, response) {
		const {id} = request.params;

		const ong_id = request.headers.authorization;

		const caso = await conn('casos').select('ong_id').where('id', id).first()

		if (caso.ong_id != ong_id) {
			return response.status(401).json({erro: 'Não Autorizado'});
		}

		await conn('casos').where('id', id).delete();

		return response.status(204).send();
	}
}

module.exports = Caso;