import * as React from 'react';
import { Link } from 'react-router-dom';

export const PageBody = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return (
        <>
            <div id="navbar" className="bg-gray-800 w-full z-10 font-sans">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-center h-16">
                        <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
                            to="/"
                        >
                            Lista de Agendas
                        </Link>
                        <Link
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium"
                            to="/criar-agenda"
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