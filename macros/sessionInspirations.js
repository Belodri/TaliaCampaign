//modules required: better roll tables
//TODO: Add results to journal entry "Session Inspiration"

const tablesToRollNames = [
    'Aviana Inspiration', 
    'Fearghas Inspiration',
    'Plex Inspiration', 
    'Shalkoc Inspiration'
];
let allResultsText = [];

for(const tableName of tablesToRollNames) {
    let tableEntity;
    try {
        tableEntity = game.tables.getName(tableName);
    }
    catch(err) {
        ui.notifications.warn(`No table named "${tableName}" could be found.`);
        continue;
    }
    const resultsForName = await game.modules.get('better-rolltables').api.betterTableRollV2(tableEntity, {});
    allResultsText.push(
        {
            name: tableName.slice(0, tableName.indexOf(' Inspiration')),
            0: resultsForName.results[0].text,
            1: resultsForName.results[1].text,
        }
    )
}
console.log(allResultsText);
