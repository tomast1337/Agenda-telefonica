import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { getAgendas } from '../fetch-utils';
import { Agenda } from '../types';

export const AgendaDetail = (props: { agenda: Agenda }) => {
    const { agenda } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col font-sans rounded-md shadow-2xl bg-gray-100 w-1/2 mx-auto">
            <div
                onClick={() => {
                    context.AgendaSelecionada = agenda;
                    navigate(`/agenda/${agenda.id}`);
                }}
            >
                <h1 className="py-4 text-center text-lg text-gray-800">
                    {agenda.nome}
                </h1>
                <p className="px-4 text-sm text-slate-700">
                    {agenda.descricao}
                </p>
                <p className="px-4 text-lg font-semibold text-slate-500">
                    {agenda.quantContatos} contatos
                </p>
            </div>
        </div>
    );
};

export const AgendasPage = () => {
    const [agendas, setAgendas] = React.useState<Agenda[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Agenda Telefônica';
        if (loading) {
            (async () => {
                try {
                    const agendas = await getAgendas(context);
                    setAgendas(agendas);
                    setLoading(false);
                } catch (error: any) {
                    setError(error.message);
                }
            })();
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
