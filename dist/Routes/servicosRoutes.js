"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const servicosController_1 = require("../Controllers/servicosController");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
router.use(express_2.default.json());
//ROTA PARA LISTAR TODOS OS SERVIÇOS, SENDO POSSIVEL ADICIONAR QUERY COM: TITULO, DESCRICAO, ID_TIPO_SERVICO
router.get('/servicos', servicosController_1.servicosController.listarServicos);
//ROTA PARA CRIAR UM NOVO SERVIÇO
router.post('/servicos', servicosController_1.servicosController.criarServico);
//ROTA PARA REMOVER UM SERVIÇO
router.delete('/servicos', servicosController_1.servicosController.removerServico);
exports.default = router;
