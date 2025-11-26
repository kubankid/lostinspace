import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
    leftNode: null,
    centerNode: null,
    rightNode: null,
    menuNode: null,
    shopOpen: false,
    statusOpen: false,
    menuOpen: false,
    setLeftNode: () => { },
    setCenterNode: () => { },
    setRightNode: () => { },
    setMenuNode: () => { },
    setShopOpen: () => { },
    setStatusOpen: () => { },
    setMenuOpen: () => { }
});

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children, value }) => {
    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};
