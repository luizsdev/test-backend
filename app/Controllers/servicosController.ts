import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export class servicosController {
  static async listarServicos(req: Request, res: Response) {
    const servicos = await prisma.servicos.findMany();
    res.status(200).json(servicos);
  }
}
