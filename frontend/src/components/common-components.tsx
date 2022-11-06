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
        'flex flex-col font-sans rounded-md shadow-2xl bg-gray-100 w-2/3 mx-auto',
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

export const SmallText = styled.small.attrs({
    className: 'font-sans text-gray-700 text-sm',
})``;

export const CardContainer = styled.li.attrs({
    className:
        'flex font-sans rounded-md shadow-2xl bg-white w-3/4 my-2 mx-auto',
})``;

export const CardImage = (
    props: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >,
) => {
    return (
        <div className="flex-none w-48 relative">
            <img
                {...props}
                alt=""
                className="absolute inset-0 w-full h-full object-cover rounded-t-md"
            />
        </div>
    );
};

export const CardContent = styled.div.attrs({
    className: 'flex-auto p-6',
})``;

export const CardTitle = styled.h3.attrs({
    className: 'text-xl font-semibold',
})``;

export const CardDescription = styled.p.attrs({
    className: 'text-gray-700 text-base',
})``;

export const CardFooter = styled.div.attrs({
    className: 'flex items-center justify-between leading-none p-2 md:p-4',
})``;
