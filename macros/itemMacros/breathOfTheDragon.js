//required modules: warpgate, itemMacro

const usesValue = item.system.uses.value;
const usesMax = item.system.uses.max;
const kiItem = actor.items.getName("Ki");
const kiValue = kiItem.system.uses.value;
const kiMax = kiItem.system.uses.max;

let inputs = [{
        label: "Shape",
        type: "select",
        options: [
                {html: "Line", value: "line"},
                {html: "Cone", value: "cone"}
        ]
},{
        label: "Consume",
        type: "select",
        options: [
                {html: `Uses (${usesValue}/${usesMax})`, value: "uses"},
                {html: `2 Ki (${kiValue}/${kiMax})`, value: "ki"}
        ]
}];
    
let damageTypes = ['Acid', 'Cold', 'Fire', 'Lightning', 'Poison'];
let buttons = [];
for (const dType of damageTypes) {
        let prototypeButton = {
                label: dType,
                value: dType.toLowerCase()
        }
        buttons.push(prototypeButton);
}
let prompts = {
        inputs,
        buttons
}
let warpgateConfig = {
        title: 'Breath of the Dragon'
}
    
const results = await warpgate.menu(prompts, warpgateConfig);
//cancel if menu was closed
if(results.buttons === false) {
        return;
}

const chosenDamageType = results.buttons;       //'Acid', 'Cold', 'Fire', 'Lightning', 'Poison'
const shape = results.inputs[0];                //'cone' or 'line'
const consumption = results.inputs[1];          //'uses' or 'ki'

console.log("Item before: ",item.system);

let itemSystem = item.system;

//assign damage type
itemSystem.damage.parts[0][1] = chosenDamageType;

//assign target properties by shape
itemSystem.target.prompt = false;
itemSystem.target.type = shape;
itemSystem.target.units = "ft";
switch (shape) {
    case "line":
        itemSystem.target.value = 30;
        itemSystem.target.width = 5;
        break;
    case "cone":
        itemSystem.target.value = 30;
        break;
    //add additional cases for later level features that change the breath weapon
}

//update the item
await actor.updateEmbeddedDocuments("Item", [{_id: item._id, "system": itemSystem}]);

//configure consumption
let config = {
    consumeUsage: false,
    consumeResource: false
};
config.consumeUsage = consumption === "uses" ? true : false;
config.consumeResource = consumption === "uses" ? true : true;

await item.use(config,{skipItemMacro: true, configureDialog: false});
