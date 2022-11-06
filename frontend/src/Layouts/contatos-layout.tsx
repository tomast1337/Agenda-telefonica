import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    TopBar,
    TopBarButton,
    TopBarLink,
} from '../components/topbar-components';
import { logout, tokenRedirect } from '../token-utils';

export const ContatosPageBody = (props: { children: React.ReactNode }) => {
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
                <TopBarLink to="/agendas">Lista de Agendas</TopBarLink>
                <TopBarLink to={`/agenda/${id}`}>
                    {`Agenda ${context.AgendaSelecionada?.nome}`}
                </TopBarLink>
                <TopBarLink to={`/agenda/${id}/criar-contato`}>
                    {`Adicionar Contato`}
                </TopBarLink>
                <TopBarLink to={`/agenda/${id}/editar`}>
                    {`Editar Agenda`}
                </TopBarLink>
                <TopBarButton onClick={() => logout(navigate, context)}>
                    Logout
                </TopBarButton>
            </TopBar>
            <div className="flex flex-col justify-start min-h-screen mt-8">
                {children}
            </div>
        </>
    );
};
