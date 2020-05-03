import {ForgeFactory} from "./Forge";
import {Iron, Resource, Silk, Steel, Thread, Wood} from "./Resources";
import {ArmorItem, ArmorType} from "./Armor";
import {sortBy} from "lodash";

export class BlacksmithShop extends ForgeFactory {

    private get priceForWork(): number {
        return this.priceList[this.armorType] * this.gradesMultiplier[this.grade];
    };

    private armorList: ArmorItem[] = [];
    private priceList: {[type: string]: number} = {
        helmet: 200,
        boots: 100,
        chest: 500,
    };
    private armorType: ArmorType = "helmet";
    private readonly resourcesList: {[name: string]: Resource} = {
        thread: new Thread(),
        iron: new Iron(),
        steel: new Steel(),
        wood: new Wood(),
        silk: new Silk(),
    };

    public addResource(name: string, count: number): void {
        this.resourcesForCraft.push({resource: this.resourcesList[name.toLowerCase()], count});
    }

    public setArmorType(type: string): void {
        this.armorType = type as ArmorType;
    }

    public setGrade(grade: string): void {
        this.grade = grade.toLowerCase();
    }

    public getResourcesCount(): number {
        return this.resourcesForCraft.length;
    }

    public clearForge():void {
        this.resourcesForCraft = [];
    }

    public sortArmorList(field: string): ArmorItem[] {
        if (this.armorList?.length > 1) {
            return;
        }
        return sortBy(this.armorList, [field.toLowerCase()]);
    }

    public clearArmorList(): void {
        this.armorList = [];
    }

    public craftArmor(): ArmorItem {
        const rawArmor = super.craftArmor(this.resourcesForCraft, this.armorType);
        rawArmor.raisePrice(this.priceForWork);
        this.armorList.push(rawArmor);
        return rawArmor;
    }
}