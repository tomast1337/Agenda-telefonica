import * as React from 'react';
import { Agenda } from '~types';

export type AppContextType = {
    AgendaSelecionada: Agenda | null;
    api: string;
};

export const AppContext = React.createContext({} as AppContextType);
