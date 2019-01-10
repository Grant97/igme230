
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
  
       //Calling the functions we created to generate the boxes and planes.
      // var box = getBox(1, 1, 1);
       var plane = getPlane(30);
       var sphere = getSphere(0.05);
  
       //Box grid for new box object
       var boxGrid = getBoxGrid(10, 1.5);
  
       //Calling the box name just cuz.
       //box.name = 'box-1';
  
  
       //Calling Point Light
       var spotLight = getSpotLight(1);
       //Probably should give items names, makes it easy to call on them in other functions.
       spotLight.name = 'spotLight-1'
       
  
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
      spotLight.position.y = 4;
  
      //Setting spotLight intensity to be bright so we can see when it changes.
      spotLight.intensity = 2;
  
  
      //Here is the code that adds the GUI controls in the canvas
      // Parameters are what want to control, it's parameters, min value, max value 
      gui.add(spotLight, 'intensity', 0, 10);
      gui.add(spotLight.position, 'x', 0, 20);
      gui.add(spotLight.position, 'y', 0, 20);
      gui.add(spotLight.position, 'z', 0, 20);
      //Gui used to soften spotlight edge
      gui.add(spotLight, 'penumbra', 0, 1);
  
       //Now Making the box a child of the plane object.
      //scene.add(box);
  
      //Now we actually add the plane and box to the scene.
      scene.add(plane);
     
      //Now actually adding the point light
      //scene.add(spotLight);
  
      //Now actually adding the spot light
      scene.add(spotLight);
  
      scene.add(boxGrid);
  
      //Adding Sphere inside the spotLight, this is so we can visualize where the spotLight is.
      spotLight.add(sphere);
       
  
  
      var camera = new THREE.PerspectiveCamera(45,
          window.innerWidth/window.innerHeight,1,1000);
         
            
               /*Moving the camera back, down, and to the side a bit since it starts in the middle of the screen,
       which is merged within the box's geometry preventing us from seeing anything. */
  
      camera.position.z = 5;
      camera.position.x = 1;
      camera.position.y = 2;  
  
    
  
      
      /* Tells the camera to look at the center using vec3 (Vec with a size 3 array) from webGL, 
      Vector3(x-Position,y-Positon, z / Depth) */
      camera.lookAt(new THREE.Vector3(0,0,0));
  
  
          //Creating the renderer,setting size, and then adding the renderer to HTML
          
         var renderer = new THREE.WebGLRenderer();
         //Setting up shadows in the renderer
         renderer.shadowMap.enabled = true;
         
         renderer.setSize(window.innerWidth, window.innerHeight);
         //Setting color of background to white so that it merges with the fog.
         renderer.setClearColor('rgb(120, 120, 120)');
         
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
  
  
        
  
  
  
  
  
       //scene.add(box);
      
      
  
  
    
      //Here we return the scene obj, so now we can look up it's data in the console log.
      return scene;
  }
  
  
  function update(renderer, scene, camera, controls){
  
      //Here we created an update function in order to animate our objects.
      renderer.render(
          scene,
          camera
      );
  
      controls.update();
  
  
      /*
      //creating a var that is linked to the plane we created
      //also calling it by using getObjectByName on it's parent 
      //the scene object.
      var plane = scene.getObjectByName('plane-1');
      var box = scene.getObjectByName('box-1');
  
      /* PointLight Experiment
      var spotLight = scene.getObjectByName('spotLight-1')
   
      spotLight.position.y += 0.1;
  
     if(spotLight.position.y >= 5){
         spotLight.position.y = 5;
         return;
     }
     console.log(spotLight.position.y);
     
     */
      
      
      requestAnimationFrame(function(){
          update(renderer, scene, camera, controls);
      })
  
  }
  
  function getPointLight(intensity){
      var light = new THREE.PointLight(0xffffff, intensity);
      light.castShadow = true;
      return light;
  }
  
  
  function getSpotLight(intensity){
      var light = new THREE.SpotLight(0xffffff, intensity);
      light.castShadow = true;
      light.shadow.bias = 0.001;

      //Increasing resolution of shadow maps for cleaner shadows.
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      return light;
  }
  
  
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
              same place*/
              
              obj.position.z = j * separationMultiplier;
              group.add(obj);
          }
      }
  
      group.position.x = -(separationMultiplier * (amount-1))/2;
      group.position.z = -(separationMultiplier * (amount-1))/2;
  
      return group;
  }
  
  
  
  function getSphere(size){
      //Spheres require a size, and the other are like the  like segments in Cinema 4d, which determines 
      //how smooth it is.
      var geometry = new THREE.SphereGeometry(size, 24, 24);
      var material = new THREE.MeshBasicMaterial({
          color: 'rgb(255, 255, 255)'
      });
  
      var mesh = new THREE.Mesh(
          geometry,
          material
      );
      
  
  return mesh;
  
  }
  
  
  function getPlane(size){
      var geometry = new THREE.PlaneGeometry(size,size);
      var material = new THREE.MeshPhongMaterial({
          color: 'rgb(120, 120, 120)',
          side: THREE.DoubleSide
      });
  
      var mesh = new THREE.Mesh(
          geometry,
          material
      );
      mesh.receiveShadow = true;
  
      
  return mesh;
  
  }
  
  var scene = start();
  
  
  