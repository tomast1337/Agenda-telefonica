import * as React from 'react';
import { Agenda } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';

export const EditarAgendaPage = () => {
    const [Agenda, setAgenda] = React.useState<Agenda | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Editar Agenda';
        fetch(context.api + `/api/agenda/${id}`, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setAgenda(data);
                        console.log(data);
                        setLoading(false);
                    });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch(context.api + `/api/agenda/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Agenda),
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setAgenda(data);
                        console.log(data);
                        setLoading(false);
                        navigate(`/agenda/${id}`);
                    });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleDeleteButton = () => {
        fetch(context.api + `/api/agenda/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then(() => {
                        navigate('/');
                    });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
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
                            <label
                                className="font-sans text-gray-700 text-sm"
                                htmlFor="n-contatos"
                            >
                                {Agenda.quantContatos}
                                contatos cadastrados nesta agenda
                            </label>
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
