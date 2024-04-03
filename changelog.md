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

# [] - xxxx-xx-xx
## Added
## Changed
## Fixed
## Known Issues
