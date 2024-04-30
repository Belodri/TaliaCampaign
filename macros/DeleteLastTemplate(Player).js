//Delete the last template the user placed, even if it's not the last template in the array
for (let i = canvas.templates.placeables.length-1; i >= 0; i--) {
    try {
        canvas.templates.placeables.at(i).document.delete();
        break;
    }
    catch {
        continue
    }
}
