import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Agenda, AgendaInfo } from '../entities/Agenda.entity';
import { Request, Response } from 'express';
import { AgendaService } from '../services/Agenda.service';

@Controller('agenda')
export class AgendaController {
    constructor(private readonly agendaService: AgendaService) {}
    @Get()
    public async index(): Promise<AgendaInfo[]> {
        const agendas = await this.agendaService.findAll();
        return agendas.map((element: Agenda) => {
            return {
                id: element.id,
                nome: element.nome,
                descricao: element.descricao,
                quantContatos: element.contatos ? element.contatos.length : 0,
            } as AgendaInfo;
        });
    }

    @Post()
    public async create(
        @Req() request: Request<Agenda>,
        @Res() response: Response<Agenda>,
    ): Promise<Response> {
        const agenda = new Agenda();
        agenda.nome = request.body.nome;
        agenda.descricao = request.body.descricao;
        const agendaCreated = await this.agendaService.create(agenda);
        return response.status(201).json(agendaCreated);
    }

    @Put(':id')
    public async update(
        @Req() request,
        @Res() response: Response<Agenda | { message: string }>,
    ): Promise<Response> {
        const agenda = new Agenda();
        agenda.id = request.params.id;
        agenda.nome = request.body.nome;
        agenda.descricao = request.body.descricao;
        try {
            const agendaUpdated = await this.agendaService.update(agenda);
            return response.status(200).json(agendaUpdated);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Delete(':id')
    public async delete(
        @Req() request: Request<{ id: number }>,
        @Res() response: Response,
    ): Promise<Response> {
        try {
            await this.agendaService.delete(request.params.id);
            return response.status(200).json({
                message: 'Agenda deleted successfully',
            });
        } catch (error) {
            return response.status(404).json({ message: 'Agenda not found' });
        }
    }

    @Get(':id')
    public async findById(
        @Req() request: Request<{ id: number }>,
        @Res() response: Response<AgendaInfo | { message: string }>,
    ): Promise<Response> {
        const agenda = await this.agendaService.findOneById(request.params.id);
        if (!agenda) {
            return response.status(404).json({ message: 'Agenda not found' });
        }
        return response.status(200).json({
            id: agenda.id,
            nome: agenda.nome,
            descricao: agenda.descricao,
            quantContatos: agenda.contatos ? agenda.contatos.length : 0,
        } as AgendaInfo);
    }
}
