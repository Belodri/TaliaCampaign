const packKey = "world.talia-items";
const names = ["Ale", "Olive Oil", "Potion of Healing", "Potion of Climbing"];

const buttons = names.reduce((buttons, id) => {
	buttons[id] = {label: id, callback: callback};
	return buttons;
}, {});

const searchKey = await Dialog.wait({
   title: "Slumbering Dragon Vessel",
   content: "Choose which liquid should fill the vessel.",
   buttons: buttons,
   close: () => null,
});

async function callback([html], event) {
    const action = event.currentTarget.dataset.button;
    return action;
}


if(!searchKey || !names.includes(searchKey) || searchKey === null) {
	return false;
}

const [itemA] = await game.packs.get(packKey).getDocuments({name: searchKey});
const itemData = game.items.fromCompendium(itemA);
const duplicate = actor.items.find(i => i.name === searchKey);
if(!duplicate) {
    //if actor doesn't have the item already    
    await Item.create(itemData, {parent: actor});
} else {
    //if the actor has the item already
    actor.updateEmbeddedDocuments("Item", [{_id: duplicate.id, "system.quantity": duplicate.system.quantity + 1}]);
}   
ui.notifications.notify(`Added ${itemData.name} to your inventory.`)
actor.updateEmbeddedDocuments("Item", [{_id: item.id, "system.uses.value": item.system.uses.value - 1}]);
return true;
