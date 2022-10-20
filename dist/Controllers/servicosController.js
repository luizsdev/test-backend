"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicosController = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class servicosController {
    static listarServicos(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (Object.keys(req.query).length === 0) {
                try {
                    const servicos = yield exports.prisma.servicos.findMany();
                    const novoRet = servicos.map((i) => {
                        return Object.assign(Object.assign({}, i), { dataServico: i.dataServico.toISOString().split('T')[0] });
                    });
                    return res.status(200).json(novoRet);
                }
                catch (_c) {
                    return res.status(500).json({ message: 'Erro ao listar os serviços' });
                }
            }
            yield exports.prisma.servicos
                .findMany({
                where: {
                    OR: [
                        {
                            descServico: (_a = req.query.descricao) === null || _a === void 0 ? void 0 : _a.toString(),
                        },
                        {
                            tituloServico: (_b = req.query.titulo) === null || _b === void 0 ? void 0 : _b.toString(),
                        },
                        {
                            idTipoServico: isNaN(Number(req.query.id_tipo_servico)) ? undefined : Number(req.query.id_tipo_servico),
                        },
                    ],
                },
            })
                .then((servicos) => {
                return res.status(200).json(servicos);
            })
                .catch(() => {
                return res.status(500).json({ message: 'Erro ao listar os serviços' });
            });
        });
    }
    static criarServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tituloServico, descServico, dataServico, idTipoServico, idUsuario } = req.body;
            const parsedData = new Date(dataServico);
            yield exports.prisma.servicos
                .create({
                data: {
                    tituloServico,
                    descServico,
                    dataServico: parsedData,
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                },
            })
                .then((servico) => {
                return res.status(200).json({ message: 'Serviço criado com sucesso', servico });
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao criar o serviço' });
            });
        });
    }
    static removerServico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield exports.prisma.servicos
                .delete({
                where: {
                    id: Number(id),
                },
            })
                .then(() => {
                return res.status(200).json({ message: 'Serviço removido com sucesso' });
            })
                .catch(() => {
                return res.status(400).json({ message: 'Erro ao remover o serviço' });
            });
        });
    }
}
exports.servicosController = servicosController;
