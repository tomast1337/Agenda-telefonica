export class Agenda {
    id: number;
    nome: string;
    descricao: string;
    quantContatos: number;
    constructor(json: {
        id: number;
        nome: string;
        descricao: string;
        quantContatos: number;
    }) {
        this.id = json.id;
        this.nome = json.nome;
        this.descricao = json.descricao;
        this.quantContatos = json.quantContatos;
    }
}

export class Contato {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    imagem?: string | null;
    agendaId: number;
    constructor(json: {
        id: number;
        nome: string;
        email: string;
        telefone: string;
        imagem?: string;
        agendaId: number;
    }) {
        this.id = json.id;
        this.nome = json.nome;
        this.email = json.email;
        this.telefone = json.telefone;
        this.imagem = json.imagem || null;
        this.agendaId = json.agendaId;
    }
}
