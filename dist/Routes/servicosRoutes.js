"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const servicosController_1 = require("../Controllers/servicosController");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
//ROTA PARA LISTAR TODOS OS SERVIÇOS
router.get('/servicos', servicosController_1.servicosController.listarServicos);
exports.default = router;
