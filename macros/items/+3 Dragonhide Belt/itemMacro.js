const kiItem = actor.items.getName('Ki');
const rollData = actor.getRollData();
const martialArtsDie = rollData.scale.monk.martialArts.die;

new Dialog({
    title: item.name,
    content: "",
    buttons: {
        restoreKi: {
            label: `Restore ${martialArtsDie} Ki.`,
            callback: () => doRestoreKi()
        },
        chatMessageOnly: {
            label: `Chat Only`,
            callback: () => {item.displayCard()}
        }
    },
    default: "restoreKi",
}).render(true);


async function doRestoreKi() {
    if((item.system.attunement === "required" && !item.system.attuned)|| item.system.equipped !== true) {
        ui.notifications.warn("You need to have this item attuned and equipped to use it's effects.");
        return;
    }
    
    await item.use({},{skipItemMacro: true});
    const r = await doRoll();
    
    const maxUses = kiItem.system.uses.max;
    const value = kiItem.system.uses.value;
    const newValue = Math.min(maxUses, value + r.total);
    await kiItem.update({"system.uses.value": newValue});
    
    const diff = newValue - value;
    ui.notifications.info(`${diff} Ki restored. You now have ${newValue}:${maxUses} Ki points.`);
}

async function doRoll() {
    const msgFlavor = ``;
    const formula = `@scale.monk.martialArts.die`;
    const roll = await new Roll(formula, rollData).evaluate();
    let msg = await roll.toMessage({speaker: {alias: actor.name}, flavor: msgFlavor});
    if(await game.dice3d.waitFor3DAnimationByMessageID(msg.id)) {
        return roll;
    }
}
