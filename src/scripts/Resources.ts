import {PrimaryAttributes} from "./Stats";


export interface Resource extends PrimaryAttributes {
    price: number;
    weight: number;
}

export class Thread implements Resource {
    price = 5;
    weight = 200;
    intellect = 33;
    agility = 20;
    strength = 3;
}

export class Iron implements Resource {
    price = 20;
    weight = 700;
    intellect = -2;
    agility = 13;
    strength = 40;
}

export class Steel implements Resource {
    price = 100;
    weight = 1000;
    intellect = -10;
    agility = 5;
    strength = 89;
}

export class Wood implements Resource {
    weight = 300;
    price = 20;
    intellect = 10;
    agility = 13;
    strength = 23;
}

export class Silk implements Resource {
    weight = 200;
    price = 132;
    intellect = 100;
    agility = 40;
    strength = 12;
}

