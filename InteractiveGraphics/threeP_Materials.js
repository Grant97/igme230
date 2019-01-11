
function start() {
  
  
    //Creating Scene and Camera 
      var scene = new THREE.Scene();
      var gui = new dat.GUI();
  
      //Condition for enabling fog.
      var enableFog = false;
  
      if (enableFog){
  
      //Setting up fog, arguments (color, denisity)
      scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  
      }
  
       // initialize objects
	var sphereMaterial = getMaterial('standard', 'rgb(255, 255, 255)');
	var sphere = getSphere(sphereMaterial, 1, 24);

	var planeMaterial = getMaterial('standard', 'rgb(255, 255, 255)');
	var plane = getPlane(planeMaterial, 30);

	var lightLeft = getSpotLight(1, 'rgb(255, 220, 180)');
	var lightRight = getSpotLight(1, 'rgb(255, 220, 180)');
  
  
       // manipulate materials
       sphere.position.y = sphere.geometry.parameters.radius;
       plane.rotation.x = Math.PI/2;


       lightLeft.position.x = -5;
	lightLeft.position.y = 2;
	lightLeft.position.z = -4;

	lightRight.position.x = 5;
	lightRight.position.y = 2;
    lightRight.position.z = -4;

    //Texture Loader
    var loader = new THREE.TextureLoader();
    planeMaterial.map = loader.load('images/concrete.jpg');
    planeMaterial.bumpMap = loader.load('images/concrete.jpg');
    planeMaterial.bumpScale = 0.01;


    var maps = ['map', 'bumpMap'];
    maps.forEach(function(mapName) {
        
    //This will make the texture x and y repeat, at a 1.5 frequency
    

		var texture = planeMaterial[mapName];
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1.5, 1.5);
	});
    
   
    

	// dat.gui
	var folder1 = gui.addFolder('light_1');
	folder1.add(lightLeft, 'intensity', 0, 10);
	folder1.add(lightLeft.position, 'x', -5, 15);
	folder1.add(lightLeft.position, 'y', -5, 15);
	folder1.add(lightLeft.position, 'z', -5, 15);

	var folder2 = gui.addFolder('light_2');
	folder2.add(lightRight, 'intensity', 0, 10);
	folder2.add(lightRight.position, 'x', -5, 15);
	folder2.add(lightRight.position, 'y', -5, 15);
	folder2.add(lightRight.position, 'z', -5, 15);

    var folder3 = gui.addFolder('materials');
    folder3.add(sphereMaterial, 'roughness', 0, 1);
    folder3.add(planeMaterial, 'roughness', 0, 1);
    folder3.add(sphereMaterial, 'metalness', 0, 1);
    folder3.add(planeMaterial, 'metalness', 0, 1);
    folder3.open();

	// add objects to the scene
	scene.add(sphere);
	scene.add(plane);
	scene.add(lightLeft);
	scene.add(lightRight);
  
      //Establishing a name for the plane so that it will be easy to call
      plane.name = 'plane-1';
      
      /*Updating the box y so that box is moved to sit on top of the plane 
      since it starts directly in the center of the screen.*/
       //box.position.y = box.geometry.parameters.height/2;
  
       //Rotating the plane so that it is flat on the ground
       plane.rotation.x = Math.PI/2;
       
       plane.position.y = 0;
  
       /* Setting Point Light Position so that it's
       not in the origin. (P.S. Make sure to make these
          position changes before you add them to the scene
          or else it won't run. */
      // pointLight.position.y = 4;
  
      //Setting pointLight intensity to be bright so we can see when it changes.
      // pointLight.intensity = 2;
  
  
      
  
    
  
	// camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000 // far clipping plane
	);
	camera.position.z = 7;
	camera.position.x = -2;
	camera.position.y = 7;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

  
          //Creating the renderer,setting size, and then adding the renderer to HTML
          
         var renderer = new THREE.WebGLRenderer();
         //Setting up shadows in the renderer
         renderer.shadowMap.enabled = true;
         
         renderer.setSize(window.innerWidth, window.innerHeight);
         
         
         document.getElementById('webgl').appendChild(renderer.domElement);
  
         var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
         /* Starting the actual Render.
         renderer.render(
             scene,
             camera
         )
         */   
  
         //Now with the update function we're just going to call it from here.
         update(renderer, scene, camera, controls);  
  
  
    
      //Here we return the scene obj, so now we can look up it's data in the console log.
      return scene;
  }
  
  //Here is the getMaterial function which will use a switch statement
  //which will allow us to select the material we want to use.
  function getMaterial(type, color) {
	var selectedMaterial;
	var materialOptions = {
		color: color === undefined ? 'rgb(255, 255, 255)' : color,
	};

	switch (type) {
		case 'basic':
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
		case 'lambert':
			selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
			break;
		case 'phong':
			selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
			break;
		case 'standard':
			selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
			break;
		default: 
			selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
			break;
	}

	return selectedMaterial;
}


  
  

  function getPointLight(intensity){
      var light = new THREE.PointLight(0xffffff, intensity);
      light.castShadow = true;
      return light;
  }
  
  function getSpotLight(intensity, color){

    color = color === undefined ? 'rgb(255, 255, 255)' : color;
	var light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.penumbra = 0.5;

	//Set up shadow properties for the light
	light.shadow.mapSize.width = 2048;  // default: 512
	light.shadow.mapSize.height = 2048; // default: 512
	light.shadow.bias = 0.001;

    return light;
    
  }
  
