import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageBody } from './Layouts/page-layout';
import { IndexPage } from './Pages/index.page';
import { CriarAgendaPage } from './Pages/criar-agenda.page';
import { EditarAgendaPage } from './Pages/editar-agenda.page';
import { AgendaPageBody } from './Layouts/agenda-page-layout';
import { AgendaPage } from './Pages/agenda.page';
import { AppContext } from './app-context';
import { CriarContatoPage } from './Pages/criar-contato.page';
import { EditarContatoPage } from './Pages/editar-contato.page';

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
