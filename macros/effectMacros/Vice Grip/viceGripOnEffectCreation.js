//on creation

//get Aviana token as target as this feature only works for her
//this is jank and should be reworked at some point once I figure out how I can see the source actor the AE originated from
const avianaName = "Aviana Winterwing";

//takes the first token named Aviana, doesn't check if there are multiple!
let targetTokenDoc;
if(canvas.scene.tokens.getName(avianaName)) {
    targetTokenDoc = canvas.scene.tokens.getName(avianaName).object;
}
else {
    ui.notifications.warn(`No token named ${avianaName} found on this scene.`);
    return;
}

(async () => {
    await tokenAttacher.attachElementToToken(token, targetTokenDoc, true);
    await tokenAttacher.setElementsLockStatus(token, false, true);
}) ();
