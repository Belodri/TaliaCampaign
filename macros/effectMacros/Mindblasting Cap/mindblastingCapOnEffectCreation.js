//effect macro: on effect creation
//requires modules: dfreds convenient effects, effectMacro

const convenientEffectsToAddNames = ['Stunned', 'Incapacitated'];

const effectData = [];

const uuid = token.actor.uuid;
const duration = Object.assign(effect.duration);
for(const effectName of convenientEffectsToAddNames) {
    const convEffect = foundry.utils.duplicate(game.dfreds.effectInterface.findEffectByName(effectName));
    effectData.push(
        {
        name: convEffect.name,
        description: convEffect.description,
        icon: convEffect.icon,
        duration: {seconds: duration.seconds},
        changes: convEffect.changes        
        }
    );
}
const createdEffects = await token.actor.createEmbeddedDocuments("ActiveEffect", effectData);

//add created effects as dependents so they get removed alongside with the source effect
for(const createdEffect of createdEffects) {
    await effect.addDependent(createdEffect);
}
