import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Agenda } from './Agenda.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column({
        length: 500,
        nullable: false,
        default: 'Sem nome',
    })
    login: string;
    @Column({
        length: 500,
        nullable: false,
        default: 'Não informado',
    })
    senha: string;
    @OneToMany(() => Agenda, (agenda) => agenda.user)
    agendas: Agenda[];
}

export interface UserInfo {
    uuid: string;
    login: string;
    agendaIds: number[];
}
