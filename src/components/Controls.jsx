import React from 'react';
import { soundManager } from '../lib/audio';

import BettingControls from './BettingControls';

const Controls = ({ onHit, onStand, onDouble, onSplit, onDeal, onKeepBet, onRebet, gameState, canDouble, canSplit, currentBet, onChangeBet, chips }) => {
    const handleAction = (action, callback) => {
        soundManager.playClick();
        callback();
    };

    if (gameState === 'initial' || gameState === 'betting') {
        return (
            <div className="controls">
                <BettingControls
                    currentBet={currentBet}
                    onChangeBet={onChangeBet}
                    chips={chips}
                />
                <button onClick={() => handleAction('deal', onDeal)}>Deal</button>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div className="controls">
                <button onClick={() => handleAction('rebet', onRebet)}>Rebet</button>
                <button onClick={() => handleAction('keepbet', onKeepBet)}>Keep Bet</button>
            </div>
        );
    }

    if (gameState === 'playing') {
        return (
            <div className="controls">
                <button onClick={() => handleAction('hit', onHit)}>Hit</button>
                <button onClick={() => handleAction('stand', onStand)}>Stand</button>
                {canDouble && <button onClick={() => handleAction('double', onDouble)}>Double</button>}
                {canSplit && <button onClick={() => handleAction('split', onSplit)}>Split</button>}
            </div>
        );
    }

    return null;
};

export default Controls;
