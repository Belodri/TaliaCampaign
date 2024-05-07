Hooks.once("init", () => {
  //confirm world script is running
  console.log("World script is running!");

  // Adding new equipment types
  CONFIG.DND5E.equipmentTypes.hat = CONFIG.DND5E.miscEquipmentTypes.hat = "Hat";

  // Adding new consumable types
  CONFIG.DND5E.consumableTypes.spellGem = {label: "Spell Gem"};

  //Feature Types

  //Feature Subtypes:

  //adding new subtypes to: class
  CONFIG.DND5E.featureTypes.class.subtypes.arcanePower = "Arcane Power";
  CONFIG.DND5E.featureTypes.class.subtypes.ragePower = "Rage Power"; 

  //adding new subtypes to: supernaturalGift
  CONFIG.DND5E.featureTypes.supernaturalGift.subtypes.curse = "Curse";



  /// Adds in options to display in the Activation Cost dropdown
  CONFIG.DND5E.abilityActivationTypes.critHit = "Critical Hit";
  CONFIG.DND5E.abilityActivationTypes.attack = "On Attack";
  CONFIG.DND5E.abilityActivationTypes.replaceAttack = "Replaces Attack";
  CONFIG.DND5E.abilityActivationTypes.meleeHit = "On Melee Hit";
  CONFIG.DND5E.abilityActivationTypes.rangedHit = "On Ranged Hit";
  CONFIG.DND5E.abilityActivationTypes.weaponHit = "On Weapon Hit";
  CONFIG.DND5E.abilityActivationTypes.spellAttackHit = "On Spell Attack Hit";

  // Adding new loot types
  CONFIG.DND5E.lootTypes.ingredient = {label: "Ingredient" };
  CONFIG.DND5E.lootTypes.ingredient.subtypes = { 
    herb: "Herb",
    bodyPart: "Body Part"
  };

  //add "Wild" item property
  CONFIG.DND5E.itemProperties.wild = {
    abbreviation: "w",
    label: "Wild"
  };
  //add item property "wild" to all item types
  CONFIG.DND5E.validProperties.consumable.add("wild");
  CONFIG.DND5E.validProperties.container.add("wild");
  CONFIG.DND5E.validProperties.equipment.add("wild");
  CONFIG.DND5E.validProperties.feat.add("wild");
  CONFIG.DND5E.validProperties.loot.add("wild");
  CONFIG.DND5E.validProperties.weapon.add("wild");
  CONFIG.DND5E.validProperties.spell.add("wild");
  CONFIG.DND5E.validProperties.tool.add("wild");


});
/*
Every time an item with the wild property is used, there's a 5% chance of triggering a wild magic surge (one roll on the WMS table).

Todo: 
- add checks for spell levels, maybe give scaling chance of surges happening with spell levels 6 and up
- or make different surge tables for higher spell levels?
*/

Hooks.on("dnd5e.useItem", (item, config, options) => {
  console.log(item, config, options);

  let chance = 0.05;  //base chance of WMS
  let chanceMult = 1; //multiplier for the chance

  if(doesTrigger() === true) {
    if(Math.random() <= chance * chanceMult) {
      game.tables.getName('WMS').draw();
    } else {console.log("No Surge");}
  } else {console.log("No Roll");}

  function doesTrigger() {
    //never trigger
    const neverConsumableTypes = ["spellGem", "potion", "poison", "food"]; //item.system.type.value

    if(item.type === "consumable" && neverConsumableTypes.includes(item.system.type.value)) {
      console.log("These consumables can't trigger WMS.", neverConsumableTypes);
      return false;
    }

    //always trigger
    const alwaysItemTypes = ["spell", "scroll"];  //item.type
    const alwaysItemLabels = ["Wild", "Magical"];  //item.labels.properties.label

    if(item.labels.properties.some(property => alwaysItemLabels.includes(property.label))
      || alwaysItemTypes.includes(item.type)) {
        return true;
    }

    //check npc
    if(item.actor.type === "npc") {
      const creatureType = item.actor.system.details.type.value;

      //never trigger
      const neverNpcType = ["beast"];
      if(neverNpcType.includes(creatureType)) {return false;}

      //always trigger
      const alwaysNpcType = ["abberation", "celestial", "construct", "dragon", "elemental", "fey", "fiend", "monstrosity", "ooze", "plant", "undead"];
      if(alwaysNpcType.includes(creatureType)) {return true;}

      //check CR for rest (humanoid, giant, custom)
      if(item.actor.system.details.cr <= 3) {return false;}
      else {return true;}
    }
  }
});

