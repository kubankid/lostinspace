import React from 'react';

const StartMenu = ({ onResume, onNewGame, onSettings, onQuit }) => {
    return (
        <div className="glass-panel" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            minWidth: '300px',
            zIndex: 1000
        }}>
            <h1 style={{
                color: '#00ffff',
                textShadow: '0 0 10px #00ffff',
                marginBottom: '20px',
                fontSize: '2rem',
                textAlign: 'center'
            }}>
                BLACKJACK PIT
            </h1>

            <button className="menu-btn" onClick={onResume}>RESUME</button>
            <button className="menu-btn" onClick={onNewGame}>NEW GAME</button>
            <button className="menu-btn" onClick={onSettings}>SETTINGS</button>
            <button className="menu-btn quit" onClick={onQuit}>QUIT</button>
        </div>
    );
};

export default StartMenu;
