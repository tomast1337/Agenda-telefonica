import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    CardContainer,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    Container,
    ErroMessage,
    InfoMessage,
    PageHeader,
    SmallText,
} from '../components/common-components';
import { getAgendas } from '../fetch-utils';
import { Agenda } from '../types';

export const AgendaDetail = (props: { agenda: Agenda }) => {
    const { agenda } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    return (
        <CardContainer
            onClick={() => {
                context.AgendaSelecionada = agenda;
                navigate(`/agenda/${agenda.id}`);
            }}
        >
            <CardContent>
                <CardTitle>{agenda.nome}</CardTitle>
                <CardDescription>{agenda.descricao}</CardDescription>
                <SmallText>{`${agenda.quantContatos} contatos`}</SmallText>
            </CardContent>
        </CardContainer>
    );
};

export const AgendasPage = () => {
    const [agendas, setAgendas] = React.useState<Agenda[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const context: AppContextType = React.useContext(AppContext);
    React.useEffect(() => {
        document.title = 'Agenda Telefônica';
        if (loading) {
            (async () => {
                try {
                    const agendas = await getAgendas(context);
                    setAgendas(agendas);
                    setLoading(false);
                    if (agendas.length === 0) {
                        setError('Nenhuma agenda encontrada');
                    }
                } catch (error: any) {
                    setError(error.message);
                }
            })();
        }
    }, []);

    return (
        <>
            <PageHeader>Lista Agendas</PageHeader>
            <Container>
                {loading && <InfoMessage>Carregando...</InfoMessage>}
                {error && <ErroMessage> Erro ao carregar agendas </ErroMessage>}
                <ul>
                    {agendas.length > 0 &&
                        agendas.map((agenda) => (
                            <AgendaDetail key={agenda.id} agenda={agenda} />
                        ))}
                </ul>
            </Container>
        </>
    );
};
