//sets a token's hp to 0 & marks it as dead & defeated with the same overlay AE used in combat.

canvas.tokens.controlled.map(async token => {
    if(token.document.actor.type === "npc") {
        const effect = CONFIG.statusEffects.find(e => e.id === CONFIG.specialStatusEffects.DEFEATED);
        await token.actor.update({"system.attributes.hp.value": 0});
        await token.document.toggleActiveEffect(effect, {overlay: true});
        if(token.combatant) {
            await token.combatant.update({defeated: true});
        }
    }
})
