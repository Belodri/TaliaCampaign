//not working for multiple tokens yet, investigate better solution

let config = {
    size: token.document.width,
    label: 'DM Teleport',
    tag: 'DM Teleport',
    drawOutline: true,
    interval: token.document.width % 2 === 0 ? 1 : -1,
    rememberControlled: true
}

let position = await warpgate.crosshairs.show(config);

new Sequence()

.animation()
    .on(token)
    .fadeOut(500)
    .waitUntilFinished()

.animation()

    .on(token)
    .teleportTo(position)
    .snapToGrid()
    .offset({ x: -1, y: -1 })
    .waitUntilFinished()

.canvasPan()
    .delay(100)
    
.animation()

    .on(token)
    .fadeIn(300)
    .waitUntilFinished()

.play()
