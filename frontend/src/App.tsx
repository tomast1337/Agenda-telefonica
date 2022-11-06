import * as React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppContext, defaultState } from './app-context';
import { ContatosPageBody } from './Layouts/contatos-layout';
import { PageBody } from './Layouts/agendas-layout';
import { AgendaPage } from './Pages/agenda.page';
import { AgendasPage } from './Pages/agendas.page';
import { CriarAgendaPage } from './Pages/criar-agenda.page';
import { CriarContaPage } from './Pages/criar-conta.page';
import { CriarContatoPage } from './Pages/criar-contato.page';
import { EditarAgendaPage } from './Pages/editar-agenda.page';
import { EditarContatoPage } from './Pages/editar-contato.page';
import { LoginPage } from './Pages/login.page';
import { SingUpBody } from './Layouts/SingUpBody-layout';

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
                            path="/agendas"
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
                                <ContatosPageBody>
                                    <AgendaPage />
                                </ContatosPageBody>
                            }
                        />
                        {/* Criação detalha des de contato */}
                        <Route
                            path="/agenda/:id/:contatoId"
                            element={
                                <ContatosPageBody>
                                    <EditarContatoPage />
                                </ContatosPageBody>
                            }
                        />
                        {/* Criação de contato em uma agenda*/}
                        <Route
                            path="/agenda/:id/criar-contato"
                            element={
                                <ContatosPageBody>
                                    <CriarContatoPage />
                                </ContatosPageBody>
                            }
                        />
                        <Route
                            path="/agenda/:id/editar"
                            element={
                                <ContatosPageBody>
                                    <EditarAgendaPage />
                                </ContatosPageBody>
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
