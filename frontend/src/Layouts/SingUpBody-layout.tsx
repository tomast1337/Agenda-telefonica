import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopBar, TopBarLink } from '../components/topbar-components';
import { AppContext, AppContextType } from '../app-context';
import { tokenRedirect } from '../token-utils';

export const SingUpBody = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        tokenRedirect(context, navigate);
    }, []);
    return (
        <>
            <TopBar>
                <TopBarLink to="/">Login</TopBarLink>
                <TopBarLink to="/criar-conta">Criar Conta</TopBarLink>
            </TopBar>
            <div className="flex flex-col justify-start min-h-screen mt-8">
                {children}
            </div>
        </>
    );
};
