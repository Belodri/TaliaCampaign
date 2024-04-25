//makes sure that the Sun Statue item is equipped and attuned.

const consumeTargetItemId = item.system.consume.target;
if (consumeTargetItemId === null) {
    ui.notifications.warn(`No target item for consuming uses set.`);
    return false;
}

const consumeTargetItem = actor.items.get(consumeTargetItemId);
if (consumeTargetItem === undefined) {
    ui.notifications.warn(`Target item for consuming uses couldn't be found.`);
    return false;
}

//attunement: 2 is attuned
if(consumeTargetItem.system.attunement !== 2 || consumeTargetItem.system.equipped !== true) {
    //ui notification
    ui.notifications.warn(`${consumeTargetItem.name} has to be equipped and attuned.`)
    //aborts the usage of the item
    return false;
} else {
    //uses the item normally
    return true;
}
