import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const clienteRoute = Router();
const cliente = require('../models/clienteTable')


clienteRoute.get('/cliente', async(req: Request, res: Response, next: NextFunction)=>{
    const clientList = await cliente.findAll();
    res.status(StatusCodes.OK).send(clientList)
})

clienteRoute.get('/listarClientesMasculinos', async(req: Request, res: Response, next: NextFunction)=>{
    const clientList = await cliente.findAll({ where: { genero: 'Masculino'}});
    res.status(StatusCodes.OK).send(clientList)
})

clienteRoute.get('/listarClientesFemininos', async(req: Request, res: Response, next: NextFunction)=>{
    const clientList = await cliente.findAll({ where: { genero: 'Feminino'}});
    res.status(StatusCodes.OK).send(clientList)
})

clienteRoute.get('/listarClientesOutros', async(req: Request, res: Response, next: NextFunction)=>{
    const clientList = await cliente.findAll({ where: { genero: 'Outros'}});
    res.status(StatusCodes.OK).send(clientList)
})


clienteRoute.get('/cliente/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await cliente.findOne({ where: { id: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Cliente não encontrado!"
        })
    } else {
        return res.json(project)
    }
})

clienteRoute.post('/cliente/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newCliente = req.body
    await cliente.create(newCliente)
    .then((clienteCriado) =>{
        return res.json({
            id: clienteCriado.id,
            ok: true,
            message: "Cliente cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            id: -1,
            ok: false,
            message: "Cliente não cadastrado!"
        })
    })
})

clienteRoute.put('/cliente/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedCliente = req.body;
    modifiedCliente.uuid = uuid
    await cliente.update(modifiedCliente, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             ok: true,
             message: "Cliente atualizado com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             ok: false,
             message: "Cliente não atualizado!"
        })
     })
})


clienteRoute.delete('/cliente/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;

    await cliente.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            ok: true,
            message: "Cliente deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            ok: false,
            message: "Cliente não deletado!"
        })
    })
})


export default clienteRoute;