import express from 'express';
import cors from 'cors';
import { Router } from 'express';
import { validarServico } from '../Middlewares/servicoMiddleware';
import { servicosController } from '../Controllers/servicosController';

const router = Router();

router.use(cors());
router.use(express.json());

//ROTA PARA LISTAR TODOS OS SERVIÇOS, SENDO POSSIVEL ADICIONAR QUERY COM: TITULO, DESCRICAO, ID_TIPO_SERVICO
router.get('/servicos', servicosController.listarServicos);
//ROTA PARA CRIAR UM NOVO SERVIÇO
router.post('/servicos', validarServico, servicosController.criarServico);
//ROTA PARA CRIAR MULTIPLOS SERVICOS DEPENDENDO DO DIA DA SEMANA E COM UMA DATA LIMITE
router.post('/servicomultiplo', servicosController.criarServicoComDataLimite);
//ROTA PARA REMOVER UM SERVIÇO
router.delete('/servicos', servicosController.removerServico);

export default router;
