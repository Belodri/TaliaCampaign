//uses monk's token bar
//investigate requestor module to replace monks token bar


//get number of targeted tokens
const numberOfTargets = game.user.targets.size;
if(numberOfTargets !== 1) {
    ui.notifications.warn(`You have to target a single token.`);
    return false;
}

//get targeted token
const targetedToken = game.user.targets.first();

//check for size
//get allowed sizes from config. //['tiny', 'sm', 'med', 'lg', 'huge', 'grg']
const actorSizes = Object.keys(CONFIG.DND5E.actorSizes); 

//get actor & target sizes as numbers corresponding to the index in the actorSizes array for easier comparison
const actorSizeIndex = actorSizes.indexOf(actor.system.traits.size);
const targetSizeIndex = actorSizes.indexOf(targetedToken.document.actor.system.traits.size);

//check for distance
const targetOrigin = targetedToken.center;
const ray = new Ray(targetedToken, token);

//const distance = canvas.grid.measureDistance({ray}, {gridSpace: true});
console.log(distance)

//check for features/items/effects that affect size calculations for grappling
//using the custom flag "flags.world.grapplingSizeBonus" for this; defaults to 0 if none is found
const grapplingSizeBonus = actor.flags.world?.grapplingSizeBonus ? actor.flags.world?.grapplingSizeBonus : 0;

//check if target is at most one size larger than actor (including bonus)
if(targetSizeIndex > actorSizeIndex + grapplingSizeBonus + 1) {
    const maxSizeShort = actorSizes[actorSizeIndex + grapplingSizeBonus + 1];
    const maxSize = CONFIG.DND5E.actorSizes[maxSizeShort].label.toLowerCase();
    ui.notifications.warn(`You can only grapple creatures of ${maxSizeShort} size or smaller.`);
    return false;
}
//check for grapple immunity
if(targetedToken.document.actor.system.traits.ci.value.has("grappled")) {
    ui.notifications.warn(`This creature is immune to being grappled.`);
    return false;
}

//figure out if athletics or acrobatics of targeted token is higher
const tokenSkills = targetedToken.actor.getRollData().skills;
const tokenBetterSkill = tokenSkills.acr.total > tokenSkills.ath.total ? "acr" : "ath";

//request the contested roll
game.MonksTokenBar.requestContestedRoll(
    {
        //actor always rolls with athletics
        token: actor.id, request:{"type":"skill","key":"ath","slug":"skill:ath"}
    },{
        //target always rolls with highest between ath and acr
        token: targetedToken, request:{"type":"skill","key":tokenBetterSkill,"slug":`skill:${tokenBetterSkill}`}
    },{
        //silent: true prevents the option dialog from opening
        silent:true, fastForward:false, rollMode:'roll'
    }
)
return true;
