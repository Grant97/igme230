var vShaderData = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
' gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

var fShaderText = 
[
'precision mediump float;',
'',
'void main()',
'{',
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');




var createCanvas = function(){
    console.log('This is working.');
    var canvas = document.querySelector('#drawArea');
    var gl = canvas.getContext('webgl');

    if(!gl){
        console.log('Webgl not supported, using experimental webgl on microsoft edge browser.');

        gl.canvas.getContext('experimental-webgl');
    }

    if(!gl){
        alert('Your Browser does not support Webgl.');
    }

 gl.clearColor(0.6, 0.5, 0.3, 1.0);
 gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

//Create Shaders 

 var vShader = gl.createShader(gl.VERTEX_SHADER);
 var fShader = gl.createShader(gl.FRAGMENT_SHADER);


 gl.shaderSource(vShader, vShaderData);
 gl.shaderSource(fShader, fShaderText);

gl.compileShader(vShader);
if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vShader));
    return;
}

gl.compileShader(fShader);
if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
    console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(fShader));
    return;
}


var program = gl.createProgram();
gl.attachShader(program, vShader);
gl.attachShader(program, fShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {

    console.error('ERROR compiling Linking program', gl.getProgramInfoLog(program));
}

gl.validateProgram(program);
if(!gl.getProgramParamater(program, gl.VALIDATE_STATUS)){
    console.error('ERROR Validating program!', gl.getProgramInfoLog(program));
}




};



