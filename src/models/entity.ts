import { SmartMap } from "@src/models/data_structures/smartMap";

export enum EntityType {
    StatBlock,
    Player
}

export class EntityOverview {
    Name: string
    Type: string
    Size: string
    DifficultyRating: number

    constructor(Name: string, Type: string, Size: string, DifficultyRating: number) {
        this.Name = Name
        this.Type = Type
        this.Size = Size
        this.DifficultyRating = DifficultyRating
    }
}

export interface Entity {
    id: string
    Name: string
    Suffix: string
    Initiative: number
    MaxHitPoints: number
    TempHitPoints: number
    CurrentHitPoints: number
    ArmorClass: number
    ArmorClassBonus: number
    Speed: {
        Walk?: number
        Fly?: number
        Swim?: number
        Burrow?: number
        Climb?: number
    }
    Conditions: SmartMap<string, number>
    SpellSaveDC: number
    SpellSlots: SmartMap<number, { total: number, used: number }>
    Concentration: boolean
    Reactions: { total: number, used: number }
    Notes: string
    IsHostile: boolean
    EncounterLocked: boolean
    Displayable: any
    EntityType: EntityType
    SavingThrows: {
        Strength: number
        Dexterity: number
        Constitution: number
        Intelligence: number
        Wisdom: number
        Charisma: number
    }
    DifficultyRating: number

    tick(): void
    setSuffix(suffix: string): void
    randomizeInitiative(): void
    setInitiative(value: number): void
    heal(amount: number): void
    damage(amount: number): void
    setMaxHP(amount: number): void
    addTempHP(amount: number): void
    removeTempHP(): void
    kill(): void
    setACBonus(amount: number): void
    addCondition(condition: string): void
    removeCondition(condition: string): void
    addSpellSlot(level: number): void
    removeSpellSlot(level: number): void
    useSpellSlot(level: number): void
    resetSpellSlots(): void
    setConcentration(value: boolean): void
    useReaction(): void
    resetReactions(): void
    resetAll(): void
    setHostile(value: boolean): void
    setLock(value: boolean): void
    generateNewId(): void
    setNotes(notes: string): void
    copy(): Entity
}

export function isEntity(arg: object): arg is Entity {
    return arg.hasOwnProperty("EntityType");
}