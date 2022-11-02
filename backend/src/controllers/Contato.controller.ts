import { Controller, Req, Res, Get, Post, Put, Delete } from '@nestjs/common';
import { Contato } from '../entities/Contato.entity';
import { Agenda } from '../entities/Agenda.entity';
import { Request, Response } from 'express';
import { ContatoService } from 'src/services/Contato.service';

@Controller('contato')
export class ContatoController {
    constructor(private readonly contatoService: ContatoService) {}

    @Post()
    async create(
        @Req() request: Request<Contato>,
        @Res() response: Response<Contato>,
    ): Promise<Response> {
        const contato = new Contato();
        contato.nome = request.body.nome;
        contato.telefone = request.body.telefone;
        contato.agenda = new Agenda();
        contato.agenda.id = request.body.agenda.id;
        const contatoCreated = await this.contatoService.create(contato);
        return response.status(201).json(contatoCreated);
    }

    @Put(':id')
    async update(
        @Req() request: Request<Contato>,
        @Res() response: Response<Contato | { message: string }>,
    ): Promise<Response> {
        const contato = new Contato();
        contato.id = request.params.id;
        contato.nome = request.body.nome;
        contato.telefone = request.body.telefone;
        contato.agenda = new Agenda();
        contato.agenda.id = request.body.agendaId;
        try {
            const contatoUpdated = await this.contatoService.update(contato);
            return response.status(200).json(contatoUpdated);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Delete(':id')
    async delete(
        @Req() request: Request<{ id: number }>,
        @Res() response: Response<{ message: string }>,
    ): Promise<Response> {
        try {
            await this.contatoService.delete(request.params.id);
        } catch (error) {
            return response.status(404).json({ message: 'Contato not found' });
        }
        return response.status(200).json({
            message: 'Contato deleted successfully',
        });
    }

    @Get(':id')
    async findById(
        @Req() request: Request<{ id: number }>,
        @Res() response: Response<Contato | { message: string }>,
    ): Promise<Response> {
        try {
            const contato = await this.contatoService.findById(
                request.params.id,
            );
            return response.json(contato);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Get('nome/:nome')
    async findByName(
        @Req() request: Request<{ nome: string }>,
        @Res() response: Response<Contato[] | { message: string }>,
    ): Promise<Response> {
        try {
            const contatos = await this.contatoService.findByName(
                request.params.nome,
            );
            return response.json(contatos);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Get('telefone/:telefone')
    async findByPhone(
        @Req() request: Request<{ telefone: string }>,
        @Res() response: Response<Contato[] | { message: string }>,
    ): Promise<Response> {
        try {
            const contatos = await this.contatoService.findByPhone(
                request.params.telefone,
            );
            return response.json(contatos);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Get('email/:email')
    async findByEmail(
        @Req() request: Request<{ email: string }>,
        @Res() response: Response<Contato[] | { message: string }>,
    ): Promise<Response> {
        try {
            const contatos = await this.contatoService.findByEmail(
                request.params.email,
            );
            return response.json(contatos);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }
}
