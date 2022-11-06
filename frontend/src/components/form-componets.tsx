import { Link } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';

export const Form = styled.form.attrs({
    className: 'flex flex-col justify-center items-center',
})``;

export const FormTitle = styled.h1.attrs({
    className: 'flex-auto text-4xl m-3 font-bold text-center',
})``;

export const FromGroup = styled.div.attrs({
    className: 'flex flex-col',
})``;

export const Label = styled.label.attrs({
    className: 'flex-auto m-3 font-semibold text-3xl',
})``;

export const InputText = styled.input.attrs({
    className:
        'flex-auto text-3xl m-3 font-semibold focus:border-gray-500 border-2 border-gray-300 rounded-md',
})``;

export const SubmitButton = styled.button.attrs({
    className:
        'flex-auto p-2 m-3 font-semibold text-4xl bg-black text-white rounded-md',
})``;

export const LinkButton = (props: {
    to: string;
    children: React.ReactNode;
}) => {
    return (
        <Link
            style={{
                textDecoration: 'none',
            }}
            className="flex-auto p-2 m-3 font-semibold text-2xl bg-black text-white rounded-md text-center"
            to={props.to}
        >
            {props.children}
        </Link>
    );
};
