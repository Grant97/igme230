
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
     var box = getBox(1, 1, 1);
     var plane = getPlane(20);
     var sphere = getSphere(0.05);

     //Calling the box name just cuz.
     box.name = 'box-1';



     //Calling Point Light
     var pointLight = getPointLight(1);
     //Probably should give items names, makes it easy to call on them in other functions.
     pointLight.name = 'pointLight-1'
     

    //Establishing a name for the plane so that it will be easy to call
    plane.name = 'plane-1';
    
    /*Updating the box y so that box is moved to sit on top of the plane 
    since it starts directly in the center of the screen.*/
     box.position.y = box.geometry.parameters.height/2;

     //Rotating the plane so that it is flat on the ground
     plane.rotation.x = Math.PI/2;
     
     plane.position.y = 0;

     /* Setting Point Light Position so that it's
     not in the origin. (P.S. Make sure to make these
        position changes before you add them to the scene
        or else it won't run. */
    pointLight.position.y = 2;

    //Setting pointLight intensity to be bright so we can see when it changes.
    pointLight.intensity = 2;


    //Here is the code that adds the GUI controls in the canvas
    // Parameters are what want to control, it's parameters, min value, max value 
    gui.add(pointLight, 'intensity', 0, 10);

    gui.add(pointLight.position, 'y', 0, 5);

     //Now Making the box a child of the plane object.
    scene.add(box);

    //Now we actually add the plane and box to the scene.
    scene.add(plane);
   
    //Now actually adding the point light
    scene.add(pointLight);

    //Adding Sphere inside the pointLight, this is so we can visualize where the pointLight is.
    pointLight.add(sphere);
     


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

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
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


