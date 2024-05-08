//required modules: warpgate, sequencer, jb2a (free)

let additionalDistance = 0;
//factor in other features that give additions to jump distance
//Athletic feature (giving +5ft to jump distance)
if(actor.items.getName("Athletic")) {
    additionalDistance = additionalDistance + 5;
}


const acr = actor.getRollData().skills.acr.total;
const ath = actor.getRollData().skills.ath.total;
//the distance is based off either Athletics or Acrobatics skill, whichever one is higher
let higherSkill = acr > ath ? acr : ath;
//(Base (+0) = 5ft; +5ft per +2) (i.e. Athletics 8 = 25ft)
higherSkill = higherSkill % 2 === 0 ? higherSkill : higherSkill - 1;    //round to next lower even number if odd


const distanceInFeet = (5 + (higherSkill/2)*5) + additionalDistance;
const sizeInSquares = distanceInFeet/5;

const tokenCenter = token.center;
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
            if(distance > distanceInFeet) {   
                crosshairs.icon = 'icons/svg/hazard.svg'
            } else {
                crosshairs.icon = token.document.texture.src
            }
    
            crosshairs.draw()
            
            crosshairs.label = `Jump - ${distance} ft` 
            }
    }
}
let config = {
    size: token.document.width,
    icon: token.document.texture.src,
    interval: token.document.width % 2 === 0 ? 1 : -1,
    drawIcon: true,
    drawOutline: true,
    rememberControlled: true,
    tag: 'Jump',
    label: 'Jump'
};
let callbacks = {
    show: checkDistance
};

let loc = await warpgate.crosshairs.show(config, callbacks);

if (loc.cancelled) {
    return;
} else if (cachedDistance > distanceInFeet) {
    ui.notifications.error('Destination outside range!');
    return;
}

//animation stuff
const tokenScale = { x: token.document.texture.scaleX, y: token.document.texture.scaleY };
const tokenAlpha = token.document.alpha;
const tokenWidth = token.document.width;

new Sequence()
    .animation()
        .on(token)
        .moveTowards(loc, { ease: "easeInOutQuint", relativeToCenter: true })   
        .duration(1200)
        .snapToGrid()
        .waitUntilFinished()
    .effect()
        .file("jb2a.impact.ground_crack.orange.02")
        .atLocation(token)
	.belowTokens()
	.scale(.5 * tokenWidth)   
.play();
