import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { Container, ErroMessage } from '../components/common-components';
import {
    Form,
    FormTitle,
    FromGroup,
    InputText,
    Label,
    SubmitButton,
} from '../components/form-components';
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
            navigate('/agendas');
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <Container>
            <div className="flex-auto p-6">
                <FromGroup>
                    <FormTitle> Entre na Sua conta </FormTitle>
                </FromGroup>
                {error && <ErroMessage>{error}</ErroMessage>}
                <Form onSubmit={handleSubmit}>
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
                </Form>
            </div>
        </Container>
    );
};
