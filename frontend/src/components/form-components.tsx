import { Link } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';

export const Form = styled.form.attrs({
    className: 'flex flex-col justify-center items-center',
})``;

export const FormTitle = styled.h1.attrs({
    className: 'flex-auto text-4xl m-2 font-bold text-center',
})``;

export const FromGroup = styled.div.attrs({
    className: 'flex flex-col',
})``;

export const Label = styled.label.attrs({
    className: 'flex-auto m-2 font-semibold text-xl',
})``;

export const InputText = styled.input.attrs({
    className:
        'flex-auto text-xl m-2 font-semibold focus:border-gray-500 border-2 border-gray-300 rounded-md',
})``;

export const InputFile = styled.input.attrs({
    className:
        'flex-auto text-xl m-2 font-semibold focus:border-gray-500 border-2 border-gray-300 rounded-md',
})``;

export const ImagemPreview = styled.img.attrs({
    className: 'flex-auto w-32 h-32 rounded-full',
})``;

export const TextArea = styled.textarea.attrs({
    className:
        'flex-auto text-xl m-2 font-semibold focus:border-gray-500 border-2 border-gray-300 rounded-md h-64',
})``;

export const SubmitButton = styled.button.attrs({
    className:
        'flex-auto p-2 m-2 font-semibold text-4xl bg-black text-white rounded-md',
})``;

export const CancelButton = styled(Link).attrs({
    className:
        'flex-auto p-2 m-2 font-semibold text-4xl bg-red-900 text-white rounded-md',
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
            className="flex-auto p-2 m-2 font-semibold text-2xl bg-black text-white rounded-md text-center"
            to={props.to}
            type="button"
        >
            {props.children}
        </Link>
    );
};
