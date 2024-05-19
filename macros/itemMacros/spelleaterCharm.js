//absorb damage -> give damage reduction
//explode -> chat card only

//check rage amount -> if 0 then don't show dialog and just doExplode.
const explodeFile = "jb2a.explosion.03.blueyellow";
const shieldFile = "jb2a.shield.01.intro.blue";


const rageItem = actor.itemTypes.feat.find( i => i.name === "Rage");
if(!rageItem) {
    ui.notifications.notify("No item called Rage could be found on character.");
    return false;
}
if(!item.system.consume.target || !item.system.consume.amount || item.system.consume.type !== "charges") {
    ui.notifications.warn("Item consumption configuration is not set up properly!");
    return false;
}
if(rageItem.system.uses.value === 0) {
    doExplode();
    return;
}

new Dialog({
    title: item.name,
    content: "",
    buttons: {
        explode: {
            label: "Explode!",
            callback: () => doExplode()
        },
        shield: {
            label: "Shield",
            callback: () => doShield()
        }
    },
    default: "explode",
}).render(true);

async function doExplode() {
    await item.use({consumeResource: false}, {configureDialog: false, skipItemMacro: true});
    const content = `<p>${actor.name} explodes violently, damaging everyone within 5ft.`;
    ChatMessage.create({
        content: content, speaker: {alias: actor.name}
    });
    await animExplode();
}

async function doShield() {
    await item.use({}, {skipItemMacro: true});  
    const content = `<p>${actor.name} shields herself from the spell, negating any damage she'd otherwise take from it.`;
    ChatMessage.create({
        content: content, speaker: {alias: actor.name}
    });
    await animShield();
}

async function animExplode() {
    new Sequence()
        .effect()
        .atLocation(token)
        .file(explodeFile)
        .opacity(1)
        .zIndex(1)
        .size(5, {gridUnits: true})
        .fadeIn(250, {ease: "linear"})
        .fadeOut(500, {ease: "linear", delay: 1500})
        .filter("ColorMatrix", {
            contrast: 0.28, 
            saturate: 0.33})
        .randomRotation()
        .tint(8585473)
        .waitUntilFinished()
    .play()
        
}

async function animShield() {
    new Sequence()
        .effect()
        .atLocation(token)
        .file(shieldFile)
        .opacity(1)
        .zIndex(1)
        .size(5, {gridUnits: true})
        .fadeIn(250, {ease: "linear"})
        .fadeOut(500, {ease: "linear", delay: 1500})
        .filter("ColorMatrix", {
            contrast: 0.28, 
            saturate: 0.33})
        .randomRotation()
        .tint(8585473)
        .waitUntilFinished()
    .play()
}
