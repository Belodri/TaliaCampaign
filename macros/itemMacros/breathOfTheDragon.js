//required modules: itemMacro, warpgate

/*     
todo1: add some kind of display in the ui if not enough uses are remaining for one or both options
todo2: add additional cases for later level features that change the breath weapon


*/
//debugging
//console.log(actor);
//console.log('Item before: ',item.system);
//return

//hardcoded constants
const damageTypes = ['Acid', 'Cold', 'Fire', 'Lightning', 'Poison'];


//retrieve consts of item for later display in ui
const usesValue = item.system.uses.value;       //remaining uses of the item
const usesMax = item.system.uses.max;           //maximum uses of the item
const consumeKiUsesAmount = item.system.consume.amount; //how many uses of the ki item would be consumed upon activation

//get consts of consumed item for later display in ui
const kiItem= actor.items.get(item.system.consume.target);      //find ki item based on item linked manually in consumption
const kiItemUsesValue = kiItem.system.uses.value;    //remaining Ki
const kiItemUsesMax = kiItem.system.uses.max;      //maximum Ki

//todo1

//inputs section for warpgate menu
let inputs = [{
        label: 'Shape',
        type: 'select',
        options: [
                {html: 'Line', value: 'line'},
                {html: 'Cone', value: 'cone'}
        ]
},{
        label: 'Consume',
        type: 'select',
        options: [
                {html: `Uses (${usesValue}/${usesMax})`, value: 'uses'},
                {html: `${consumeKiUsesAmount} Ki (${kiItemUsesValue}/${kiItemUsesMax})`, value: 'ki'}
        ]
}];

//buttons section for warpgate menu
let buttons = [];
for (const dType of damageTypes) {
        let prototypeButton = {
                label: dType,
                value: dType.toLowerCase()
        }
        buttons.push(prototypeButton);
}

//warpgate menu
let prompts = {
        inputs,
        buttons
}
let warpgateConfig = {
        title: item.name
}    
const results = await warpgate.menu(prompts, warpgateConfig);

//cancel if menu was closed
if(results.buttons === false) {
        return;
}


const chosenDamageType = results.buttons;       //'Acid', 'Cold', 'Fire', 'Lightning', 'Poison'
const shape = results.inputs[0];                //'cone' or 'line'
const consumption = results.inputs[1];          //'uses' or 'ki'



//assign target properties by shape
let targetValue;
let targetWidth;
switch (shape) {
    case 'line':
        targetValue = 30;
        targetWidth = 5;
        break;
    case 'cone':
        targetValue = 30;
        targetWidth = null;
        break;
    //todo2
}

//object containing the values that need to be overwritten via updateEmbeddedDocuments
let itemSystem = {
        damage: {
            parts: [
                [item.system.damage.parts[0][0],        //string (roll formula of the damage)
                chosenDamageType]                       //string
            ]
        },
        target: {
            type: shape,                                //string
            value: targetValue,                         //number
            width: targetWidth                          //number
        }
}

//update the item
await actor.updateEmbeddedDocuments("Item", [{_id: item._id, "system": itemSystem}]);

//configure consumption
let config = {
    consumeUsage: consumption === "uses" ? true : null,
    consumeResource: consumption === "uses" ? null : true
};

//debugging
//console.log('Item after: ',item.system);

await item.use(config,{skipItemMacro: true, configureDialog: false});
