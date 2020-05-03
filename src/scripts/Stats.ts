export interface PrimaryAttributes {
    intellect: number;
    strength: number;
    agility: number;
}


export interface PrimaryAttributesCount {
    [attribute: string]: number;
}

export interface SecondaryAttributes {
    // Physical
    attackSpeed: number;
    attackPower: number;
    
    // Basic
    healthPoints: number;
    healthRegeneration: number;
    manaPoints: number;
    manaRegen: number;
    speed: number;

    // Magical
    spellPower: number;
    castingSpeed: number;

    // Defence
    armor: number;
    magicResistance: number;
}