/**
 * Makes token larger/smaller depending on mode by # of steps
 * @param {Token} token 
 * @param {string} mode "smaller" or "larger"
 * @param {number} steps integer >= 0
 */
async function makeLargerOrSmaller(token, mode, steps) {
  try {
    if(!mode || !token || !steps) {
      throw new Error("Missing argument(s)");
    }
    if(mode !== "smaller" && mode !== "larger"){
      throw new Error("Argument 'mode' is not 'smaller' or 'larger'.");
    }
    if(!(typeof steps === 'number' || Number.isInteger(steps) || steps >= 0)) {
      throw new Error("Argument 'number' is not a number or is not a positive integer.");
    }

    const SIZES_ORDERED = ['tiny', 'sm', 'med', 'lg', 'huge', 'grg'];
    const SIZES_ORDERED_widthAndHeight = [0.5, 0.8, 1, 2, 3, 4];

    const indexOld = SIZES_ORDERED.indexOf(token.actor.system.traits.size);
    
    let indexNew;
    switch (mode) {
      case "smaller":
        indexNew = Math.max(0, indexOld - steps);
        break;
      case "larger":
        indexNew = Math.min(SIZES_ORDERED.length - 1, indexOld + steps);
        break;
      default:
        throw new Error("Argument 'mode' is not 'smaller' or 'larger'.");
        break;
    }
        
    const targetSize = SIZES_ORDERED[indexNew];
    const targetHeightAndWidth = SIZES_ORDERED_widthAndHeight[indexNew];

    const updates = {
      token: {height: targetHeightAndWidth, width: targetHeightAndWidth},
      actor: {'system.traits.size': targetSize}
    }

    await warpgate.mutate(token.document, updates, {}, {permanent: true});
  }
  catch(err) {
    console.log(err);
  }
}

/**
 * 
 * @param {Token} token 
 * @param {Effect} effect 
 * @param {string[]} names 
 * @returns 
 */

async function linkActiveEffects(token, effect, names) {
  const foundItems = token.actor.items.filter(obj => names.includes(obj.name));
  if(foundItems.length === 0) {return;}

  const validItems = foundItems.filter(obj => obj.system.attunement === 2 && 
    obj.system.equipped === true &&
    obj.effects.size === 1);
  if(validItems.length === 0) {return;}

  const activeEffects = [];
  const linkedEffectNames = [];
  validItems.forEach(obj => {
    activeEffects.push(obj.effects.contents[0]);
    linkedEffectNames.push(obj.name);
  });

  await activeEffects.forEach(obj => {
    const updates = {embedded: {ActiveEffect: {[obj.name]: obj}}};
    const options = {name: `${obj.name}`};
    warpgate.mutate(token.document, updates, {}, options);
  });
  effect.setFlag('world', 'linkedEffectNames', linkedEffectNames);
}

/**
 * 
 * @param {Token} token 
 * @param {Effect} effect 
 * @param {string[]} names 
 */
async function unlinkActiveEffects(token, effect, names) {
  const matchedNames = names.filter(e => effect.flags?.world?.linkedEffectNames?.includes(e));
  await matchedNames.forEach(name => {warpgate.revert(token.document, name)});
}


//expose these functions to the main scope
const TaliaWorldScriptFunctions = {
  makeLargerOrSmaller,
  linkActiveEffects,
  unlinkActiveEffects
};
globalThis.TaliaWorldScriptFunctions = TaliaWorldScriptFunctions;
