import { Router } from 'express';

import express from 'express';

import cors from 'cors';
import { servicosController } from '../Controllers/servicosController';

const router = Router();

router.use(cors());
router.use(express.json());

//ROTA PARA LISTAR TODOS OS SERVIÇOS, SENDO POSSIVEL ADICIONAR QUERY COM: TITULO, DESCRICAO, ID_TIPO_SERVICO
router.get('/servicos', servicosController.listarServicos);
//ROTA PARA CRIAR UM NOVO SERVIÇO
router.post('/servicos', servicosController.criarServico);
//ROTA PARA REMOVER UM SERVIÇO
router.delete('/servicos', servicosController.removerServico);

export default router;
