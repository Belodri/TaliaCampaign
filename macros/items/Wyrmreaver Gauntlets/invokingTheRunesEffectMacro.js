// this macro is: onCreation

/*
    onEffectCreation:     range add
    onCombatTurnStarting: range add
    onCombatTurnEnding:   range remove
    onEffectDeletion:     range remove
    dnd5e.rollDamage:     prone saves
*/

//createOtherFunctions if needed
if(!effect.hasMacro("never")) {
    await effect.updateMacro("never", async() => {
        
        
        if(!this.mutateArgs) return;    //this.mutateArgs = "add" or "remove"
        const mutationName = "InvokeTheRunes.range";
        
        function hasMutation(mutationName) {
            const stack = warpgate.mutationStack(token.document);
            return !!stack.getName(mutationName)    
        }
        
        const toShorthand = (shorthand, mItem) => {
            shorthand[mItem.id] = {
                'system.range.value': 30,
            };   
            return shorthand;
        }
        
        if(this.mutateArgs === "remove") {
            if(!hasMutation(mutationName)) return;
            console.log("debugRemove");
            await warpgate.revert(token.document, mutationName);
        } else if (this.mutateArgs === "add") {
            if(hasMutation(mutationName)) return;
            console.log("debugAdd");
            //get all natural (unarmed) weapons
            const itemsToMutate = token.actor.itemTypes.weapon.filter( i => i.system.type.value === "natural");
            
            const entries = itemsToMutate.reduce(toShorthand, {});
            const options = {name: mutationName, comparisonKeys: {Item: 'id'}};
            await warpgate.mutate(token.document, {embedded: {Item: entries}}, {}, options);
        }
    });
}
if(!effect.hasMacro("onTurnStart")) {
    await effect.updateMacro("onTurnStart", async() => {
        effect.callMacro("never", {...this, mutateArgs: "add"});
    });
}        
if(!effect.hasMacro("onTurnEnd")) {
    await effect.updateMacro("onTurnEnd", async() => {
        effect.callMacro("never", {...this, mutateArgs: "remove"});
    });
}
if(!effect.hasMacro("onDelete")) {
    await effect.updateMacro("onDelete", async() => {
        effect.callMacro("never", {...this, mutateArgs: "remove"});    
    });
}        
if(!effect.hasMacro("dnd5e.rollDamage")) {    
    await effect.updateMacro("dnd5e.rollDamage", async() => {
        //check if combat is active
        if(!game.combat?.active) return;
        
        //check if it's not the actor's turn
        if(game.combat?.combatant?.name === token.actor.name) return;
        
        const targets = game.user.targets;
        if(targets.size > 1) return;
        
        //check if the item is a natural weapon
        if(this.item.system.type?.value !== "natural") return; 
        console.log("debug1");
        const rollData = token.actor.getRollData();
        const dc = 8 + rollData.abilities.str.mod + rollData.attributes.prof;
        
        const flavor = `
<div style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding-right: 15px; padding-top: 10px; padding-bottom: 5px; font-size: 1.2em; font-weight: bold; ">
    <div style="text-align: left; flex: 2;">
        Strength Saving Throw
    </div>
    <div style="text-align: right; flex: 1;">
        DC ${dc}
    </div>
</div>
<div style="justify-content: space-between; width: 100%; text-align: center; padding-right: 10px; padding-bottom: 2px; font-size: 1.1em;">
    ${effect.name}
</div>
`;

        const save = await targets.first().actor.rollAbilitySave("str", {targetValue: dc, messageData: {flavor: flavor}});                           
        if(save.total > dc || !save) return
        const uuid = targets.first().actor.uuid;
        game.dfreds.effectInterface.addEffect({ effectName: 'Prone', uuid});       
    });
}

//*********************************
//    setup done
//*********************************

effect.callMacro("never", {...this, mutateArgs: "add"});
