import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { InteractionManager } from "three.interactive";

export default class World {
  constructor(settings) {

    console.log(settings)

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size, divisions);
    if (settings.showGrid) this.scene.add(gridHelper)


    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );

    this.camera.position.set(
      settings.setCameraPos[0],
      settings.setCameraPos[1],
      settings.setCameraPos[2]
    );
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);
    /* 
     this.camera.position.x = 5.2;
     this.camera.position.y = 2.6;
     this.camera.position.z = 8.8;
     this.camera.lookAt(this.scene.position);
     this.scene.add(this.camera); */

    this.renderer = new THREE.WebGLRenderer({
      //physicallyCorrectLights: true,
      antialias: true,
      shadowMap: true,
      outputEncoding: THREE.sRGBEncoding,
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.render(this.scene, this.camera);

    document.body.appendChild(this.renderer.domElement);

    this.InteractionManager = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    if (settings.orbitControls) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);

      if (settings.showCameraPos) this.controls.addEventListener("change", (event) => {

        for (const key in this.controls.object.position) {
          console.log(`${key}: ${Math.round(this.controls.object.position[key] * 10) / 10}`);
        }
      })
    }


    const al = new THREE.AmbientLight(0xffffff, .5);
    if (settings.ambientLight) {
      this.scene.add(al);
    }

    this.renderer.setAnimationLoop((time) => this.animation(time));

    const geometryFloor = new THREE.PlaneGeometry(25, 20);
    const materialFloor = new THREE.MeshPhongMaterial({

      color: 0xcccccc,
      side: THREE.DoubleSide
    })

    const floor = new THREE.Mesh(geometryFloor, materialFloor);
    floor.receiveShadow = true;
    floor.rotation.x = Math.PI / 2

    if (settings.showFloor) this.scene.add(floor);

    window.addEventListener("resize", () =>
      this.onWindowResized(this.renderer, this.camera)
    );


  } //END Constructor

  onWindowResized() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animation(time) {
    this.renderer.render(this.scene, this.camera);
  }
} //END class
