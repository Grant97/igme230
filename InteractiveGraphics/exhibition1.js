
function start() {
  
  
    //Creating Scene and Camera 
      var scene = new THREE.Scene();
      var gui = new dat.GUI();

       //Calling the functions we created to generate the boxes and planes.
       var box = getBox(1, 1, 1);
       var plane = getPlane(4);
       
  
  
        //Establishing a name for the plane so that it will be easy to call
      box.name = 'box-1';

      //Establishing a name for the plane so that it will be easy to call
      plane.name = 'plane-1';
      
      /*Updating the box y so that box is moved to sit on top of the plane 
      since it starts directly in the center of the screen.*/
       box.position.y = 0.5;
  
       //Rotating the plane so that it is flat on the ground
       plane.rotation.x = Math.PI/2;
       
       plane.position.y = 0;
  
       //Now Making the box a child of the plane object.
      scene.add(box);
  
      //Now we actually add the plane and box to the scene.
      scene.add(plane);
      
      console.log(box);
     
      //User Interface code
      var pMenu = gui.addFolder('Plane Rotation');
       pMenu.add(plane.rotation, 'x', -10, 10);
       pMenu.add(plane.rotation, 'y', -10, 10);
       pMenu.add(plane.rotation, 'z', -10, 10);
       pMenu.open();
       
       var pPMenu = gui.addFolder('Plane Position');
       pPMenu.add(plane.position, 'x', -10, 10);
       pPMenu.add(plane.position, 'y', -10, 10);
       pPMenu.add(plane.position, 'z', -10, 10);
       pPMenu.open();

       var bMenu = gui.addFolder('Box Position');
       bMenu.add(box.position, 'x', -5, 5);
       bMenu.add(box.position, 'y', -5, 5);
       bMenu.add(box.position, 'z', -5, 5);

       var bScaleMenu = gui.addFolder('Box Scale');
       bScaleMenu.add(box.scale, 'x', -5, 5);
       bScaleMenu.add(box.scale, 'y', -5, 5);
       bScaleMenu.add(box.scale, 'z', -5, 5);


      


  
  
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
         renderer.setSize(window.innerWidth, window.innerHeight);
         
         document.getElementById('webgl').appendChild(renderer.domElement);

         //Creating Controls that allow the user to control the camera
         var controls = new THREE.OrbitControls(camera, renderer.domElement);
  
         /* Starting the actual Render.
         renderer.render(
             scene,
             camera
         )
         */   
  
         //Now with the update function we're just going to call it from here.
         update(renderer, scene, camera);
  
  
        
  
  
  
  
  
       //scene.add(box);
      
      
  
  
    
      //Here we return the scene obj, so now we can look up it's data in the console log.
      return scene;
  }
  
  
  function update(renderer, scene, camera){
  
      //Here we created an update function in order to animate our objects.
      renderer.render(
          scene,
          camera
      )
  
  
      
      //creating a var that is linked to the plane we created
      //also calling it by using getObjectByName     
      var plane = scene.getObjectByName('plane-1');
      
      

      var box = scene.getObjectByName('box-1');
      box.rotation.y += 0.001;
      box.rotation.z += 0.01;
  
  
      /*
      scene.traverse(function(child) {
          child.scale.x += 0.001;
      })
      */
      
      requestAnimationFrame( function(){
          update(renderer,scene,camera);
      })
  
  }
  
  function getBox(w, h, d){
      var geometry = new THREE.BoxGeometry(w, h, d);
      var material = new THREE.MeshBasicMaterial({
          color: 0x00ff00
      });
  
      var mesh = new THREE.Mesh(
          geometry,
          material
      );
  return mesh;
  
  }
  
  
  function getPlane(size){
      var geometry = new THREE.PlaneGeometry(size,size);
      var material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          side: THREE.DoubleSide
      });
  
      var mesh = new THREE.Mesh(
          geometry,
          material
      );
  
      
  return mesh;
  
  }
  
  var scene = start();
  
  
  