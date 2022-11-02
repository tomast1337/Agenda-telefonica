import * as React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../variables';
import { Agenda } from '../types';

export const AgendaDetail = (props: { agenda: Agenda }) => {
    const { agenda } = props;
    return (
        <Link to={`/agenda/${agenda.id}`}>
            <div className="flex flex-col font-sans rounded-md shadow-2xl bg-gray-100">
                <h1 className="py-4 text-center text-lg text-gray-800">
                    {agenda.nome}
                </h1>
                <p className="px-4 text-sm text-slate-700">
                    {agenda.descricao}
                </p>
                <p className="px-4 text-lg font-semibold text-slate-500">
                    {agenda.contatos?.length} contatos
                </p>
                <Link
                    className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-lg font-medium px-4 py-2 mt-4 w-fit-content"
                    to={`/agenda/${agenda.id}/editar`}
                >
                    Editar
                </Link>
            </div>
        </Link>
    );
};

export const IndexPage = () => {
    const [agendas, setAgendas] = React.useState<Agenda[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        document.title = 'Agenda Telefônica';
        if (loading) {
            fetch(baseUrl + '/api/agenda/')
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            setAgendas(data);
                            setLoading(false);
                        });
                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }, []);

    return (
        <>
            <h1 className="text-center text-xl">Lista Agendas</h1>
            <div className="flex flex-col align-center">
                {loading && (
                    <p className="text-center text-lg text-gray-800">
                        Carregando...
                    </p>
                )}
                {error && (
                    <p className="text-center text-lg text-gray-800">
                        Erro ao carregar agendas
                    </p>
                )}
                <div className="flex flex-col space-y-8 my-8 mx-16">
                    {agendas.length > 0 &&
                        agendas.map((agenda) => (
                            <AgendaDetail key={agenda.id} agenda={agenda} />
                        ))}
                </div>
            </div>
        </>
    );
};
