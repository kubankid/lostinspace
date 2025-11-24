import React from 'react';
import { soundManager } from '../lib/audio';

const BettingControls = ({ currentBet, onChangeBet, minBet = 10, chips }) => {
    const maxBet = chips; // Max bet is player's current chips
    const handleBetChange = (amount) => {
        const newBet = Math.min(Math.max(currentBet + amount, minBet), maxBet);
        // Allow changing if we have enough chips OR if we are reducing the bet
        if (newBet <= chips || amount < 0) {
            soundManager.playClick();
            onChangeBet(newBet);
        }
    };

    return (
        <div className="betting-controls">
            <div className="bet-display">
                <span className="label">BET</span>
                <span className="value">${currentBet}</span>
            </div>
            <div className="bet-buttons">
                <button onClick={() => handleBetChange(-10)} disabled={currentBet <= minBet}>-10</button>
                <button onClick={() => handleBetChange(10)} disabled={currentBet >= maxBet || currentBet + 10 > chips}>+10</button>
                <button onClick={() => handleBetChange(50)} disabled={currentBet >= maxBet || currentBet + 50 > chips}>+50</button>
            </div>
        </div>
    );
};

export default BettingControls;
