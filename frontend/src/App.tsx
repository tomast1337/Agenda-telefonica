import * as React from 'react';
import { HashRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { AppContext, AppContextType, defaultState } from './app-context';
import { AgendaPageBody } from './Layouts/agenda-page-layout';
import { PageBody } from './Layouts/page-layout';
import { AgendaPage } from './Pages/agenda.page';
import { AgendasPage } from './Pages/agendas.page';
import { CriarAgendaPage } from './Pages/criar-agenda.page';
import { CriarContaPage } from './Pages/criar-conta.page';
import { CriarContatoPage } from './Pages/criar-contato.page';
import { EditarAgendaPage } from './Pages/editar-agenda.page';
import { EditarContatoPage } from './Pages/editar-contato.page';
import { LoginPage } from './Pages/login.page';
import { tokenRedirect } from './token-utils';

const SingUpBody = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        tokenRedirect(context, navigate);
    }, []);
    return (
        <>
            <div className="bg-black w-full z-10 font-sans">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 p-5">
                    <div className="relative flex items-center justify-around h-16">
                        <Link
                            className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-5xl font-medium border-2 border-white"
                            to="/"
                        >
                            Login
                        </Link>
                        <Link
                            className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-5xl font-medium border-2 border-white"
                            to="/criar-conta"
                        >
                            Criar Conta
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start min-h-screen mt-8">
                {children}
            </div>
        </>
    );
};

export default () => {
    return (
        <>
            <AppContext.Provider value={defaultState}>
                <HashRouter>
                    <Routes>
                        {/* Home e Login Page */}
                        <Route
                            path="/"
                            element={
                                <SingUpBody>
                                    <LoginPage />
                                </SingUpBody>
                            }
                        />
                        {/* Criação de conta */}
                        <Route
                            path="/criar-conta"
                            element={
                                <SingUpBody>
                                    <CriarContaPage />
                                </SingUpBody>
                            }
                        />
                        {/* Criação de agenda */}
                        <Route
                            path="/agenda"
                            element={
                                <PageBody>
                                    <AgendasPage />
                                </PageBody>
                            }
                        />
                        {/* Criação de agenda */}
                        <Route
                            path="/agenda/criar-agenda"
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
                            path="/agenda/:id/:contatoId"
                            element={
                                <AgendaPageBody>
                                    <EditarContatoPage />
                                </AgendaPageBody>
                            }
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
                                <SingUpBody>
                                    <h1>404</h1>
                                </SingUpBody>
                            }
                        />
                    </Routes>
                </HashRouter>
            </AppContext.Provider>
        </>
    );
};
