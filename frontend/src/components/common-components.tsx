import * as React from 'react';
import styled from 'styled-components';

export const ErroMessage = (props: { children: React.ReactNode }) => {
    return (
        <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <span className="block sm:inline">{props.children}</span>
        </div>
    );
};

export const Container = styled.div.attrs({
    className:
        'flex flex-col font-sans rounded-md shadow-2xl bg-gray-100 w-1/2 mx-auto',
})``;

export const InfoMessage = (props: { children: React.ReactNode }) => {
    return (
        <div
            className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
            role="alert"
        >
            <span className="block sm:inline">{props.children}</span>
        </div>
    );
};

export const PageHeader = styled.h1.attrs({
    className: 'text-center text-3xl',
})``;
