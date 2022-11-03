import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAgenda } from '../fetch-utils';
import { AppContext, AppContextType } from '../app-context';
import { Agenda } from '~types';

export const CriarAgendaPage = () => {
    React.useEffect(() => {
        document.title = 'Criar Agenda';
    }, []);

    const [nome, setNome] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [erro, setErro] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const context: AppContextType = React.useContext(AppContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createAgenda({ nome, descricao } as Agenda, context.api);
            navigate('/');
        } catch (error: any) {
            setErro(error.message);
        }
    };

    return (
        <>
            <h1 className="text-center text-xl">Criar Agenda</h1>
            {/* Erro message */}
            {erro && (
                <p className="text-center text-lg text-gray-800">{erro}</p>
            )}
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col w-1/2">
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="nome"
                    >
                        Nome
                    </label>
                    <input
                        id="nome"
                        type="text"
                        className="border-2 border-gray-300 p-2 rounded-md"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className="flex flex-col w-1/2">
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="descricao"
                    >
                        Descrição
                    </label>
                    <textarea
                        id="descricao"
                        className="border-2 border-gray-300 p-2 rounded-md h-64"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="submit"
                >
                    Criar Nova Agenda
                </button>
                <Link
                    to="/"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="button"
                >
                    Voltar Para a Página Inicial
                </Link>
            </form>
        </>
    );
};
