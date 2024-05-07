//requires: dfredsConvenientEffects 

if(game.user.targets.size === 0) {
    ui.notifications.warn("You need to target at least one token.");
    return;
}

const filteredArray = Array.from(game.user.targets).map(obj => obj.actor.uuid);
filteredArray.forEach(uuid => {
    game.dfreds.effectInterface.addEffect({effectName: 'Slashed', uuid});
});
