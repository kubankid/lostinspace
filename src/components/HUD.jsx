import React from 'react';

export default function HUD({ chips, debt, round, handIndex, totalHands, onPayDebt }) {
    return (
        <div className="hud">
            <div className="stat">
                <span className="stat-label">CHIPS</span>
                <span className="stat-value gold">${chips}</span>
            </div>
            <div className="stat">
                <span className="stat-label">DEBT</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="stat-value red">${debt}</span>
                    {debt > 0 && chips >= debt && onPayDebt && (
                        <button
                            onClick={onPayDebt}
                            style={{
                                padding: '2px 5px',
                                fontSize: '0.5rem',
                                height: 'auto',
                                minWidth: 'auto'
                            }}
                        >
                            PAY
                        </button>
                    )}
                </div>
            </div>
            <div className="stat">
                <span className="stat-label">ROUND</span>
                <span className="stat-value">{round}</span>
            </div>
            <div className="stat">
                <span className="stat-label">HAND</span>
                <span className="stat-value">{handIndex + 1}/{totalHands}</span>
            </div>
        </div>
    );
}
