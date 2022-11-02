import * as React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageBody } from './Layouts/page-layout';
import { IndexPage } from './Pages/index.page';
import { CriarAgendaPage } from './Pages/criar-agenda.page';
import { EditarAgendaPage } from './Pages/editar-agenda.page';
import { AgendaPageBody } from './Layouts/agenda-page-layout';
import { AgendaPage } from './Pages/agenda.page';

export default () => {
    return (
        <>
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
                        element={<AgendaPageBody></AgendaPageBody>}
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
        </>
    );
};
