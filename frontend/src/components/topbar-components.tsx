import { Link } from 'react-router-dom';
import * as React from 'react';
import styled from 'styled-components';

export const TopBar = (props: { children: React.ReactNode }) => {
    return (
        <div className="bg-black w-full z-10 font-sans">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 p-5">
                <div className="relative flex items-center justify-around h-16">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export const TopBarLink = (props: {
    children: React.ReactNode;
    to: string;
}) => {
    return (
        <Link
            to={props.to}
            className="text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-2xl font-medium border-2 border-white"
        >
            {props.children}
        </Link>
    );
};

export const TopBarButton = styled.button.attrs({
    className:
        'text-white hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-2xl font-medium border-2 border-white',
})``;
