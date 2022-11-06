import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    deleteContato,
    getContato,
    updateContato,
    updateContatoImage,
} from '../fetch-utils';
import { Container, ErroMessage } from '../components/common-components';
import {
    CancelButton,
    Form,
    FormTitle,
    FromGroup,
    ImagemPreview,
    InputFile,
    InputText,
    Label,
    SubmitButton,
} from '../components/form-components';
import { Contato } from '../types';

export const EditarContatoPage = () => {
    const { contatoId } = useParams();
    const [error, setError] = React.useState<string | null>();
    const [id, setId] = React.useState(-1);
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [imagem, setImagem] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<null | string>();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = `Detalhes Contato`;
        if (!context.AgendaSelecionada) {
            navigate('/');
        } else {
            if (contatoId && context.AgendaSelecionada) {
                (async () => {
                    const contato = await getContato(
                        context.AgendaSelecionada.id,
                        +contatoId,
                        context,
                    );
                    setId(contato.id);
                    setNome(contato.nome);
                    setEmail(contato.email);
                    setTelefone(contato.telefone);
                    setImagePreview(contato.imagem);
                })();
            }
        }
    }, []);
    const uploadImage = async (contatoId: number, file: File) => {
        try {
            await updateContatoImage(contatoId, file, context);
        } catch (error: any) {
            setError(error.message);
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const contato = {
            id,
            nome,
            email,
            telefone,
            agendaId: context.AgendaSelecionada?.id,
        } as Contato;
        try {
            await updateContato(contato, context);
            if (imagem) {
                await uploadImage(contato.id, imagem);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            navigate(`/agenda/${context.AgendaSelecionada?.id}`);
        } catch (error: any) {
            setError(error.message);
        }
    };
    const handleDelete = () => {
        try {
            deleteContato(id, context);
            navigate(`/agenda/${context.AgendaSelecionada?.id}`);
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <Container>
            <FromGroup>
                <FormTitle>Editar Contato</FormTitle>
            </FromGroup>

            {error && <ErroMessage>{error}</ErroMessage>}
            <Form onSubmit={handleSubmit}>
                <FromGroup>
                    <ImagemPreview
                        src={
                            imagePreview
                                ? imagePreview
                                : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        }
                        alt="Imagem do contato"
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="nome">Nome</Label>
                    <InputText
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNome(e.target.value);
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="email">Email</Label>
                    <InputText
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="telefone">Telefone</Label>
                    <InputText
                        type="tel"
                        name="telefone"
                        id="telefone"
                        value={telefone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setTelefone(e.target.value);
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <Label htmlFor="imagem">Imagem</Label>
                    <InputFile
                        type="file"
                        accept="image/*"
                        name="imagem"
                        id="imagem"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const { files } = e.target;
                            if (files) {
                                const file = files[0];
                                setImagem(file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </FromGroup>
                <FromGroup>
                    <SubmitButton type="submit">Salvar Edição</SubmitButton>
                </FromGroup>
                <FromGroup>
                    <CancelButton type="button" onClick={handleDelete}>
                        Excluir Contato
                    </CancelButton>
                </FromGroup>
            </Form>
        </Container>
    );
};
