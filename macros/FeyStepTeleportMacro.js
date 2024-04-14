//FeyStepTeleportMacro
//Required modules: Automated Animations, Warpgate, DiceSoNice

/*A-A Automatic Recognition Menu:
Preset: "Fey Step"
Advanced Settings: "Force Exact Match" = true
Macro: "When to play": "Macro only, No animation"
-> FeyStepTeleportMacro
sendArgs: "{animFile01: "jb2a.misty_step.01.blue", animFile02: "jb2a.misty_step.02.blue"}"
*/
const source = args[1].sourceToken; 
const animFiles = [args[2].animFile01, args[2].animFile02] ?? ["jb2a.misty_step.01.purple", "jb2a.misty_step.02.purple"]
console.log("animation files", animFiles)

const tokenCenter = source.center;
let cachedDistance = 0;
const checkDistance = async(crosshairs) => {

    while (crosshairs.inFlight) {
        
        //wait for initial render
        await warpgate.wait(100);
        
        const ray = new Ray( tokenCenter, crosshairs );
        
        const distance = canvas.grid.measureDistances([{ray}], {gridSpaces:true})[0]

        //only update if the distance has changed
        if (cachedDistance !== distance) {
          cachedDistance = distance;     
          if(distance > 30) {
              crosshairs.icon = 'icons/svg/hazard.svg'
          } else {
              crosshairs.icon = source.document.texture.src
          }

          crosshairs.draw()
        
          crosshairs.label = `Teleport - ${distance} ft`
          
        }
        
    }
    
}

let config = {
    size: source.document.width,
    label: 'Fey Step Teleport',
    drawOutline: true,
    interval: source.document.width % 2 === 0 ? 1 : -1,
    rememberControlled: true,
    icon: token.document.texture.src,
    labelOffset: {x:0, y:0},
    tag: "Fey Step",
    drawIcon: true
}
let callbacks = {
    show: checkDistance
};

let position = await warpgate.crosshairs.show(config, callbacks);

//own code start
let positionIntended = position;
let xOffset = 0;
let yOffset = 0;

//1d4 = distance in squares
//1d8 = direction (1=N,2=NE,3=E,...)
const gridSize = canvas.grid.size;
const rollDistance = await new Roll("1d4").evaluate();
const rollDirection = await new Roll("1d8").evaluate();

let xMult = 0;
let yMult = 0;
let dirMsg = "";

switch (rollDirection.total) {
 case 1: xMult = 0; yMult = -1; dirMsg = "North"; console.log("Direction: N"); break;
 case 2: xMult = 1; yMult = -1; dirMsg = "North-East"; console.log("Direction: NE"); break;
 case 3: xMult = 1; yMult = 0; dirMsg = "East"; console.log("Direction: E"); break;
 case 4: xMult = 1; yMult = 1; dirMsg = "South-East"; console.log("Direction: SE"); break;
 case 5: xMult = 0; yMult = 1; dirMsg = "South"; console.log("Direction: S"); break;
 case 6: xMult = -1; yMult = 1; dirMsg = "South-West"; console.log("Direction: SW"); break;
 case 7: xMult = -1; yMult = 0; dirMsg = "West"; console.log("Direction: W"); break;
 case 8: xMult = -1; yMult = -1; dirMsg = "North-West"; console.log("Direction: NW"); break;
}


//roll 3d dice
game.dice3d.showForRoll(rollDistance, game.user, true);
game.dice3d.showForRoll(rollDirection, game.user, true);

//create chat message

let content = `${rollDistance.total*5}ft. ${dirMsg}`;
let chatData = {
 user: game.user._id,
 speaker: ChatMessage.getSpeaker(),
 content: content
};
await ChatMessage.create(chatData, {});



let xMax = source.document.object.scene.dimensions.width ?? canvas.dimensions.width; 
let yMax = source.document.object.scene.dimensions.height ?? canvas.dimensions.height;

xOffset = rollDistance.total*gridSize*xMult;
yOffset = rollDistance.total*gridSize*yMult;

position.x = position.x + xOffset;
position.y = position.y + yOffset;

//make sure the position stays inside the scene
if(position.x>xMax) {position.x=xMax-50;} else if(position.x<0) {position.x=50;}
if(position.y>yMax) {position.y=yMax-50;} else if(position.y<0) {position.y=50;}

//own code end

new Sequence()

    .animation()
        .delay(800)
        .on(source)
        .fadeOut(200)

    .effect()
        .file(animFiles[0])
        .atLocation(source)
        .scaleToObject(2)
        .waitUntilFinished(-2000)

    .animation()
        .on(source)
        .teleportTo(position)
        .snapToGrid()
        .offset({ x: -1, y: -1 })
        .waitUntilFinished(200)

    .effect()
        .file(animFiles[1])
        .atLocation(source)
        .scaleToObject(2)

    .animation()
        .delay(1400)
        .on(source)
        .fadeIn(200)

.play()
