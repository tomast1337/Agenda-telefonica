import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    CardContainer,
    CardContent,
    CardImage,
    CardTitle,
    Container,
    ErroMessage,
    InfoMessage,
    PageHeader,
} from '../components/common-components';
import { LinkButton } from '../components/form-components';
import { getContatos } from '../fetch-utils';
import { Contato } from '../types';

const ContatoCard = (props: { contato: Contato }) => {
    const { contato } = props;
    const context: AppContextType = React.useContext(AppContext);
    return (
        <>
            <CardContainer>
                <CardImage
                    src={
                        contato.imagem ||
                        'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    }
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-t-md"
                />
                <CardContent>
                    <CardTitle>{contato.nome}</CardTitle>
                    <LinkButton
                        to={`/agenda/${context.AgendaSelecionada?.id}/${contato.id}`}
                    >
                        Ver detalhes ou Editar
                    </LinkButton>
                </CardContent>
            </CardContainer>
        </>
    );
};

export const AgendaPage = () => {
    const { id } = useParams();
    const [contatos, setContatos] = React.useState<Contato[] | null>();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = `Agenda ${context.AgendaSelecionada?.nome}`;
        if (!context.AgendaSelecionada) {
            navigate('/');
        }
        (async () => {
            try {
                if (id) {
                    const contatos = await getContatos(+id, context);
                    setContatos(contatos);
                }
            } catch (error: any) {
                setError(error.message);
            }
            setLoading(false);
        })();
    }, [id]);

    return (
        <Container>
            <PageHeader>{`Contatos da agenda ${context.AgendaSelecionada?.nome}`}</PageHeader>
            {loading && <InfoMessage>Carregando...</InfoMessage>}
            {error && <ErroMessage>{error}</ErroMessage>}
            {contatos ? (
                contatos.length > 0 ? (
                    <ul className="flex flex-col">
                        {contatos.map((contato) => (
                            <ContatoCard contato={contato} key={contato.id} />
                        ))}
                    </ul>
                ) : (
                    <ErroMessage>Nenhum contato encontrado</ErroMessage>
                )
            ) : (
                <ErroMessage>Nenhum contato encontrado</ErroMessage>
            )}
        </Container>
    );
};
