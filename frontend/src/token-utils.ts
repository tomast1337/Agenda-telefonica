import { NavigateFunction } from 'react-router-dom';
import { AppContextType } from './app-context';

export function logout(navigate: NavigateFunction, appContext: AppContextType) {
    appContext.AgendaSelecionada = null;
    appContext.Contatos = [];
    appContext.token = null;
    navigate('/login');
}

export function verifyToken(context: AppContextType): boolean {
    const token = context.token;
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedData = JSON.parse(window.atob(base64));
        const exp = decodedData.exp;
        const date = new Date(0);
        date.setUTCSeconds(exp);
        return date.valueOf() > new Date().valueOf();
    } catch (error: any) {
        return false;
    }
}

export function tokenRedirect(
    context: AppContextType,
    navigate: NavigateFunction,
): void {
    if (!verifyToken(context)) {
        navigate('/');
    }
}
