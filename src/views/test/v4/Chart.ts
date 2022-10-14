class Graphs {
  public draw() {}
}

class Rect extends Graphs {
  constructor() {
    super()
  }
  draw() {
    console.log('rect')
  }
}

class Controller {
 private graphsList: Graphs[]
  constructor() {
    this.graphsList = []
  }

  addData(graphs: Graphs) {
    this.graphsList.push(graphs)
  }
  draw() {
    this.graphsList.forEach((graphs: Graphs) => {
      graphs.draw
    })
  }
}
  const controller = new Controller()
  const rect = new Rect()
  controller.addData(rect)
  controller.draw()