import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { ErroMessage } from '../components/commom-componets';
import {
    FormTitle,
    FromGroup,
    InputText,
    Label,
    SubmitButton,
} from '../components/form-componets';
import { login } from '../fetch-utils';
import { tokenRedirect } from '../token-utils';

export const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = 'Login';
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setError('Preencha todos os campos');
            return;
        }
        try {
            const token = await login(username, password, context);
            context.token = token;
            tokenRedirect(context, navigate);
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <>
            <div className="flex flex-col font-sans rounded-md shadow-2xl bg-gray-100 w-1/2 mx-auto">
                <div className="flex-auto p-6">
                    <FromGroup>
                        <FormTitle> Entre na Sua conta </FormTitle>
                    </FromGroup>
                    {error && <ErroMessage>{error}</ErroMessage>}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center"
                    >
                        <FromGroup>
                            <Label>Nome de Usuário</Label>
                            <InputText
                                type="text"
                                value={username}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setUsername(e.target.value)}
                            />
                        </FromGroup>
                        <FromGroup>
                            <Label>Senha</Label>
                            <InputText
                                type="password"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>,
                                ) => setPassword(e.target.value)}
                            />
                        </FromGroup>
                        <FromGroup>
                            <SubmitButton type="submit">Login</SubmitButton>
                        </FromGroup>
                    </form>
                </div>
            </div>
        </>
    );
};
