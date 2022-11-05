import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Contato } from './Contato.entity';
import { User } from './User.entity';
@Entity()
export class Agenda {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;
    @ManyToOne((type) => User, (user) => user.agendas)
    user: User;
    @Column({
        length: 500,
        nullable: false,
        default: 'Sem nome',
    })
    nome: string;
    @Column({
        length: 500,
        nullable: false,
        default: 'Sem descrição',
    })
    descricao: string;
    // Join Column Contato - Agenda
    @OneToMany(() => Contato, (contato) => contato.agenda)
    contatos?: Contato[];
}

export interface AgendaInfo {
    id: number;
    nome: string;
    descricao: string;
    quantContatos: number;
}
