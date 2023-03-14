import World from './World';

export default class Po {
  constructor() {

    let world = new World({
      showCameraPos: false,
      setCameraPos: [22.1, 8.9, 26.6, 3.1],
      showGrid: true,
      ambientLight: true,
      orbitControls: true,
      showFloor: false,
    });

  } //END Constructor
} //END class