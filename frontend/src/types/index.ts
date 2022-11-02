export class Agenda {
    id: number;
    nome: string;
    descricao: string;
    contatos: Contato[];
    constructor(json: {
        id: number;
        nome: string;
        descricao: string;
        contatos: Contato[];
    }) {
        this.id = json.id;
        this.nome = json.nome;
        this.descricao = json.descricao;
        this.contatos = json.contatos;
    }
}

export class Contato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    imagem?: string | null;
    agenda: Agenda;
    constructor(json: {
        id: number;
        nome: string;
        email: string;
        telefone: string;
        imagem?: string;
        agenda: Agenda;
    }) {
        this.id = json.id;
        this.nome = json.nome;
        this.email = json.email;
        this.telefone = json.telefone;
        this.imagem = json.imagem || null;
        this.agenda = json.agenda;
    }
}
