import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    Container,
    ErroMessage,
    InfoMessage,
    SmallText,
} from '../components/common-components';
import {
    CancelButton,
    Form,
    FormTitle,
    FromGroup,
    InputText,
    Label,
    SubmitButton,
    TextArea,
} from '../components/form-components';
import { deleteAgenda, updateAgenda } from '../fetch-utils';
import { Agenda } from '../types';

export const EditarAgendaPage = () => {
    const [Agenda, setAgenda] = React.useState<Agenda>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Editar Agenda';
        if (!context.AgendaSelecionada) {
            navigate('/');
        } else {
            setAgenda(context.AgendaSelecionada);
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (Agenda) {
                const agenda = await updateAgenda(Agenda, context);
                context.AgendaSelecionada = agenda;
                navigate(`/agenda/${context.AgendaSelecionada?.id}`);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleDeleteButton = async () => {
        try {
            if (Agenda) {
                await deleteAgenda(Agenda.id, context);
                navigate('/');
            }
        } catch (error: any) {
            setError(error?.message);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>Editar Agenda</FormTitle>
                {error && <ErroMessage>{error}</ErroMessage>}
                {loading && <InfoMessage>Carregando...</InfoMessage>}
                <FromGroup>
                    <Label htmlFor="nome">Nome</Label>
                    <InputText
                        type="text"
                        name="nome"
                        id="nome"
                        value={Agenda?.nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (Agenda) {
                                setAgenda({
                                    ...Agenda,
                                    nome: e.target.value,
                                });
                            }
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="descricao">Descrição</Label>
                    <TextArea
                        name="descricao"
                        id="descricao"
                        value={Agenda?.descricao}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (Agenda) {
                                setAgenda({
                                    ...Agenda,
                                    descricao: e.target.value,
                                });
                            }
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <SmallText>
                        {`${Agenda?.quantContatos} contatos cadastrados nesta agenda`}
                    </SmallText>
                </FromGroup>
                <FromGroup>
                    <SubmitButton type="submit">Salvar</SubmitButton>
                </FromGroup>
                <CancelButton type="button" onClick={handleDeleteButton}>
                    Apagar Agenda
                </CancelButton>
            </Form>
        </Container>
    );
};
