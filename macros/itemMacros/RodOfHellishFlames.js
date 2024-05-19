const checkValue = await item.use({}, {createMessage: false, skipItemMacro: true});
if(!checkValue) return false;

const effectToApply = item.effects.getName("Surge of Brimstone");

await actor.createEmbeddedDocuments("ActiveEffect", [effectToApply])

//this part is just to remove the effects tray from the chat card
const replacedMsg = removeCardTray(checkValue);
await ChatMessage.create(replacedMsg);

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
