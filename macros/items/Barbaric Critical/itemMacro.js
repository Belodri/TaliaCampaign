//requires a class 'barbarian' to have a numeric scale value named 'barbaric-critical'.
//requires modules: babonus

const rageItem = actor.itemTypes.feat.find( i => i.name === "Rage");
if(!rageItem) {
    ui.notifications.notify("No item called Rage could be found on character.");
    return false;
}

const scaleValue = actor.getRollData().scale.barbarian["barbaric-critical"]?.value;


if(!scaleValue) return;

new Dialog({
    title: item.name,
    content: "",
    buttons: {
        recover: {
            label: `Recover ${scaleValue} Rage`,
            callback: () => doRecover()
        },
        chat: {
            label: "Chat Only",
            callback: async () => displayCardNoTray()
        }
    },
    default: "recover",
}).render(true);


async function doRecover() {
    
    displayCardNoTray();
    
    const maxUses = rageItem.system.uses.max;
    const value = rageItem.system.uses.value;
    const newValue = Math.min(maxUses, value + scaleValue);
    await rageItem.update({"system.uses.value": newValue});
    
    const diff = newValue - value;
    ui.notifications.info(`${diff} Rage restored. You now have ${newValue}:${maxUses} Rage.`);
}

async function displayCardNoTray() {
    //this part is just to remove the effects tray from the chat card
    const checkValue = await item.use({},{createMessage: false, skipItemMacro: true});
    const replacedMsg = removeCardTray(checkValue);
    await ChatMessage.create(replacedMsg);
}

function removeCardTray(msg, key = "") {
    let searchKey;
    if(key === "") {
        searchKey = `<div class="card-tray effects-tray collapsible`;
    } else { 
        searchKey = key;
    }
    const msgContent = msg.content;
    const index = msgContent.indexOf(searchKey);
    
    let newContent;
    if(index !== -1) {
        msg.content = msgContent.substring(0, index);
    } else {
        console.error("substring not found!");
    }
    return msg;
}
