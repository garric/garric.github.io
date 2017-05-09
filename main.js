/**
 * Created by garricxiang on 2017/5/8.
 */
var canvas;
var gl; /* WebGLRenderingContext */
var gl2; /* WebGL2RenderingContext */

function run() {
    canvas = document.getElementById('canvas');
    gl = checkWebGLSupport();
    if (!gl) {
        return;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function checkWebGLSupport() {
     if (!window.WebGLRenderingContext) {
         var canvasNotSupport = document.getElementById('canvasNotSupport');
         canvasNotSupport.style.display = 'block';
         canvasNotSupport.innerHTML = 'WebGL is not supported by your browser!'
         canvas.style.display = 'none';
         return;
     }

     var context = null;
     var contextType = ["webgl", "experimental-webgl"];
     var contextAttributes = {   antialias: true,
                                 stencil: true
                            };
     for (var i = 0; i < contextType.length; i++) {
         context = canvas.getContext(contextType[i], contextAttributes);
         if (context) {
               break;
         }
     }
     if (!context) {
         var canvasNotSupport = document.getElementById('canvasNotSupport');
         canvasNotSupport.style.display = 'block';
         canvasNotSupport.innerHTML = 'WebGL is disabled or forbidden by your browser!'
         canvas.style.display = 'none';
         return;
     }

     return context;
}
