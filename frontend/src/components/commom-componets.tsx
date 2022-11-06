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
