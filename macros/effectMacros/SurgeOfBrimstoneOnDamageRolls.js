if(this.item.type === "spell" && (this.roll.options.type === "fire" || this.roll.options.type === "necrotic")) {
    const effectName = effect.name;
    effect.delete();
    ui.notifications.info(`${effectName} has been consumed.`)
}
