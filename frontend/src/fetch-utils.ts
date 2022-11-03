import { Agenda, Contato } from './types';

export async function getAgenda(
    idAgenda: number,
    api_url: string,
): Promise<Agenda> {
    const response = await fetch(api_url + `/api/agenda/${idAgenda}`);
    const agenda = (await response.json()) as Agenda;
    return agenda;
}

export async function getAgendas(api_url: string): Promise<Agenda[]> {
    const response = await fetch(api_url + '/api/agenda');
    const agendas = (await response.json()) as Agenda[];
    return agendas;
}

export async function getContato(
    idAgenda: number,
    idContato: number,
    api_url: string,
): Promise<Contato> {
    const response = await fetch(
        api_url + `/api/contatos/${idAgenda}/${idContato}`,
    );
    const contato = await response.json();
    return contato;
}

export async function createContato(
    contato: Contato,
    api_url: string,
): Promise<Contato> {
    const response = await fetch(api_url + `/api/contatos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    });
    const contatoCreated = await response.json();
    return contatoCreated;
}

export async function updateContato(
    contato: Contato,
    api_url: string,
): Promise<Contato> {
    const response = await fetch(api_url + `/api/contatos/${contato.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contato),
    });
    const contatoUpdated = await response.json();
    return contatoUpdated;
}

export async function deleteContato(
    idAgenda: number,
    api_url: string,
): Promise<void> {
    await fetch(api_url + `/api/contatos/${idAgenda}`, {
        method: 'DELETE',
    });
}

export async function updateContatoImage(
    contatoId: number,
    file: File,
    api_url: string,
) {
    const formData = new FormData();
    formData.append('imagem', file);
    fetch(api_url + `/api/contatos/${contatoId}/imagem`, {
        method: 'PUT',
        body: formData,
    });
}

export async function getContatos(
    idAgenda: number,
    api_url: string,
): Promise<Contato[]> {
    const response = await fetch(api_url + `/api/contatos/${idAgenda}`);
    const contato = await response.json();
    return contato;
}

export async function createAgenda(
    agenda: Agenda,
    api_url: string,
): Promise<any> {
    const response = await fetch(api_url + '/api/agenda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agenda),
    });
    if (!response.ok) {
        console.log(response);
        throw new Error('Não foi possível criar a agenda');
    }
    return response.json();
}

export async function updateAgenda(
    agenda: Agenda,
    api_url: string,
): Promise<Agenda | any> {
    const response = await fetch(api_url + `/api/agenda/${agenda.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(agenda),
    });
    if (!response.ok) {
        throw new Error('Não foi possível atualizar a agenda');
    }
    return response.json();
}

export async function deleteAgenda(id: type, api_url: string): Promise<any> {
    const response = await fetch(api_url + `/api/agenda/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Não foi possível deletar a agenda');
    }
    return response.json();
}
