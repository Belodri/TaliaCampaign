Hooks.once("init", () => {
  //confirm world script is running
  console.log("World script is running!");

  // Adding new equipment types
  CONFIG.DND5E.equipmentTypes.hat = CONFIG.DND5E.miscEquipmentTypes.hat = "Hat";


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
  if(item.labels.properties.some(property => property.label === "Wild") && Math.random() <= 0.05) { //0.05 default for 5% chance or 1/20
    game.tables.getName('WMS').draw();
    return;
  }
  else {console.log("No Surge");}
});


/*
  Makes token larger/smaller depending on mode by # of steps
  token = object
  mode = string "smaller" or "larger"
  steps = number && integer && >=0
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

//expose these functions to the main scope
const TaliaWorldScriptFunctions = {
  makeLargerOrSmaller
};
globalThis.TaliaWorldScriptFunctions = TaliaWorldScriptFunctions;
