import {Resource} from "./Resources";
import * as _ from "lodash";
import {ArmorDefaultProps, ArmorItem, ArmorType, Boots, Chest, Helmet} from "./Armor";

export interface Grades {
    [grade: string]: number;
}

export interface ForgeContainer {
    resource: Resource;
    count: number;
}

export class ForgeFactory {

    protected resourcesForCraft: ForgeContainer[] = [];
    protected readonly gradesMultiplier: Grades = {
        a: 1.6,
        b: 1.4,
        c: 1,
    }
    protected grade: string = "c";


    protected craftArmor(craftSource: ForgeContainer[], type: ArmorType): ArmorItem {
        const gradesMultiplier = this.gradesMultiplier[this.grade];
        const item =
            _.reduce(craftSource, (result: ArmorDefaultProps, current: ForgeContainer) => {
            result.intellect += current.resource.intellect * current.count * gradesMultiplier;
            result.strength += current.resource.strength * current.count * gradesMultiplier;
            result.agility += current.resource.agility * current.count * gradesMultiplier;
            result.price += current.resource.price * current.count;
            result.weight += current.resource.weight * current.count;
            return result;
        }, {intellect: 0, strength: 0, agility: 0, price: 0, weight: 0, grade: this.grade})
        this.resourcesForCraft = [];
        switch (type) {
            case "helmet": {
                return new Helmet(item);
            }
            case "boots": {
                return new Boots(item);
            }
            case "chest": {
                return new Chest(item);
            }
        }
    }
}