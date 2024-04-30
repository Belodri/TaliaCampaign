//required: effectMacro

const correctName = "Sunbeam (Activation)";
const itemUuid = "Compendium.world.accessed-by-macros.Item.8K0MgJyb3TncsIfT";

//fetch item from compendium
const itemNew = await fromUuid(itemUuid);
console.log(itemNew);

//check if fetched item matches the correctName
if(itemNew.name !== correctName) {
    return ui.notifications.warn(`Couldn't fetch item "${correctName}" from compendium.`);
}

let existing = actor.items.find(item => item.name === itemNew.name);
if (!existing) {
    //create the item
    await actor.createEmbeddedDocuments("Item",[itemNew]);
    ui.notifications.info(`${itemNew.name} has been added to your At-Will spells.`)
}
