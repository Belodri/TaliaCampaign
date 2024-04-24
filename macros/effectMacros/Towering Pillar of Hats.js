//required modules: effectMacro
//onEffectToggle (on or off), onSkillChecks, onCombatStarting

const hatsArray = actor.items.filter(e => 
    e.system.equipped === true 
    && e.system.type.value === 'hat');
const numberOfHatsStr = hatsArray.length.toString();
const changes = duplicate(effect.changes);
changes[0].value = numberOfHatsStr;
console.log('Worn hats: ',changes);
await effect.update({changes});
