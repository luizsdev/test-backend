import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Servico } from '../@types/servicosTypes';
import {
  addDays,
  differenceInCalendarDays,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
} from 'date-fns';

export const prisma = new PrismaClient();

export class servicosController {
  //MÉTODO QUE LISTA TODOS OS SERVIÇOS
  static async listarServicos(req: Request, res: Response) {
    if (Object.keys(req.query).length === 0) {
      try {
        const servicos = await prisma.servicos.findMany();
        const novoRet = servicos.map((i) => {
          return { ...i, dataServico: i.dataServico.toISOString().split('T')[0] };
        });
        return res.status(200).json(novoRet);
      } catch {
        return res.status(500).json({ message: 'Erro ao listar os serviços' });
      }
    }
    await prisma.servicos
      .findMany({
        where: {
          OR: [
            {
              descServico: req.query.descricao?.toString(),
            },
            {
              tituloServico: req.query.titulo?.toString(),
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
  }
  //MÉTODO QUE CRIA SERVIÇOS
  static async criarServico(req: Request, res: Response) {
    const { tituloServico, descServico, dataServico, idTipoServico, idUsuario } = req.body;
    const parsedData = new Date(dataServico);
    await prisma.servicos
      .create({
        data: {
          tituloServico,
          descServico,
          dataServico: parsedData,
          idTipoServico: Number(idTipoServico),
          idUsuario: Number(idUsuario),
        },
      })
      .then((servico: Servico) => {
        return res.status(200).json({
          message: 'Serviço criado com sucesso',
          servico,
        });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao criar o serviço' });
      });
  }
  //MÉTODO QUE CRIA SERVIÇOS REPETIDOS ATÉ UMA DATA LIMITE
  static async criarServicoComDataLimite(req: Request, res: Response) {
    const { tituloServico, descServico, idTipoServico, idUsuario, dataLimite } = req.body;
    const opt: Array<string> = req.body.opcoes;
    const parsedData = new Date();
    const parsedDataLimite = new Date(dataLimite);
    const dias = Math.floor(differenceInCalendarDays(parsedDataLimite, parsedData) / 7);

    try {
      opt.forEach(async (i) => {
        switch (i) {
          case 'seg':
            if (isMonday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextMonday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'ter':
            if (isTuesday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextTuesday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'qua':
            if (isWednesday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextWednesday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'qui':
            if (isThursday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextThursday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'sex':
            if (isFriday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextFriday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'sab':
            if (isSaturday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextSaturday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;

          case 'dom':
            if (isSunday(parsedData) === true) {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(parsedData, 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            } else {
              for (let i = 0; i <= dias - 1; i++) {
                await prisma.servicos.create({
                  data: {
                    tituloServico,
                    descServico,
                    dataServico: addDays(nextSunday(parsedData), 7 * i),
                    idTipoServico: Number(idTipoServico),
                    idUsuario: Number(idUsuario),
                  },
                });
              }
            }
            break;
        }
      });

      return res.status(200).json({ message: 'Serviços cadastrados com sucesso!' });
    } catch {
      res.status(400).json({ message: 'Erro ao cadastrar serviços!' });
    }
  }
  //MÉTODO QUE REMOVE
  static async removerServico(req: Request, res: Response) {
    const { id } = req.params;
    await prisma.servicos
      .delete({
        where: {
          id: Number(id),
        },
      })
      .then(() => {
        return res.status(200).json({ message: 'Serviço(s) removido com sucesso' });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao remover o serviço' });
      });
  }
}
