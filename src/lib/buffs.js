export const BUFFS = [
    {
        id: 'loaded_dice',
        name: 'Loaded Dice',
        description: 'Start every hand with at least 18.',
        cost: 50,
        type: 'gameplay'
    },
    {
        id: 'safety_net',
        name: 'Safety Net',
        description: 'Get 5 chips back on a loss.',
        cost: 40,
        type: 'economy'
    },
    {
        id: 'high_roller',
        name: 'High Roller',
        description: 'Blackjack pays double.',
        cost: 75,
        type: 'economy'
    },
    {
        id: 'second_chance',
        name: 'Second Chance',
        description: 'Once per round, ignore a bust.',
        cost: 100,
        type: 'gameplay'
    },
    {
        id: 'charity',
        name: 'Charity',
        description: 'Debt increases 20% slower.',
        cost: 60,
        type: 'economy'
    },
    {
        id: 'ace_in_hole',
        name: 'Ace in the Hole',
        description: 'Start with an Ace if you have no Aces.',
        cost: 120,
        type: 'gameplay'
    }
];

export function applyBuffs(gameState, buffs) {
    // Logic to modify game state based on buffs
    // This will be expanded as we integrate into App.jsx
    return gameState;
}
