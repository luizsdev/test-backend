import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Servico } from '../@types/servicosTypes';

export const prisma = new PrismaClient();

export class servicosController {
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
        return res.status(200).json({ message: 'Serviço criado com sucesso', servico });
      })
      .catch(() => {
        return res.status(400).json({ message: 'Erro ao criar o serviço' });
      });
  }

  static async removerServico(req: Request, res: Response) {
    const { id } = req.body;
    await prisma.servicos
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
  }
}
