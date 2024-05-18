//required modules: rest-recovery, taliafunctions

const doTesting = false;

const rollData = actor.getRollData();
let playerChars;
if(doTesting === true) {
    playerChars = Array.from(game.user.targets.map(t => t.actor));
} else {
    playerChars = game.users
        .filter(u => u.active && !u.isGM)
        .map( p => p.character);
}

new Dialog({
    title: "Chef Feat",
    content: "",
    buttons: {
        shortRest: {
            label: "Short Rest",
            callback: async () => await shortRest()    
        }, 
        longRest: {
            label: "Long Rest",
            callback: async () => await longRest()
        }        
    },
    default: "shortRest",
}).render(true);

   

async function shortRest() {
    if(!checkTool()) {return false}
    if(!checkRations(1)) {return false}
    consumeRations(1);
    
    item.displayCard();
    const formula = "(1d8) * @prof";
    const r = await doRoll(formula);
    await doHealing("healing", r.total);
    
    const content = `<p>During the short rest, ${actor.name} uses 1 ration to cook a quick meal that restored up to <b>${r.total}</b> hit points to all party members.</p>`;

    ChatMessage.create({
        content: content, speaker: {alias: actor.name}        
    });
}

async function longRest() {
    if(!checkTool()) {return false}
    if(!checkRations(10)) {return false}
    consumeRations(10);
    
    item.displayCard();
    const formula = "(2d4) * @prof";
    const r = await doRoll(formula);
    await doHealing("tempHP", r.total);
    
    const content = `<p>After the long rest, ${actor.name} uses 5 rations to prepare a meal that grants <b>${r.total}</b> temporary hit points to all party members.</p>`;

    ChatMessage.create({
        content: content, speaker: {alias: actor.name}        
    });
    
}

function consumeRations(amount) {
    const rations = findRations();    
    const oldQuant = rations.system.quantity;
    const newQuant = oldQuant - amount;    
    rations.update({"system.quantity": newQuant});
    ui.notifications.notify(`${amount} ${rations.name} has been consumed.`);    
}

async function doHealing(type, amount) {
    
    let updatedActors;
    if(type === "healing") {
        updatedActors = await taliafunctions.applyDamage(playerChars,[{value: amount, type: type}]);
    } else if (type === "tempHP") {
        updatedActors = await taliafunctions.applyTempHP(playerChars, amount);
    }
    console.log("Healed actors: ", updatedActors);
}

function findRations() {
    const rations = actor.items.find( i => i.type === "consumable" &&
        i.flags["rest-recovery"].data.consumable.type === "food" && 
        i.flags["rest-recovery"].data.consumable.enabled === true &&
        i.flags["rest-recovery"].data.consumable.dayWorth === true);
    if(!rations) {
        return false;
    } else {
        return rations;
    }
}

function checkRations(amountReq) {
    if(findRations().system.quantity >= amountReq)
    {
        return true;
    } else {
        ui.notifications.info(`You don't have food with you. You need at least ${amountReq}.`);
        return false;
    }
}

function checkTool() {
    if(actor.items.find( i => i.type === "tool" && i.system.type.baseItem === "cook")) {
        return true;
    } else {
        ui.notifications.info("You don't have cooking supplies with you.");
        return false;
    }
}

async function doRoll(formula) {
    const roll = await new Roll(formula, rollData).evaluate();
    let msg = await roll.toMessage({speaker: {alias: actor.name}, flavor: "<b>Chef Feat</b>",options: {type: "healing"}});
    if(await game.dice3d.waitFor3DAnimationByMessageID(msg.id)) {
        return roll;
    }
}
