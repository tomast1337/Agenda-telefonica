import * as React from 'react';
import { Agenda, Contato } from './types';

export interface AppContextType {
    api: string;
    AgendaSelecionada: Agenda | null;
    Contatos: Contato[] | null;
    token: string | null;
}

export const defaultState = {
    api: 'http://localhost:3000',
    AgendaSelecionada: null,
    Contatos: null,
    token: null,
} as AppContextType;

export const AppContext = React.createContext({} as AppContextType);
