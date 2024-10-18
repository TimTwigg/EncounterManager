import { Entity, EntityType } from "@src/models/entity"
import { SmartMap } from "@src/models/smartMap";
import { StatBlock } from "@src/models/statBlock"
import { d20, hashCode, modifierOf } from "@src/controllers/utils";

export class StatBlockEntity implements Entity {
    id;
    Name;
    Suffix = "";
    Initiative;
    CurrentHitPoints;
    MaxHitPoints;
    TempHitPoints = 0;
    ArmorClass;
    Speed;
    Conditions = new SmartMap<string, number>();
    SpellSaveDC: number;
    SpellSlots = new SmartMap<number, { total: number, used: number }>();
    Concentration = false;
    Reactions;
    Notes = "";
    IsHostile;
    EncounterLocked = false;
    Displayable;
    StatBlock: StatBlock;
    EntityType = EntityType.StatBlock;
    SavingThrows;
    DifficultyRating;

    constructor(statBlock: StatBlock, initiative: number = 0, IsHostile: boolean = true) {
        this.id = (hashCode(statBlock.Name) * Math.random()).toString(16);
        this.Name = statBlock.Name;
        this.StatBlock = statBlock;
        this.Initiative = initiative;
        this.Reactions = { total: statBlock.Stats.ReactionCount, used: 0 };
        this.IsHostile = IsHostile;
        this.CurrentHitPoints = statBlock.Stats.HitPoints.Average;
        this.MaxHitPoints = statBlock.Stats.HitPoints.Average;
        this.ArmorClass = statBlock.Stats.ArmorClass;
        this.Speed = statBlock.Stats.Speed;
        this.Displayable = statBlock;
        this.SavingThrows = {
            Strength: modifierOf(statBlock.Stats.Strength),
            Dexterity: modifierOf(statBlock.Stats.Dexterity),
            Constitution: modifierOf(statBlock.Stats.Constitution),
            Intelligence: modifierOf(statBlock.Stats.Intelligence),
            Wisdom: modifierOf(statBlock.Stats.Wisdom),
            Charisma: modifierOf(statBlock.Stats.Charisma)
        }
        this.SpellSaveDC = statBlock.Details.SpellSaveDC||0;
        this.DifficultyRating = statBlock.ChallengeRating;
    }

    tick(): void {
        for (let cond of this.Conditions.keys()) {
            this.Conditions.set(cond, this.Conditions.dGet(cond, 0) + 1);
        }
    }

    setSuffix(suffix: string): void {
        this.Suffix = suffix;
    }

    randomizeInitiative(): void {
        this.Initiative = d20() + modifierOf(this.StatBlock.Stats.Dexterity);
    }

    setInitiative(value: number): void {
        this.Initiative = value;
    }

    heal(amount: number): void {
        this.CurrentHitPoints = Math.min(this.CurrentHitPoints + amount, this.MaxHitPoints);
    }

    damage(amount: number): void {
        let dmg = Math.max(amount - this.TempHitPoints, 0);
        this.TempHitPoints = Math.max(this.TempHitPoints - amount, 0);
        this.CurrentHitPoints = Math.max(this.CurrentHitPoints - dmg, 0);
    }

    setMaxHP(amount: number): void {
        let missing = amount>this.MaxHitPoints ? this.MaxHitPoints-this.CurrentHitPoints : 0;
        this.MaxHitPoints = Math.max(amount, 0);
        this.CurrentHitPoints = this.MaxHitPoints - missing;
    }

    addTempHP(amount: number): void {
        this.TempHitPoints = Math.max(amount, 0);
    }

    removeTempHP(): void {
        this.TempHitPoints = 0;
    }

    kill(): void {
        this.CurrentHitPoints = 0;
        this.TempHitPoints = 0;
    }

    setAC(amount: number): void {
        this.ArmorClass = Math.max(amount, 1);
    }

    addCondition(condition: string): void {
        if (!this.Conditions.has(condition)) {
            this.Conditions.set(condition, 1);
        }
    }

    removeCondition(condition: string): void {
        this.Conditions.delete(condition);
    }

    addSpellSlot(level: number): void {
        let slot = this.SpellSlots.dGet(level, { total: 0, used: 0 });
        slot.total++;
        this.SpellSlots.set(level, slot);
    }

    removeSpellSlot(level: number): void {
        let slot = this.SpellSlots.dGet(level, { total: 0, used: 0 });
        if (slot.total <= 0) throw new Error("No Spell Slots of that level");
        slot.total--;
        if (slot.used > slot.total) slot.used = slot.total;
        this.SpellSlots.set(level, slot);
    }

    useSpellSlot(level: number): void {
        let slot = this.SpellSlots.dGet(level, { total: 0, used: 0 });
        if (slot.used >= slot.total) throw new Error("No More Spell Slots of that level");
        slot.used++;
        this.SpellSlots.set(level, slot);
    }

    resetSpellSlots(): void {
        this.SpellSlots.forEach((slot, level) => {
            this.SpellSlots.set(level, { total: slot.total, used: 0 });
        });
    }

    setConcentration(value: boolean): void {
        this.Concentration = value;
    }

    useReaction(): void {
        if (this.Reactions.used >= this.Reactions.total) throw new Error("No More Reactions");
        this.Reactions.used++;
    }

    resetReactions(): void {
        this.Reactions.used = 0;
    }

    resetAll(): void {
        this.resetSpellSlots();
        this.resetReactions();
        this.Conditions.clear();
        this.Concentration = false;
    }

    setHostile(value: boolean): void {
        this.IsHostile = value;
    }

    setLock(value: boolean): void {
        this.EncounterLocked = value;
    }
}