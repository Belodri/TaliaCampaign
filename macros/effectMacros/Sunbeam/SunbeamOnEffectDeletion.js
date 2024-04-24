const correctName = "Sunbeam (Activation)";

let existing = actor.items.find(item => item.name === correctName);
if (existing) {
    //remove the item
    ui.notifications.info(`${existing.name} has been removed from your At-Will spells.`);
    existing.delete();
}
