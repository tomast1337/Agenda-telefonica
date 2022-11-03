import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Agenda } from './Agenda.entity';

@Entity()
export class Contato {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    @Column({
        length: 500,
        nullable: false,
        default: 'Sem nome',
    })
    nome: string;
    @Column({
        length: 500,
        nullable: false,
        default: 'Não informado',
    })
    email: string;
    @Column({
        length: 500,
        nullable: false,
        default: 'Não informado',
    })
    telefone: string;
    @Column({
        length: 500,
        nullable: true,
        default: null,
    })
    imagem: string | null;
    @ManyToOne(() => Agenda, (agenda) => agenda.contatos)
    agenda: Agenda;
}

export interface ContatoInfo {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    imagem: string | null;
    agendaId: number;
}
