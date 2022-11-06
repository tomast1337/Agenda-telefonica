import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import {
    deleteContato,
    getContato,
    updateContato,
    updateContatoImage,
} from '../fetch-utils';
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
        <>
            <h1 className="text-center text-xl">Editar Contato</h1>
            {error && (
                <p className="text-center text-lg text-red-700">{error}</p>
            )}
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
                {/* Image preview */}
                <img
                    src={
                        imagePreview
                            ? imagePreview
                            : 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    }
                    className="w-32 h-32 rounded-full"
                    alt="Imagem do contato"
                />
                <div className="flex flex-col w-1/2">
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="nome"
                    >
                        Nome
                    </label>
                    <input
                        className="border-2 border-gray-300 p-2 rounded-md"
                        type="text"
                        name="nome"
                        id="nome"
                        value={nome}
                        onChange={(event) => {
                            setNome(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="border-2 border-gray-300 p-2 rounded-md"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="telefone"
                    >
                        Telefone
                    </label>
                    <input
                        className="border-2 border-gray-300 p-2 rounded-md"
                        type="tel"
                        name="telefone"
                        id="telefone"
                        value={telefone}
                        onChange={(event) => {
                            setTelefone(event.target.value);
                        }}
                    />
                    <label
                        className="font-sans text-gray-700 text-sm"
                        htmlFor="imagem"
                    >
                        Imagem
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="imagem"
                        id="imagem"
                        onChange={(event) => {
                            const { files } = event.target;
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
                </div>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="submit"
                >
                    Salvar Edição
                </button>
                <button
                    className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    type="button"
                    onClick={handleDelete}
                >
                    Excluir Contato
                </button>
            </form>
        </>
    );
};
