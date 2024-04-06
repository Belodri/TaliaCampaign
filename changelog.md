# [0.1.1] - 2024-04-06
- Calendar time upon starting: Quintus 11, 1497; 07:45:39
## Added
- AE for Danger Sense with advantage reminder.
- Stable Footing AE (via CE) on Rage
- Homebrew Rules Journal
- Homebrew Rule regarding the expiration of temporary hit points.
- Figurine of a Rat
- Potions
- - Water Breathing
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

# [] - xxxx-xx-xx
- Calendar time upon starting:
## Added
## Changed
## Fixed
## Known Issues
