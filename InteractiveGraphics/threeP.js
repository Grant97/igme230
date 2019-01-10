
function start() {
  
  
  //Creating Scene and Camera 
    var scene = new THREE.Scene();

     //Calling the functions we created to generate the boxes and planes.
     var box = getBox(1, 1, 1);
     var plane = getPlane(4);
     


     
    //Establishing a name for the plane so that it will be easy to call
    plane.name = 'plane-1';
    
    /*Updating the box y so that box is moved to sit on top of the plane 
    since it starts directly in the center of the screen.*/
     box.position.y = box.geometry.parameters.height/2;

     //Rotating the plane so that it is flat on the ground
     plane.rotation.x = Math.PI/2;
     
     plane.position.y = 1;

     //Now Making the box a child of the plane object.
    plane.add(box);

    //Now we actually add the plane and box to the scene.
    scene.add(plane);
   
     


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
    //also calling it by using getObjectByName on it's parent 
    //the scene object.
    var plane = scene.getObjectByName('plane-1');
	plane.rotation.y += 0.001;
	plane.rotation.z += 0.001;


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


