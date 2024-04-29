//on deletion

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

    const attachedTokens = await tokenAttacher.getAllAttachedElementsOfToken(targetTokenDoc, false);
    if(attachedTokens.Token.includes(token.id)) {
        await tokenAttacher.detachElementFromToken(token, targetTokenDoc, true);
    }
}) ();
