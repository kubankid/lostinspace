export function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    for (const card of hand) {
        value += card.value;
        if (card.rank === 'A') {
            aces += 1;
        }
    }

    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }

    return value;
}

export function isBust(hand) {
    return calculateHandValue(hand) > 21;
}

export function isBlackjack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

export function shouldDealerHit(hand, trait = 'standard') {
    const value = calculateHandValue(hand);

    if (trait === 'aggressive') {
        // Hit on soft 17 or anything less than 17
        // Soft 17 check: Value is 17 and has an Ace counted as 11?
        // Simplified: Just hit on 17 if it's soft, or maybe just hit until 18?
        // Let's make Aggressive: Hit until 18.
        return value < 18;
    }

    if (trait === 'conservative') {
        // Stand on 16
        return value < 16;
    }

    // Standard: Hit until 17
    return value < 17;
}
