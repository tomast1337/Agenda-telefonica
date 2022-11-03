import * as React from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { PageBody } from './Layouts/page-layout';
import { IndexPage } from './Pages/index.page';
import { CriarAgendaPage } from './Pages/criar-agenda.page';
import { EditarAgendaPage } from './Pages/editar-agenda.page';
import { AgendaPageBody } from './Layouts/agenda-page-layout';
import { AgendaPage } from './Pages/agenda.page';
import { AppContext, AppContextType } from './app-context';
import { Contato } from './types';

const CriarContatoPage = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>();
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [imagem, setImagem] = React.useState<string>();
    const [imagePreview, setImagePreview] = React.useState<null | string>();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = `Criar Contato`;
        if (!context.AgendaSelecionada) {
            navigate('/');
        }
    }, []);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('telefone', telefone);
        if (imagem) {
            formData.append('imagem', imagem);
        }
        fetch(`${context.api}/api/contato/`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    navigate(`/agenda/${context.AgendaSelecionada?.id}`);
                } else {
                    response.json().then((data) => {
                        setError(data.message);
                    });
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    return (
        <>
            <h1 className="text-center text-xl">Criar Contato</h1>
            {error && (
                <p className="text-center text-lg text-red-700">{error}</p>
            )}
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                {/* Image preview */}
                <img
                    src={
                        imagePreview
                            ? imagePreview
                            : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    }
                    className="w-32 h-32 rounded-full"
                    alt="Imagem do contato"
                />

                <div className="flex flex-col w-1/2">
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
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="border-2 border-gray-300 p-2 rounded-md"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="telefone"
                    >
                        Telefone
                    </label>
                    <input
                        className="border-2 border-gray-300 p-2 rounded-md"
                        type="tel"
                        name="telefone"
                        id="telefone"
                        value={telefone}
                        onChange={(event) => {
                            setTelefone(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="imagem"
                    >
                        Imagem
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="imagem"
                        id="imagem"
                        onChange={(event) => {
                            const { files } = event.target;
                            if (files) {
                                const file = files[0];
                                setImagem(file.name);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="submit"
                >
                    Criar novo Contato
                </button>
            </form>
        </>
    );
};

export default () => {
    return (
        <>
            <AppContext.Provider
                value={{
                    api: 'http://localhost:3000',
                    AgendaSelecionada: null,
                }}
            >
                <HashRouter>
                    <Routes>
                        {/* Criação de agenda */}
                        <Route
                            path="/"
                            element={
                                <PageBody>
                                    <IndexPage />
                                </PageBody>
                            }
                        />
                        {/* Criação de agenda */}
                        <Route
                            path="/criar-agenda"
                            element={
                                <PageBody>
                                    <CriarAgendaPage />
                                </PageBody>
                            }
                        />
                        {/* Listar Todos os contados */}
                        <Route
                            path="/agenda/:id"
                            element={
                                <AgendaPageBody>
                                    <AgendaPage />
                                </AgendaPageBody>
                            }
                        />
                        {/* Criação detalha des de contato */}
                        <Route
                            path="/agenda/:id/:contato"
                            element={<AgendaPageBody></AgendaPageBody>}
                        />
                        {/* Criação de contato em uma agenda*/}
                        <Route
                            path="/agenda/:id/criar-contato"
                            element={
                                <AgendaPageBody>
                                    <CriarContatoPage />
                                </AgendaPageBody>
                            }
                        />
                        <Route
                            path="/agenda/:id/editar"
                            element={
                                <AgendaPageBody>
                                    <EditarAgendaPage />
                                </AgendaPageBody>
                            }
                        />
                        {/* Rota para quando não encontrar nenhuma rota */}
                        <Route
                            path="*"
                            element={
                                <PageBody>
                                    <h1>404</h1>
                                </PageBody>
                            }
                        />
                    </Routes>
                </HashRouter>
            </AppContext.Provider>
        </>
    );
};
