import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Contato } from './Contato.entity';

@Entity()
export class Agenda {
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
        default: 'Sem descrição',
    })
    descricao: string;
    // Join Column Contato - Agenda
    @OneToMany(() => Contato, (contato) => contato.agenda)
    contatos?: Contato[];
}
