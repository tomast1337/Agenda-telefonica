import * as React from 'react';
import { Agenda } from '~types';

export interface AppContextType {
    AgendaSelecionada: Agenda | null;
    api: string;
}

export const defaultState = {
    api: 'http://localhost:3000',
    AgendaSelecionada: null,
} as AppContextType;

export const AppContext = React.createContext({} as AppContextType);
