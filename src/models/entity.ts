import { SmartMap } from "@src/models/smartMap"

export interface Entity {
    Name: string
    Initiative: number
    MaxHitPoints: number
    TempHitPoints: number
    CurrentHitPoints: number
    ArmorClass: number
    Speed: {
        Walk?: number
        Fly?: number
        Swim?: number
        Burrow?: number
        Climb?: number
    }
    Conditions: SmartMap<string, number>
    SpellSlots: SmartMap<number, { total: number, used: number }>
    Concentration: boolean
    Reactions: { total: number, used: number }
    Notes: string
    IsHostile: boolean
    EncounterLocked: boolean

    tick(): void
    randomizeInitiative(): void
    setInitiative(value: number): void
    heal(amount: number): void
    damage(amount: number): void
    setMaxHP(amount: number): void
    addTempHP(amount: number): void
    removeTempHP(): void
    kill(): void
    setAC(amount: number): void
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
}