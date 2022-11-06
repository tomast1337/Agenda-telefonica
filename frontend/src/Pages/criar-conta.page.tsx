import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/common-components';
import { AppContext, AppContextType } from '../app-context';
import {
    Form,
    FormTitle,
    FromGroup,
    InputText,
    Label,
    LinkButton,
    SubmitButton,
} from '../components/form-components';
import { createAccount } from '../fetch-utils';

export const CriarContaPage = () => {
    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmSenha, setConfirmSenha] = React.useState('');
    const [error, setError] = React.useState<string | null>();
    const navigate = useNavigate();
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Criar Conta';
    }, []);
    const verificarSenhas = () => {
        if (senha !== confirmSenha) {
            setError('As senhas não conferem');
            return false;
        }
        if (senha.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        setError('');
        return true;
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (login === '' || senha === '' || confirmSenha === '') {
            setError('Preencha todos os campos');
            return;
        }
        if (!verificarSenhas()) {
            return;
        }
        try {
            await createAccount(login, senha, context);
            navigate('/');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <div className="flex-auto p-6">
                <FromGroup>
                    <FormTitle> Criar Conta </FormTitle>
                </FromGroup>
                {error && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                <Form onSubmit={handleSubmit}>
                    <FromGroup>
                        <Label>Nome de Usuário</Label>
                        <InputText
                            type="text"
                            value={login}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setLogin(e.target.value)}
                        />
                    </FromGroup>
                    <FromGroup>
                        <Label>Senha</Label>
                        <InputText
                            type="password"
                            value={senha}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setSenha(e.target.value);
                            }}
                        />
                    </FromGroup>
                    <FromGroup>
                        <Label>Confirmar Senha</Label>
                        <InputText
                            type="password"
                            value={confirmSenha}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => {
                                setConfirmSenha(e.target.value);
                            }}
                        />
                    </FromGroup>
                    <FromGroup>
                        <SubmitButton type="submit">Criar Conta</SubmitButton>
                    </FromGroup>
                    <FromGroup>
                        <Label>Já tem uma conta?</Label>
                        <LinkButton to="/">Faça login</LinkButton>
                    </FromGroup>
                </Form>
            </div>
        </Container>
    );
};
