import supertest from 'supertest';
import { app } from '../index';

let servicoId = 0;

describe('ROTAS SERVICO CRIAR, LISTAR E REMOVER', () => {
  it('Criar novo serviço', async () => {
    const response = await supertest(app).post('/servicos').send({
      tituloServico: 'Teste',
      descServico: 'Teste',
      dataServico: '2021-09-28',
      idTipoServico: 1,
      idUsuario: 1,
    });
    expect(response.status).toBe(200);
    servicoId = response.body.servico.id;
  });

  it('Listar todos os serviços', async () => {
    const response = await supertest(app).get('/servicos');
    expect(response.status).toBe(200);
  });

  it('Listar cliente filtrando por titulo descricao ou id', async () => {
    const response = await supertest(app).get('/servicos?titulo=Teste&descricao=Teste&id_tipo_servico=1');
    expect(response.status).toBe(200);
  });

  it('Remover serviço', async () => {
    const response = await supertest(app).delete('/servicos').send({
      id: servicoId,
    });
    expect(response.status).toBe(200);
  });
});
