import { Router } from 'express';
import cors from 'cors';
import { servicosController } from '../Controllers/servicosController';

const router = Router();

router.use(cors());
//ROTA PARA LISTAR TODOS OS SERVIÇOS
router.get('/servicos', servicosController.listarServicos);

export default router;
