import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { Contato } from '../types';

export const CriarContatoPage = () => {
    const [error, setError] = React.useState<string | null>();
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
        const formData = new FormData();
        formData.append('imagem', file);
        fetch(context.api + `/api/contatos/${contatoId}/imagem`, {
            method: 'PUT',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    navigate(`/agenda/${context.AgendaSelecionada?.id}`);
                }
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const contato = {
            nome,
            email,
            telefone,
            agendaId: context.AgendaSelecionada?.id,
        } as Contato;
        fetch(context.api + `/api/contatos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contato),
        })
            .then((response) => {
                if (response.ok) {
                    if (imagem) {
                        response.json().then((contato) => {
                            uploadImage(contato.id, imagem);
                        });
                    } else {
                        navigate(`/agenda/${context.AgendaSelecionada?.id}`);
                    }
                }
            })
            .catch((error) => {
                setError(error);
            });
    };
    return (
        <>
            <h1 className="text-center text-xl">Criar Contato</h1>
            {error && (
                <p className="text-center text-lg text-red-700">{error}</p>
            )}
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
            >
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
                    Criar novo Contato
                </button>
            </form>
        </>
    );
};
