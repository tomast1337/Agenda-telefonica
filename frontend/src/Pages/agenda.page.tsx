import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Contato } from '~types';

export const AgendaPage = () => {
    const { id } = useParams();
    const [contatos, setContatos] = React.useState<Contato[] | null>();
    React.useEffect(() => {
        document.title = `Agenda ${id}`;
    }, [id]);

    return <></>;
};
