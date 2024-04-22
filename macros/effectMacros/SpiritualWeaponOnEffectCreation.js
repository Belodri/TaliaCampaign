//Effect Macro: On Effect Creation

//Remember to change onDeletion part as well if this part is changed!

const correctName = "Command Attack";
const itemUuid = "Compendium.world.accessed-by-macros.Item.rel53YHf4wlQ8Kcv";

//fetch item from compendium
const itemNew = await fromUuid(itemUuid);
console.log(itemNew);
//check if fetched item matches the correctName
if(itemNew.name !== correctName) {
    return ui.notifications.warn(`Couldn't fetch item "${correctName}" from compendium.`);
}

//check if actor has the item already
let existing = actor.items.find(item => item.name === itemNew.name);
if (!existing) {
    //create the item
    await actor.createEmbeddedDocuments("Item",[itemNew]);
    
    //modify item after it's been added to the actor
    const defaultSpellLevel = 6;
    const spellLevel = effect.flags.effectivetray.spellLevel ? effect.flags.effectivetray.spellLevel : defaultSpellLevel;    //this is a dirty fix to get around limitations of the magicItems module
    const damageDice = Math.floor(spellLevel/2);
    const damageFormula = `${damageDice}d8 + @mod`;
    
    const item = actor.items.getName(itemNew.name);
    
    //object containing the values that need to be overwritten via updateEmbeddedDocuments
    let itemSystem = {
        damage: {
            parts: [
                [damageFormula,    //string (roll formula of the damage)
                item.system.damage.parts[0][1]]                         
            ]
        },
        level: spellLevel
    }
    //update the item
    await actor.updateEmbeddedDocuments("Item", [{_id: item._id, "system": itemSystem}]);
    
    ui.notifications.info(`${itemNew.name} has been added to your At-Will spells.`)
}
