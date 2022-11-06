import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormTitle } from '../components/form-components';
import { Agenda } from '../types';
import { AppContext, AppContextType } from '../app-context';
import { Container, ErroMessage } from '../components/common-components';
import {
    Form,
    FromGroup,
    InputText,
    Label,
    LinkButton,
    SubmitButton,
    TextArea,
} from '../components/form-components';
import { createAgenda } from '../fetch-utils';

export const CriarAgendaPage = () => {
    React.useEffect(() => {
        document.title = 'Criar Agenda';
    }, []);

    const [nome, setNome] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [erro, setErro] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const context: AppContextType = React.useContext(AppContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createAgenda({ nome, descricao } as Agenda, context);
            navigate('/');
        } catch (error: any) {
            setErro(error.message);
        }
    };

    return (
        <Container>
            <FromGroup>
                <FormTitle>Criar Agenda</FormTitle>
            </FromGroup>
            {erro && <ErroMessage>{erro}</ErroMessage>}
            <Form onSubmit={handleSubmit}>
                <FromGroup>
                    <Label htmlFor="nome">Nome</Label>
                    <InputText
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNome(e.target.value)
                        }
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="descricao">Descrição</Label>
                    <TextArea
                        id="descricao"
                        value={descricao}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDescricao(e.target.value)
                        }
                    />
                </FromGroup>
                <SubmitButton type="submit">Criar Nova Agenda</SubmitButton>
                <LinkButton to="/">Voltar Para a Página Inicial</LinkButton>
            </Form>
        </Container>
    );
};