/*
  function getDirectionalLight(intensity){
      var light = new THREE.DirectionalLight(0xffffff, intensity);
      light.castShadow = true;
      //Using bias to remove artifacting from Light Shadows
      light.shadow.bias = 0.001;

      //Changing Camera position so that the light can capture all of the shadows
      //Default value is -5
      light.shadow.camera.left = -10;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.right = 10;
      light.shadow.camera.top = 10;
      

      //Increasing resolution of shadow maps for cleaner shadows.
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      return light;
  } 
  */
  
  
  function getBox(w, h, d){
      var geometry = new THREE.BoxGeometry(w, h, d);
      var material = new THREE.MeshPhongMaterial({
          color: 'rgb(120, 120, 120)'
      });
  
      var mesh = new THREE.Mesh(
          geometry,
          material
      );
      mesh.castShadow = true;
  
  return mesh;
  
  }
  

  /*
  function getBoxGrid(amount, separationMultiplier) {
     //Create new group
      var group = new THREE.Group();
  
      //Create a for loop to create every object, this will make 10 cubes.
      for (var i=0; i<amount; i++) {
          var obj = getBox(1, 1, 1);
          obj.position.x = i * separationMultiplier;
          //The y will get the same parameter we used before  to keep the cubes above the plane.
          obj.position.y = obj.geometry.parameters.height/2;
          group.add(obj);
        
          //Additional for loop within the for loop. This will make 100 cubes.
          for (var j=1; j<amount; j++) {
              var obj = getBox(1, 1, 1);
              obj.position.x = i * separationMultiplier;
              obj.position.y = obj.geometry.parameters.height/2;
              /* We have to also change the z so that the cubes don't all generate in the
              same place
              
              obj.position.z = j * separationMultiplier;
              group.add(obj);
          }
      }
  
      group.position.x = -(separationMultiplier * (amount-1))/2;
      group.position.z = -(separationMultiplier * (amount-1))/2;
  
      return group;
  }
  
  */
  
  function getSphere(material, size, segments){
    var geometry = new THREE.SphereGeometry(size, segments, segments);
	var obj = new THREE.Mesh(geometry, material);
	obj.castShadow = true;

	return obj;
  
  }
  
  
  function getPlane(material, size){
    var geometry = new THREE.PlaneGeometry(size, size);
	material.side = THREE.DoubleSide;
	var obj = new THREE.Mesh(geometry, material);
	obj.receiveShadow = true;

	return obj;
   
  }


  
//This is what's going start the animation.
function update(renderer, scene, camera, controls){
  
    //Here we created an update function in order to animate our objects.
    renderer.render(
        scene,
        camera
    );

  //Setting up boxgrid object to call the boxgrid in the start function.
  //  var boxGrid = scene.getObjectByName('boxGrid');
   

    controls.update();


    /*
    //creating a var that is linked to the plane we created
    //also calling it by using getObjectByName on it's parent 
    //the scene object.
    var plane = scene.getObjectByName('plane-1');
    var box = scene.getObjectByName('box-1');

    /* PointLight Experiment
    var pointLight = scene.getObjectByName('pointLight-1')
 
    pointLight.position.y += 0.1;

   if(pointLight.position.y >= 5){
       pointLight.position.y = 5;
       return;
   }
   console.log(pointLight.position.y);
   
   */
    
    
    requestAnimationFrame(function(){
        update(renderer, scene, camera, controls);
    })
}


  
  var scene = start();
  
  
