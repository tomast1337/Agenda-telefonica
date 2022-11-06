import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { TopBar, TopBarLink } from '../components/topbar-components';
import { tokenRedirect } from '../token-utils';

export const AgendaPageBody = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const { id } = useParams();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        tokenRedirect(context, navigate);
    }, []);
    return (
        <>
            <TopBar>
                <TopBarLink to="/">Lista de Agendas</TopBarLink>
                <TopBarLink to={`/agenda/${id}`}>
                    {`Agenda ${context.AgendaSelecionada?.nome}`}
                </TopBarLink>
                <TopBarLink to={`/agenda/${id}/criar-contato`}>
                    {`Adicionar Contato à Agenda ${context.AgendaSelecionada?.nome}`}
                </TopBarLink>
                <TopBarLink to={`/agenda/${id}/editar`}>
                    {`Editar Agenda ${context.AgendaSelecionada?.nome}`}
                </TopBarLink>
            </TopBar>
            <div className="flex flex-col justify-start min-h-screen mt-8">
                {children}
            </div>
        </>
    );
};
