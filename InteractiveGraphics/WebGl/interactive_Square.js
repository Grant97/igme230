/* Needed to establish webgl context in order to the webgl code to function.
will run once the page is loaded*/

//function call
Main();


//Function info
function main(){
    //Set up variables for the HTMl canvas in order.
    var drawArea = document.querySelector('#drawArea');

    //Establish webgl Context for the rest of the content in the script.
    var gl = drawArea.getContext('webgl');

    if(!gl){
        alert('Your browser is not compatable with webGl');
    }


//Now we have to establish the data for the Vertex and Fragment shaders

// Here is the Vertex shader program. 
/* This contains the position data for the elements in the canvas space

*/

  const vertexShader = `
  attribute vec4 VertexPosition;
  attribute vec4 VertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = VertexColor;
  }
`;


//Now onto the fragment shader, this contains all of the color information for
//every pixel.


const fragmentSource = `
varying lowp vec4 vColor;

void main(void) {
  gl_FragColor = vColor;
}
`;

const sProgram = initShaderProgram(gl, vertexSource, fragmentSource)

const programInfo = {
    program: sProgram,
    attribLocations: {
        VertexPosition: gl.getUniformLocation(sProgram, 'VertexPosition'),
        vertexColor: gl.getAttribLocation(sProgram, 'VertexColor'),
    },
    uniformLocations: {
        projectionMatrix: gl.getUniformLocation(sProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(sProgram, 'uModelViewMatrix')
    }
}


}