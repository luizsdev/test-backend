import { Request, Response, NextFunction } from 'express';

export const validarServico = async (req: Request, res: Response, next: NextFunction) => {
  const { tituloServico, descServico, dataServico, idTipoServico, idUsuario } = req.body;

  if (!tituloServico || !descServico || !dataServico || !idTipoServico || !idUsuario) {
    return res.status(400).json({ message: 'Cheque se preencheu todos os dados' });
  }

  next();
};
