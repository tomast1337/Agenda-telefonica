import { Injectable, Inject } from '@nestjs/common';
import { Contato } from '../entities/Contato.entity';
import { Repository } from 'typeorm';
import { Agenda } from '../entities/Agenda.entity';

@Injectable()
export class AgendaService {
    constructor(
        @Inject('AGENDA_REPOSITORY')
        private agendaRepository: Repository<Agenda>,
        @Inject('CONTATO_REPOSITORY')
        private contatoRepository: Repository<Contato>,
    ) {}

    async findAllOfUser(uuid: string): Promise<Agenda[]> {
        return await this.agendaRepository
            .createQueryBuilder('agenda')
            .leftJoinAndSelect('agenda.contatos', 'contatos')
            .where('agenda.userUuid = :uuid', { uuid })
            .getMany();
    }

    async create(agenda: Agenda): Promise<Agenda> {
        return await this.agendaRepository.save(agenda);
    }

    async update(agenda: Agenda): Promise<Agenda> {
        const toUpdate = await this.agendaRepository.findOne({
            where: { id: agenda.id },
        });
        if (!toUpdate) {
            throw new Error('Agenda not found');
        }
        toUpdate.descricao = agenda.descricao;
        toUpdate.nome = agenda.nome;
        return await this.agendaRepository.save(toUpdate);
    }

    async delete(id: number, userUuid: string) {
        const agenda = await this.agendaRepository.findOne({
            where: {
                id,
                user: {
                    uuid: userUuid,
                },
            },
        });
        // delete all contacts where agendaId = id
        await this.contatoRepository
            .createQueryBuilder()
            .delete()
            .from(Contato)
            .where('agendaId = :id', { id })
            .execute();
        // delete agenda
        return await this.agendaRepository.remove(agenda);
    }

    async findOneById(id: number, userUuid: string): Promise<Agenda> {
        return await this.agendaRepository
            .createQueryBuilder('agenda')
            .leftJoinAndSelect('agenda.contatos', 'contatos')
            .where('agenda.id = :id AND agenda.userUuid = :uuid', {
                id,
                uuid: userUuid,
            })
            .getOne();
    }
}
