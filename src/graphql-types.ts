
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCoffeeInput {
    name: string;
    brand: string;
    flavors: string[];
}

export class UpdateCoffeeInput {
    name?: Nullable<string>;
    brand?: Nullable<string>;
    flavors?: Nullable<string[]>;
}

export class CreateTeaInput {
    name: string;
    variety: string;
}

export class UpdateTeaInput {
    name?: Nullable<string>;
    variety?: Nullable<string>;
}

export interface Drink {
    name: string;
}

export class Coffee implements Drink {
    id: number;
    name: string;
    brand: string;
    createdAt?: Nullable<Date>;
    flavors?: Nullable<Flavor[]>;
}

export class Flavor {
    id: number;
    name: string;
}

export abstract class IQuery {
    coffees: Coffee[];
    coffee?: Coffee;
    drinks: DrinksResult[];
    teas: Nullable<Tea>[];
    tea?: Nullable<Tea>;
}

export abstract class IMutation {
    createCoffee?: Coffee;
    updateCoffee?: Coffee;
    removeCoffee?: Coffee;
    createTea?: Tea;
    updateTea?: Tea;
    removeTea?: Tea;
}

export class Tea implements Drink {
    id: number;
    name: string;
    variety: string;
    createdAt?: Nullable<Date>;
}

export type DrinksResult = Coffee | Tea;
type Nullable<T> = T | null;
