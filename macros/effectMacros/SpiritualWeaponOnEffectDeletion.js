//Effect Macro: On Effect Deletion

//Remember to change onCreation part as well if this part is changed!

const correctName = "Command Attack";

//check if actor has the item
let existing = actor.items.find(item => item.name === correctName);

if (existing) {
    //remove the item
    ui.notifications.info(`${existing.name} has been removed from your At-Will spells.`);
    existing.delete();
}
