import React from 'react';

const ChipStack = ({ amount, isBet = false }) => {
    const chips = calculateChips(amount);

    return (
        <div className={`chip-stack-container ${isBet ? 'bet-stack' : 'total-stack'}`}>
            {chips.map((chip, index) => (
                <div
                    key={index}
                    className={`chip chip-${chip.color}`}
                    style={{ bottom: `${index * 4}px`, zIndex: index }}
                >
                    <div className="chip-inner"></div>
                </div>
            ))}
            {amount > 0 && <div className="chip-value-label">${amount}</div>}
        </div>
    );
};

const calculateChips = (amount) => {
    let remaining = amount;
    const chips = [];

    // Denominations: 100 (Black), 25 (Green), 5 (Red), 1 (White)
    // We want a reasonable number of chips visually, so we might cap it or use larger denoms if needed.
    // For now, simple greedy approach.

    const addChips = (value, color) => {
        const count = Math.floor(remaining / value);
        for (let i = 0; i < count; i++) {
            chips.push({ value, color });
        }
        remaining %= value;
    };

    addChips(100, 'black');
    addChips(25, 'green');
    addChips(5, 'red');
    addChips(1, 'white');

    // Reverse so larger chips are at bottom if we were stacking physically, 
    // but for CSS absolute positioning bottom-up, we might want array order.
    // Let's keep largest first in array, so they render first (bottom) if we map them.
    // Actually, if we map and use absolute bottom, index 0 is bottom.
    // So we want index 0 to be the first chip.
    // If we want mixed stack, usually largest value is at bottom? 
    // Or just mixed. Let's just stack them.

    return chips.reverse(); // Smallest at bottom? No, usually random or sorted. 
    // Let's do largest at bottom (index 0).
    // So we need to reverse the greedy result?
    // Greedy gives: 100, 100, 25...
    // If we map: index 0 (100) -> bottom: 0. index 1 (100) -> bottom: 4px.
    // This seems correct for a stack.
};

export default ChipStack;
