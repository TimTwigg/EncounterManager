import { createFileRoute } from "@tanstack/react-router"
import { EntityDisplay } from "@src/components/entityDisplay"
import { StatBlockEntity } from "@src/models/statBlockEntity"

import { arasta } from "@src/temp/arasta"
import { aurelia } from "@src/temp/aurelia"
import { winter_ghoul } from "@src/temp/winter-ghoul"
import { conditions } from "@src/temp/conditions"

export const Route = createFileRoute("/library")({
    component: Library,
})

function Library() {

    return (
        <>
            <p>
                This is the library.
            </p>

            <EntityDisplay entity={new StatBlockEntity(arasta, 5)} deleteCallback={() => {console.log(`Delete ${arasta.Name}`)}} expanded = {true} userOptions={{conditions:conditions}}/>
            <EntityDisplay entity={new StatBlockEntity(aurelia, 5)} deleteCallback={() => {}}/>
            <EntityDisplay entity={new StatBlockEntity(winter_ghoul, 5)} deleteCallback={() => {}}/>
        </>
    )
}
