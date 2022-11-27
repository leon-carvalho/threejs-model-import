// RENDERER SETUP
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".webGLContainer").appendChild(renderer.domElement);

// SCENE SETUP
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 33);
camera.lookAt(0, 0, 0);

let SquareRingMesh;
let SquareRingGroup = new THREE.Group();

const modelLoader = new THREE.GLTFLoader();
modelLoader.load("assets/squareRing.glb", (glb) => {
  console.log(glb);

  glb.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      SquareRingMesh = child;
      child.material = new THREE.MeshNormalMaterial();
    }
  });

  for (let i = 0; i < 20; i++) {
    const clones = SquareRingMesh.clone();
    clones.scale.set(i, i, i);

    SquareRingGroup.add(clones);
  }

  scene.add(SquareRingGroup);
});

// RENDER LOOP
function update() {
  SquareRingGroup.rotation.x += 0.01;
  SquareRingGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}

update();
