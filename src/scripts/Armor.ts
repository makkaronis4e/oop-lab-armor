import {PrimaryAttributes, SecondaryAttributes} from "./Stats";
import {Resource} from "./Resources";

export interface ArmorItem extends PrimaryAttributes, SecondaryAttributes {
    raisePrice(x: number): void;
}

export interface ArmorDefaultProps extends Resource {
    grade: string;
}

export class ArmorItem implements ArmorItem {
    private price: number;
    private weight: number;
    private grade: string;

    constructor(item: ArmorDefaultProps) {
        this.price = item.price;
        this.weight = item.weight;
        this.grade = item.grade;
        this.intellect = item.intellect;
        this.strength = item.strength;
        this.agility = item.agility;
        this.countSecondaryStats();
    }

    public raisePrice(x: number): void {
        this.price += x;
    }

    private countSecondaryStats(): void {
        this.attackSpeed =  Math.floor(this.agility * 2.5 * 10) / 10;
        this.attackPower =  Math.floor(this.agility * 0.6 + this.strength * 3 * 10) / 10;
        this.healthPoints =  Math.floor(this.strength * 6 * 10) / 10;
        this.healthRegeneration =  Math.floor(this.strength * 0.04 * 10) / 10;
        this.manaPoints =  Math.floor(this.intellect * 6 * 10) / 10;
        this.manaRegen =  Math.floor(this.intellect * 0.04 * 10) / 10;
        this.speed =  Math.floor(this.agility * 10) / 10;
        this.spellPower =  Math.floor(this.intellect * 3 * 10) / 10;
        this.castingSpeed =  Math.floor(this.intellect * 0.2 * 10) / 10;
        this.armor =  Math.floor(this.agility * 4 * 10) / 10;
        this.magicResistance =  Math.floor(this.intellect * 4 * 10) / 10;
    }
}

export type ArmorType = "helmet" | "chest" | "boots";

export class Helmet extends ArmorItem {
    public readonly type = "Helmet";
}

export class Chest extends ArmorItem {
    public readonly type = "Chest";
}

export class Boots extends ArmorItem {
    public readonly type = "Boots";
}