if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}
function init() {
    var mixers = [];
    var renderer,
        scene,
        camera,
        myCanvas = document.getElementById('myCanvas'),
        stats;

    //RENDERER
    renderer = new THREE.WebGLRenderer({
        canvas: myCanvas,
        antialiasing: true,
        alpha: true
    });
    // renderer = new THREE.WebGLRenderer( { antialias: true } );
    // 			renderer.setPixelRatio( window.devicePixelRatio );
    // 			renderer.setSize( window.innerWidth, window.innerHeight );
    // 			container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    // renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // renderer.setClearColor(0xffffff);
    window.addEventListener('resize', onWindowResize, false);
    // var backgroundColor = new THREE.Color( 0x21252d );
    texture = new THREE.TextureLoader().load("2019-05-19_handshake_r_01.jpg");

    //SCENE
    scene = new THREE.Scene();
    console.log(scene);
    console.log(camera);

    // 	// STATS
    // stats = new Stats();
    // document.body.appendChild( stats.dom );

    //CAMERA
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .01, 1000);
    camera.position.set(100, 0, -250);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(255,255,255)');
    document.getElementById('webgl').appendChild(renderer.domElement);



    //LIGHTS
    // var light = new THREE.AmbientLight(0xffffff, 0.5);
    // scene.add(light);
    // // light.position.z =10;

    // var light2 = new THREE.PointLight(0xffffff, 0.5);
    // scene.add(light2);
    // light2.position.z = 10;

    // hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    // 				hemiLight.color.setHSL( 0.6, 1, 0.6 );
    // 				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    // 				hemiLight.position.set( 0, 0, 100 );
    // 				scene.add( hemiLight );

    // light3 = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 20, 10);
    // scene.add(light);

    // var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0xffff00, depthWrite: false }));
    // plane.rotation.x = - Math.PI / 2;
    // plane.position.set(0, 0, 0)
    // scene.add(plane);
    // LIGHTS
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    //  hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    //  scene.add( hemiLightHelper );
    //
    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(- 50, 2.75, -210);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;
    // var d = 50;
    // dirLight.shadow.camera.left = - d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = - d;
    // dirLight.shadow.camera.far = 3500;
    // dirLight.shadow.bias = - 0.0001;
    //  dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
    //  scene.add( dirLightHeper );






    dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
    dirLight2.color.setHSL(0.1, 1, 0.95);
    dirLight2.position.set(- 1, 2.75, 10);
    dirLight2.position.multiplyScalar(30);
    scene.add(dirLight2);
    // dirLight.castShadow = true;
    // dirLight.shadow.mapSize.width = 2048;
    // dirLight.shadow.mapSize.height = 2048;
    // var d = 50;
    // dirLight.shadow.camera.left = - d;
    // dirLight.shadow.camera.right = d;
    // dirLight.shadow.camera.top = d;
    // dirLight.shadow.camera.bottom = - d;
    // dirLight.shadow.camera.far = 3500;
    // dirLight.shadow.bias = - 0.0001;
    //   dirLightHeper2 = new THREE.DirectionalLightHelper( dirLight2, 10 );
    //   scene.add( dirLightHeper2 );

    var loader = new THREE.GLTFLoader();
    // loader.load('hand_low_poly.glb', handle_load);

    // var mesh;
    // camera.position.x = 10;
    // camera.position.y = 10;
    // camera.position.z = 0;
    loader.load('hand_low_poly.glb', function (gltf) {
        var mesh = gltf.scene.children[0];

        mesh.rotation.x = -1;
        // mesh.rotation.z = ;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        var mixer = new THREE.AnimationMixer(mesh);
        mixer.clipAction(gltf.animations[0]).setDuration(1).play();
        mixers.push(mixer);

        var Sphere = mesh.children[0];
        Sphere.material.color.r = 255;
        Sphere.material.color.g = 0;
        Sphere.material.color.b = 0;

        var Sphere1 = mesh.children[1];
        Sphere1.material.color.r = 255;
        Sphere1.material.color.g = 0;
        Sphere1.material.color.b = 0;

        var Sphere2 = mesh.children[2];
        Sphere2.material.color.r = 255;
        Sphere2.material.color.g = 0;
        Sphere2.material.color.b = 0;
        // Sphere1.castShadow = false;
        // Sphere1.receiveShadow = false;


        var hand = mesh;
        hand.material.color.r = 255;
        hand.material.color.g = 255;
        hand.material.color.b = 255;


        hand.children[0].castShadow = true;

        mesh.material = new THREE.MeshLambertMaterial({ map: texture });
        // mesh.children[1].userData.uuid = "Sphere1Id";
        console.log(Sphere1);

        document.getElementById('webgl').appendChild(renderer.domElement);
        const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

        //SPHERE
        var $slider = document.getElementById('slider');

        domEvents.addEventListener(Sphere, 'click', event => {
            document.querySelector('#overlay').style.display = "block";
            // var isOpen = $slider.classList.contains('slide-in');
            // $slider.setAttribute('class', isOpen ? 'slide-out' : 'slide-in');
        });
        domEvents.addEventListener(Sphere, 'touchstart', event => {
            document.querySelector('#overlay').style.display = "block";
        });
        document.querySelector('#overlay').addEventListener("click", function () {
            document.querySelector('#overlay').style.display = "none";
        });
        document.querySelector('#overlay').addEventListener("touchend", function () {
            document.querySelector('#overlay').style.display = "none";
        });
        //SPHERE1
        domEvents.addEventListener(Sphere1, 'click', event => {
            document.querySelector('#overlay1').style.display = "block";
        });
        domEvents.addEventListener(Sphere1, 'touchstart', event => {
            document.querySelector('#overlay1').style.display = "block";
        });
        document.querySelector('#overlay1').addEventListener("click", function () {
            document.querySelector('#overlay1').style.display = "none";
        });
        document.querySelector('#overlay1').addEventListener("touchend", function () {
            document.querySelector('#overlay1').style.display = "none";
        });
        //SPHERE1
        domEvents.addEventListener(Sphere2, 'click', event => {
            document.querySelector('#overlay2').style.display = "block";
        });
        domEvents.addEventListener(Sphere2, 'touchstart', event => {
            document.querySelector('#overlay2').style.display = "block";
        });
        document.querySelector('#overlay2').addEventListener("click", function () {
            document.querySelector('#overlay2').style.display = "none";
        });
        document.querySelector('#overlay2').addEventListener("touchend", function () {
            document.querySelector('#overlay2').style.display = "none";
        });
         //SPHERE1
         domEvents.addEventListener(Sphere3, 'click', event => {
            document.querySelector('#overlay3').style.display = "block";
        });
        domEvents.addEventListener(Sphere3, 'touchstart', event => {
            document.querySelector('#overlay3').style.display = "block";
        });
        document.querySelector('#overlay2').addEventListener("click", function () {
            document.querySelector('#overlay3').style.display = "none";
        });
        document.querySelector('#overlay2').addEventListener("touchend", function () {
            document.querySelector('#overlay3').style.display = "none";
        });


    });
    // var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    // var groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    // groundMat.color.setHSL(0.095, 1, 0.75);
    // var ground = new THREE.Mesh(groundGeo, groundMat);
    // ground.position.y = - 33;
    // ground.rotation.x = - Math.PI / 2;
    // ground.castShadow = true;
    // scene.add(ground);

    // function handle_load(gltf) {
    //     mesh = gltf.scene.children[0];
    //     scene.add(mesh);

    //     console.log(mesh);
    //     // const root = gltf.scene;
    //     // scene.add(root);
    //     // sphere2 = root.getObjectByName('Sphere2');
    //     // console.log(sphere2);


    // }
    // var gui = new dat.GUI();
    // gui.add( params, 'hemilight', 0, 100 );
    // 			gui.open();


    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }
    // //RENDER LOOP
    // render();

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    update(renderer, scene, camera, controls);
    controls.minDistance = 6;
    controls.maxDistance = 6;

    return scene;
}

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    controls.update();

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    })
}

var scene = init(); 