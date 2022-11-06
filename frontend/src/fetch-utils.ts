import { AppContextType } from './app-context';
import { Agenda, Contato } from './types';

export async function login(
    login: string,
    senha: string,
    context: AppContextType,
): Promise<string> {
    try {
        const response = await fetch(
            `${context.api}/api/users/login/${login}/${senha}`,
        );
        const data = await response.json();
        if (data.token) {
            context.token = data.token;
            return data.token;
        }
        throw new Error(data.message);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createAccount(
    login: string,
    senha: string,
    context: AppContextType,
): Promise<any> {
    await fetch(`${context.api}/api/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, senha }),
    });
}

export async function getAgenda(
    idAgenda: number,
    context: AppContextType,
): Promise<Agenda> {
    const response = await fetch(context.api + `/api/agenda/${idAgenda}`, {
        headers: {
            Authorization: `${context.token}`,
        },
    });
    const agenda = (await response.json()) as Agenda;
    return agenda;
}

export async function getAgendas(context: AppContextType): Promise<Agenda[]> {
    const response = await fetch(context.api + '/api/agenda', {
        headers: {
            Authorization: `${context.token}`,
        },
    });
    const agendas = (await response.json()) as Agenda[];
    return agendas;
}

export async function getContato(
    idAgenda: number,
    idContato: number,
    context: AppContextType,
): Promise<Contato> {
    const response = await fetch(
        context.api + `/api/contatos/${idAgenda}/${idContato}`,
        {
            headers: {
                Authorization: `${context.token}`,
            },
        },
    );
    const contato = await response.json();
    return contato;
}

export async function createContato(
    contato: Contato,
    context: AppContextType,
): Promise<Contato> {
    const response = await fetch(context.api + `/api/contatos`, {
        method: 'POST',
        headers: {
            Authorization: `${context.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    });
    const contatoCreated = await response.json();
    return contatoCreated;
}

export async function updateContato(
    contato: Contato,
    context: AppContextType,
): Promise<Contato> {
    const response = await fetch(context.api + `/api/contatos/${contato.id}`, {
        method: 'PUT',
        headers: {
            Authorization: `${context.token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    });
    const contatoUpdated = await response.json();
    return contatoUpdated;
}

export async function deleteContato(
    idAgenda: number,
    context: AppContextType,
): Promise<void> {
    await fetch(context.api + `/api/contatos/${idAgenda}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${context.token}`,
        },
    });
}

export async function updateContatoImage(
    contatoId: number,
    file: File,
    context: AppContextType,
) {
    const formData = new FormData();
    formData.append('imagem', file);
    fetch(context.api + `/api/contatos/${contatoId}/imagem`, {
        headers: {
            Authorization: `${context.token}`,
        },
        method: 'PUT',
        body: formData,
    });
}

export async function getContatos(
    idAgenda: number,
    context: AppContextType,
): Promise<Contato[]> {
    const response = await fetch(context.api + `/api/contatos/${idAgenda}`, {
        headers: {
            Authorization: `${context.token}`,
        },
    });
    const contatos = await response.json();
    return contatos;
}

export async function createAgenda(
    agenda: Agenda,
    context: AppContextType,
): Promise<any> {
    const response = await fetch(context.api + '/api/agenda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${context.token}`,
        },
        body: JSON.stringify(agenda),
    });
    if (!response.ok) {
        throw new Error('Não foi possível criar a agenda');
    }
    return response.json();
}

export async function updateAgenda(
    agenda: Agenda,
    context: AppContextType,
): Promise<Agenda | any> {
    const response = await fetch(context.api + `/api/agenda/${agenda.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${context.token}`,
        },
        body: JSON.stringify(agenda),
    });
    if (!response.ok) {
        throw new Error('Não foi possível atualizar a agenda');
    }
    return response.json();
}

export async function deleteAgenda(
    id: number,
    context: AppContextType,
): Promise<any> {
    const response = await fetch(context.api + `/api/agenda/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `${context.token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Não foi possível deletar a agenda');
    }
    return response.json();
}
