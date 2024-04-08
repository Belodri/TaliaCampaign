//required modules: warpgate

//Increases or decreases size of selected token by a number of steps chosen via dialog menu.
if(!token){
    ui.notifications.notify("No token selected.");
    return
}

let prompts = {
    inputs: [{
        label: 'Steps',
        type: 'select',
        options: [
            {html: '1', value: 1, selected: true},
            {html: '2', value: 2},
            {html: '3', value: 3}
        ],
    },{
        label: token.name,
        type: 'checkbox',
        options: true,
    }],
    buttons: [{
        label: 'Smaller',
        value: 'smaller'
    },{
        label: 'Larger',
        value: 'larger'
    },{
        label: 'Cancel',
        value: false
    }]
}

let config = {
    title: 'Smaller or Larger'
}
const results = await warpgate.menu(prompts, config);
console.log(results);

if(results.buttons === false){
    return;
}

const mode = results.buttons;
const steps = results.inputs[0];
const chosenToken = results.inputs[1];

if(chosenToken === true){
    await TaliaWorldScriptFunctions.makeLargerOrSmaller(token, mode, steps);
}
