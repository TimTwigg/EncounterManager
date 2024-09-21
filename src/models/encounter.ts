import { Entity } from "@src/models/entity"

export class Encounter {
    Name: string
    Description: string
    Entities: Entity[] = []

    constructor(name: string, description: string) {
        this.Name = name
        this.Description = description
    }

    addEntity(entity: Entity): void {
        this.Entities.push(entity);
        this.Entities.sort((a, b) => b.Initiative - a.Initiative);
    }

    tick(): void {
        for (let entity of this.Entities) {
            entity.tick()
        }
    }

    clear(): void {
        this.Entities.filter((e) => (e.EncounterLocked));
    }
}