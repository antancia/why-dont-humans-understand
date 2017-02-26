export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const createSprites = (arrayOfSprites, addFunction, objectAddFunction) => {
  arrayOfSprites.forEach(sprite => {
    addFunction(sprite)
    objectAddFunction(sprite)
  })
}
