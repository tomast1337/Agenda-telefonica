import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { Container, ErroMessage } from '../components/common-components';
import {
    Form,
    FormTitle,
    FromGroup,
    ImagemPreview,
    InputFile,
    InputText,
    Label,
    SubmitButton,
} from '../components/form-components';
import { createContato, updateContatoImage } from '../fetch-utils';
import { Contato } from '../types';

export const CriarContatoPage = () => {
    const [error, setError] = React.useState<string | null>();
    const [idCriado, setIdCriado] = React.useState(-1);
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [telefone, setTelefone] = React.useState('');
    const [imagem, setImagem] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<null | string>();
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    React.useEffect(() => {
        document.title = `Criar Contato`;
        if (!context.AgendaSelecionada) {
            navigate('/');
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
            nome,
            email,
            telefone,
            agendaId: context.AgendaSelecionada?.id,
        } as Contato;

        try {
            contato.id = await (await createContato(contato, context)).id;
            if (imagem) {
                await uploadImage(contato.id, imagem);
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            navigate(`/agenda/${context.AgendaSelecionada?.id}`);
        } catch (error: any) {
            setError(error.message);
        }
    };
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FromGroup>
                    <FormTitle>Criar Contato</FormTitle>
                </FromGroup>
                {error && <ErroMessage>{error}</ErroMessage>}
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
                    <SubmitButton type="submit">
                        Criar novo Contato
                    </SubmitButton>
                </FromGroup>
            </Form>
        </Container>
    );
};
