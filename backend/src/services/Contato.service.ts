import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contato } from '../entities/Contato.entity';

@Injectable()
export class ContatoService {
    constructor(
        @Inject('CONTATO_REPOSITORY')
        private contatoRepository: Repository<Contato>,
    ) {}

    async create(contato: Contato): Promise<Contato> {
        return await this.contatoRepository.save(contato);
    }

    async update(contato: Contato): Promise<Contato> {
        const toUpdate = await this.contatoRepository.findOne({
            where: { id: contato.id },
        });
        if (!toUpdate) {
            throw new Error('Contato not found');
        }
        toUpdate.nome = contato.nome;
        toUpdate.email = contato.email;
        toUpdate.telefone = contato.telefone;
        toUpdate.agenda = contato.agenda;
        return await this.contatoRepository.save(toUpdate);
    }

    async delete(id: number): Promise<Contato> {
        const contato = await this.contatoRepository.findOne({
            where: { id },
        });
        return await this.contatoRepository.remove(contato);
    }

    async findOneById(id: number): Promise<Contato> {
        return await this.contatoRepository.findOne({
            where: { id },
        });
    }

    async findAllByAgendaId(agendaId: number) {
        return await this.contatoRepository
            .createQueryBuilder('contato')
            .where('contato.agendaId = :agendaId', { agendaId })
            .getMany();
    }

    async findById(id: number) {
        return await this.contatoRepository
            .createQueryBuilder('contato')
            .where('contato.id = :id', { id })
            .getOne();
    }

    async updateImage(id: number, url: string) {
        const toUpdate = await this.contatoRepository.findOne({
            where: { id },
        });
        if (!toUpdate) {
            throw new Error('Contato not found');
        }
        toUpdate.imagem = url;
        return await this.contatoRepository.save(toUpdate);
    }
}
