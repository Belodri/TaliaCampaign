//required modules: effectMacro
//onEffectToggle (on or off), onSkillChecks, onCombatStarting

const hatsArray = actor.items.filter(e => 
    e.system.equipped === true 
    && e.system.type.value === 'hat');
const numberOfHatsStr = hatsArray.length.toString();

//warnings if effect does not match expected values
if(effect.changes[0].key !== "system.abilities.cha.value" || effect.changes[0].mode !== 2) {
    ui.notifications.warning("Towering Pillar of Hats effect macro is detecting unexpected effect values and can't update the effect. Check console for details.");
    console.error("Towering Pillar of Hats effect macro unexpected values in: ", effect);
    return;
}

const changesToEffect = duplicate(effect);
changesToEffect.changes[0].value = numberOfHatsStr;
//change the description to reflect the current bonus
changesToEffect.description = `<p>The majestic tower of hats upon your head currently grants you a +${Number(numberOfHatsStr)} bonus to your Charisma score.</p>`;

console.log('Changes from worn hats: ',changesToEffect);
//apply changes to the actual effect
await effect.update(changesToEffect);
