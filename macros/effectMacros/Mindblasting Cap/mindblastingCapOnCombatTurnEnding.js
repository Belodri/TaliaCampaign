//effect macro: on combat turn ending
const dc = 15;
const flavor = `Intelligence saving throw to end the effect of: <b>${effect.name}</b>.`
const save = await token.actor.rollAbilitySave("int",{targetValue: dc, fastForward: false, messageData: {flavor: flavor}});
if(save.total >= dc) {
    effect.delete();
}
