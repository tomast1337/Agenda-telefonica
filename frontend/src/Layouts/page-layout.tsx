import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { tokenRedirect } from '../token-utils';

export const PageBody = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        tokenRedirect(context, navigate);
    }, []);
    return (
        <>
            <div id="navbar" className="bg-gray-800 w-full z-10 font-sans">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-center h-16">
                        <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
                            to="/agenda"
                        >
                            Lista de Agendas
                        </Link>
                        <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
                            to="/agenda/criar-agenda"
                        >
                            Criar Agenda
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
