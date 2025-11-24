import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
    leftNode: null,
    centerNode: null,
    rightNode: null,
    setLeftNode: () => { },
    setCenterNode: () => { },
    setRightNode: () => { }
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children, value }) => {
    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};
