/**
 * Created by garricxiang on 2017/5/9.
 */

var learnWebGL;
(function (learnWebGL) {
    var canvas;
    var gl; /* WebGLRenderingContext */
    var gl2; /* WebGL2RenderingContext */

    var vertexShaderSource;
    var fragmentShaderSource;
    var vertices;
    var vbo;
    var vao;
    var shaderProgram;

    function init() {
        canvas = document.getElementById('canvas');
        gl = checkWebGLSupport();
        if (!gl) {
            return;
        }

        //
        vertexShaderSource = "#version 300 es\n" +
            "in vec3 aVertexPosition;\n" +
            "void main() {\n" +
            "   gl_Position = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z, 1.0);\n" +
            "}";

        fragmentShaderSource =  "#version 300 es\n" +
            "precision lowp float;\n" +
            "out vec4 color;\n" +
            "void main() {\n" +
            "color = vec4(1.0, 0.5, 0.2, 1.0);\n" +
            "}";

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        var shaderStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
        if (shaderStatus != true) {
            var statusInfo = gl.getShaderInfoLog(vertexShader);
            alert("vertex shader compile error: " + shaderStatus + " -> " + statusInfo);
            return;
        }
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragmentShaderSource);
        gl.compileShader(fragShader);
        shaderStatus = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);
        if (shaderStatus != true) {
            var statusInfo = gl.getShaderInfoLog(fragShader, gl.COMPILE_STATUS);
            alert("fragment shader compile error: " + shaderStatus + " -> " + statusInfo);
            return;
        }
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        var programStatus = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
        if (programStatus != true) {
            statusInfo = gl.getProgramInfoLog(shaderProgram);
            alert("shader program link error: " + programStatus + " -> " + statusInfo);
            return;
        }
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragShader);

        // Set up vertex data (and buffer(s)) and attribute pointers
        vertices = new Float32Array([
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            0.0, 0.5, 0.0
        ]);

        vao = gl.createVertexArray();
        vbo = gl.createBuffer();
        // Bind the Vertex Array Object first, then bind and set vertex buffer(s) and attribute pointer(s).
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        // ref https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Float32Array
        //gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW, 0, vertices.BYTES_PER_ELEMENT * vertices.length);     //void bufferData(GLenum target, [AllowShared] ArrayBufferView srcData, GLenum usage, GLuint srcOffset, optional GLuint length = 0);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW, 0, 0);
        // vertexAttribIPointer(GLuint index, GLint size, GLenum type, GLsizei stride, GLintptr offset)
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * 4, 0);
        //gl.vertexAttribIPointer(0, 1, gl.FLOAT_VEC3, 12, 0);
        gl.enableVertexAttribArray(0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);

        sys.$ticker.startTick(render, this);
        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render() {
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw our first triangle
        gl.useProgram(shaderProgram);
        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.bindVertexArray(null);
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
        var contextType = ['webgl2', 'experimental-webgl2']; // ["webgl", "experimental-webgl"];
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
            canvasNotSupport.innerHTML = 'WebGL2 is disabled or forbidden by your browser!'
            canvas.style.display = 'none';
            return;
        }

        return context;
    }

    learnWebGL.init = init;
})(learnWebGL || (learnWebGL = {}));