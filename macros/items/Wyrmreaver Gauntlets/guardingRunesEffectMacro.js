//effect macro: on long rest


const damageTypes = ['Acid','Cold','Fire','Lightning','Poison'];

const buttons = damageTypes.reduce((buttons, id) => {
    buttons[id] = {label: id, callback: callback};
    return buttons;
},{});

const chosenType = await Dialog.wait({
    title: "Wyrmreaver Gauntlets - Guarding Runes",    
    content: `<p style="margin-bottom: 2%; margin-top: 0%;">Choose the type of damage the runes will protect you against until your next long rest.</p>`,
    buttons: buttons,
    close: () =>  null,
});

async function callback([html], event) {
    const action = event.currentTarget.dataset.button;
    return action;
}

const chosenTypeValue = chosenType.toLowerCase();
if(effect.changes[0].value === chosenTypeValue) return;
const {key, mode, value} = effect.changes[0];
const newDescription = replaceKeywords(effect.description, damageTypes, chosenTypeValue);
const effectChanges = {
    changes: [{key, mode, value: `${chosenTypeValue}`}],
    description: newDescription,
}
await effect.update(effectChanges);

/**
 * Replaces all occurrences of the specified keywords in the given string with the replacement string,
 * preserving the initial letter case of each matched keyword.
 *
 * @param {string} str - The input string in which to replace keywords.
 * @param {string[]} searchKeys - An array of keywords to search for in the input string.
 * @param {string} repStr - The replacement string to use for each matched keyword.
 * @returns {string} - The modified string with keywords replaced by the replacement string.
 */
function replaceKeywords(str, searchKeys, repStr) {
    // Create a regular expression to match any of the search keys as whole words, case insensitive
    const regex = new RegExp(`\\b(${searchKeys.join('|')})\\b`, 'gi');

    // Replace each match with the replacement string, preserving the initial letter case
    return str.replace(regex, (matched) => {
        // Check if the first character of the matched word is uppercase
        if (matched[0] === matched[0].toUpperCase()) {
            // If yes, capitalize the first letter of the replacement string
            return repStr.charAt(0).toUpperCase() + repStr.slice(1);
        } else {
            // If no, make the first letter of the replacement string lowercase
            return repStr.charAt(0).toLowerCase() + repStr.slice(1);
        }
    });
}
