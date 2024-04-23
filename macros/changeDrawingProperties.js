//credit to Zhell

//changes drawings to serve as limited vision blockers

const updates = canvas.drawings.controlled.map(d => {
    const o = {enabled: true, range: 5};
    return {
      _id: d.id,
      strokeAlpha: 0.1,
      strokeWidth: 1,
      "flags.limits.light": {...o},
      "flags.limits.sight": {basicSight: {...o}, lightPerception: {...o}, seeInvisibility: {...o}}
    }
});
await canvas.scene.updateEmbeddedDocuments("Drawing", updates);
