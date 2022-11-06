import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { deleteAgenda, updateAgenda } from '../fetch-utils';
import { Agenda } from '../types';

export const EditarAgendaPage = () => {
    const [Agenda, setAgenda] = React.useState<Agenda>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Editar Agenda';
        if (!context.AgendaSelecionada) {
            navigate('/');
        } else {
            setAgenda(context.AgendaSelecionada);
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (Agenda) {
                const agenda = await updateAgenda(Agenda, context);
                context.AgendaSelecionada = agenda;
                navigate(`/agenda/${context.AgendaSelecionada?.id}`);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleDeleteButton = async () => {
        try {
            if (Agenda) {
                await deleteAgenda(Agenda.id, context);
                navigate('/');
            }
        } catch (error: any) {
            setError(error?.message);
        }
    };

    return (
        <>
            <h1 className="text-center text-xl">Editar Agenda</h1>
            {loading && (
                <p className="text-center font-sans text-gray-700 text-sm">
                    Carregando...
                </p>
            )}
            {error && (
                <p className="text-center text-lg text-red-800">{error}</p>
            )}
            {Agenda && (
                <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col w-1/2">
                        <form
                            className="flex flex-col align-center"
                            onSubmit={handleSubmit}
                        >
                            <label
                                className="font-sans text-gray-700 text-sm"
                                htmlFor="nome"
                            >
                                Nome
                            </label>
                            <input
                                className="border-2 border-gray-300 p-2 rounded-md"
                                type="text"
                                name="nome"
                                id="nome"
                                value={Agenda.nome}
                                onChange={(e) =>
                                    setAgenda({
                                        ...Agenda,
                                        nome: e.target.value,
                                    })
                                }
                            />
                            <label
                                className="font-sans text-gray-700 text-sm"
                                htmlFor="descricao"
                            >
                                Descrição
                            </label>
                            <textarea
                                className="border-2 border-gray-300 p-2 rounded-md h-64"
                                name="descricao"
                                id="descricao"
                                value={Agenda.descricao}
                                onChange={(e) =>
                                    setAgenda({
                                        ...Agenda,
                                        descricao: e.target.value,
                                    })
                                }
                            />
                            <small className="font-sans text-gray-700 text-sm">
                                {`${Agenda.quantContatos} contatos cadastrados nesta agenda`}
                            </small>
                            <button
                                className="bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-lg font-medium px-4 py-2 mt-4 w-fit-content"
                                type="submit"
                            >
                                Salvar
                            </button>
                            <button
                                className="bg-red-900 text-gray-300 hover:bg-red-700 hover:text-white rounded-md text-lg font-medium px-4 py-2 mt-4 w-fit-content"
                                type="button"
                                onClick={handleDeleteButton}
                            >
                                Apagar Agenda
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
