# [0.1.5]
## Added
- Loviatar's Love blessing for Fearghas (actually added to the correct actor this time)
- Adjust Density feature active effects
- Magic Items:
  - Spelleater's Charm to Aviana
  - Mending (Spellwrought Tattoo) to Aviana
  - Wand of Entangle to Aviana
  - Slumbering Dragon Vessel to Shalkoc
  - Mindblasting Cap to Plex
  - Wyrmreaver Gauntlets to Shalkoc
  - Rod of Hellish Flames to Fearghas

- Potion of Climbing
- Ale
- Olive Oil
- Chef feat automation
- Enforced targetting via world script  (might expand this into it's own module at some point)

## Fixed
- Jump macro now correctly factors in the additional jump distance provided by the "Athletic" feature.
- Jump macro now correctly factors in the doubled jump distance provided by the active effect of the "Adjust Density" feature.
- Spellscribing: A Dying Profession - fixed wording and formatting
- Crushed debuff

# [0.1.4]
## Added
- World Script functions: linkActiveEffects() and unlinkActiveEffects()
- Rat Familiar Perception & Stealth proficiency
- Consumable type 'Spell Gem'
- Loviatar's Love blessing for Fearghas
- Macros for Aviana: "Apply Slashed" and "Apply Crushed" until a better way to handle Stable Frenzy's effect can be found.
- Spells:
  - Continual Flame 
- Magic Items:
  - Mantle of the Arcane Trickster
- Potions:
  - Potion of Legendary Resistance
  - Potion of Time Stop
  - Potion of Immediate Rest

## Fixed
- User Permissions for warpgate operations. Affects:
  - Potion of Growth
  - Potion of Diminuation
  - Enlarge/Reduce
- Surge checks now roll properly for NPC actors
- Surge checks now exclude consumables of 'Spell Gem', 'Potion', 'Poison' & 'Food' types.

# [0.1.3]
## Added
- Macro & roll tables for session inspiration
- Macro 'Mark Defeated' to match the look of dead tokens out of combat to ones in combat
- Fey Step A-A animation & macro for randomisation of destination
- Dm Teleport macro
- DeleteLastTemplate (Player) macro to enable deleting of user's placed templates even if other users' templates have been placed afterwards
- Jump macro with range calculation & animation
- Towering Pillar of Hats feature now properly works with all types of hats.
  Due to this the active effects from 'Charismatic Wizard's Hat' and 'Shaman's Hat' were removed as they're no longer needed.
- All alchemical ingredients mentioned in the recipe book
- Grapple feature
- Stable Frenzy: automated damage rerolls for piercing damage
- Magic Items:
  - High Priest's Obsidian Battleaxe
  - Handwraps of Swift Strikes
  - Royal Commander's Cloak
    
- Spells:
  - Spiritual Weapon
  - Mind Sliver
## Fixed
- Sun Statue (for the time being at least until magicItems module is fixed)
- Vice Grip AE attaching token to Aviana

# [0.1.2]
## Fixed
- Breath of the Dragon ItemMacro, see issues

# [0.1.2]
## Fixed
- Breath of the Dragon ItemMacro, see issues

# [0.1.1]
## Added
- Function for handling token size changes via world script. Can be called via TaliaWorldScriptFunctions.makeLargerOrSmaller(token, mode, steps).
- Macro (smallerOrLarger) for changing token size.
- Potions
  - Potion of Growth
  - Potion of Diminuation

# [0.1.1]
## Added
- Hotkeys for layer selection (see settings for customisation)
- Potions
  - Potion of Maximum Power
  - Potion of Advantage
  - Potion of Greater Healing
  - Potion of Superior Healing
  - Potion of Supreme Healing
  - Oil of Slipperiness
## Known Issues
- Potion of Maximum Power doesn't consume it's AE which needs to be done via effect macro instead. The limitation causing this will likely get fixed in dnd5e3.2.

# [0.1.1]
## Added
- AE for Danger Sense with advantage reminder.
- Stable Footing AE (via CE) on Rage
- Homebrew Rules Journal
- Homebrew Rule regarding the expiration of temporary hit points.
- Figurine of a Rat
- Potions
  - Water Breathing
  - Bludgeoning Resistance
  - Piercing Resistance
  - Slashing Resistance
  - Healing
  - Acid Resistance
  - Cold Resistance
  - Force Resistance
  - Lightning Resistance
  - Necrotic Resistance
  - Poison Resistance
  - Psychic Resistance
  - Radiant Resistance
  - Thunder Resistance
  - Potion of Heroism
  - Potion of Gaseous Form
## Changed
- Potion of Heroism changed to: "When you drink this potion you gain 10 temporary hit points. Additionally you are under the effect of the Bless spell for 1 hour (no concentration required)."
- Dead Knight's Chain Shirt: removed the 1h time limit for the temp HP (now lasts until long rest or until enough damage is taken).
## Fixed
- corrupt image data paths for Bear Spirit subitems
- corrupt image data path for Dead Knight's Chain Shirt
- corrupt image data path for Fearghas actor prototype token
- Dead Knight's Chain Shirt item macro
## Known Issues
- Healing application via chat messages is broken for temporary healing

# [0.1] - 2024-04-03
Changelog started
## Fixed
- Players switching to shared vision when unselecting their token. Token vision is now set to = player vision.
- Breath of the Dragon is now able to trigger wild magic surges.
- Breath of the Dragon (Cone) changed from "Activation Cost = 1 Action" to "Activation Cost = 1 Replaces Attack" to match the (Line) version.
- Breath of the Dragon (Cone) changed from "Resource Consumption = 2 null Item Uses" to "Resource Consumption = 2 Ki Item Uses" to match the (Line) version.
- Intimidating Presense description wording.
- Aviana Spellcasting Ability from INT to none. (This is a buff).
- Vice Grip duration changed from "6,[turnStartSource]" to "12,[turnStartSource]".
- Rage AE's Effect Macros (OnEffectCreation & OnCombatTurnStarting) now showing correct image (fixed broken link).
- Rage AE's advantage reminder for ability.checks.str & ability.save.str flags fixed.
- Eagle's Dash Class Feature Type changed from null to "Rage Power".

## Added
- Description and advantage reminder to Dwarven Resilience AE. Note that the advantage reminder shows for all CON saves as poison is not a flag I can check for.
- Description for Powerful Build AE.
- Description for Silver Wing Shield AE.
- Description for Unarmored Defense (Barbarian) AE.
- Description for Fast Movement AE.
- Description for Feral Instinct AE.
- Description for Intimidating Presence AE.
- AE for Ambush Predator (on Tiger Spirit item).
- AE for Keen Senses (on Wolf Spirit item).
- Description for No Escape AE.
- Description for Vice Grip AE.
- Aviana Feature: Murderous Strength.
- Advantage reminder flag for Murderous Strength's passive effect onto Rage's AE. (rework this via macro later to be able to properly trace it's source)
- Description for Unarmored Defense (Monk) AE.
- Description for Unarmored Movement AE.
- Description for Evasion AE.

## Known Issues
- Arcane Recovery missing dialoge & resource consumption.
- Ironfur AE (inheritance of AE's from items granted by other items (Magic Items module) bugged.
- Murderous Strength tracking of activation condition is missing. (rework this via macro once custom grappled condition has been implemented)
- Murderous Strength image is missing.
- Tattoo of the Mountain image is missing.
- Vice Grip's warpgate mutation is currently only applying one way: target token attaching to actor token, it should be both ways.

# []
## Added
## Changed
## Fixed
## Known Issues
