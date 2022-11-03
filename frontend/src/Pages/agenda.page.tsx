import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext, AppContextType } from '../app-context';
import { Contato } from '~types';

const ContatoCard = (props: { contato: Contato }) => {
    const { contato } = props;
    const context: AppContextType = React.useContext(AppContext);
    const navigate = useNavigate();
    return (
        <>
            <li className="flex font-sans rounded-md shadow-2xl bg-gray-100 w-1/2 my-2 mx-auto">
                <div className="flex-none w-48 relative">
                    <img
                        src={
                            contato.imagem ||
                            'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        }
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover rounded-t-md"
                    />
                </div>
                <div className="flex-auto p-6">
                    <div className="flex flex-col">
                        <h1 className="flex-auto text-xl font-semibold">
                            {contato.nome}
                        </h1>
                        <p>{contato.email}</p>
                        <p>{contato.telefone}</p>
                    </div>
                    <Link
                        className="bg-gray-300 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-400 m-1 p-1"
                        to={`/agenda/${context.AgendaSelecionada?.id}/${contato.id}`}
                    >
                        Editar Contato
                    </Link>
                </div>
            </li>
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
        fetch(context.api + `/api/contatos/${id}`)
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    response.json().then((data) => {
                        setContatos(data);
                    });
                } else {
                    console.log(response);
                    setError('Nem um Contato encontrado');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }, [id]);

    return (
        <>
            <h1 className="text-center text-xl">{`Contatos da agenda ${context.AgendaSelecionada?.nome}`}</h1>
            {loading && (
                <p className="text-center text-lg text-gray-800">
                    Carregando...
                </p>
            )}
            {error && (
                <p className="text-center text-lg text-red-700">{error}</p>
            )}
            {contatos &&
                (contatos.length > 0 ? (
                    <ul className="flex flex-col">
                        {contatos.map((contato) => (
                            <ContatoCard contato={contato} key={contato.id} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-lg text-gray-800">
                        Nenhum contato encontrado
                    </p>
                ))}
        </>
    );
};
