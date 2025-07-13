/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useRef } from 'react';

class Pointer {
  id: number = -1;
  texcoordX: number = 0;
  texcoordY: number = 0;
  prevTexcoordX: number = 0;
  prevTexcoordY: number = 0;
  deltaX: number = 0;
  deltaY: number = 0;
  down: boolean = false;
  moved: boolean = false;
  color: {r:number;g:number;b:number;} = {r:0,g:0,b:0};
}

type GLContext = WebGL2RenderingContext ;



function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;


    const config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    const pointers = [new Pointer()];

    const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas:HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl = canvas.getContext('webgl2', params) as GLContext | null;
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          (canvas.getContext('webgl', params) as GLContext ||
          canvas.getContext('experimental-webgl', params));

      let halfFloat;
      let supportLinearFiltering;
      if (isWebGL2) {
        (gl as GLContext).getExtension('EXT_color_buffer_float');
        supportLinearFiltering = (gl as GLContext).getExtension('OES_texture_float_linear');
      } else {
        halfFloat = (gl as GLContext).getExtension('OES_texture_half_float');
        supportLinearFiltering = (gl as GLContext).getExtension('OES_texture_half_float_linear');
      }
      (gl as GLContext)?.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2
        ? (gl as GLContext)?.HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES;
      let formatRGBA;
      let formatRG;
      let formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as GLContext)?.RGBA16F, (gl as GLContext)?.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as GLContext)?.RG16F, (gl as GLContext)?.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as GLContext)?.R16F, (gl as GLContext)?.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, (gl as GLContext)?.RGBA, (gl as GLContext)?.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as GLContext)?.RGBA, (gl as GLContext)?.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as GLContext)?.RGBA, (gl as GLContext)?.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl: GLContext | null, internalFormat: number, format: number, type: number | null | undefined) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case (gl as GLContext)?.R16F:
            return getSupportedFormat(gl, (gl as GLContext)?.RG16F, (gl as GLContext)?.RG, type);
          case (gl as GLContext)?.RG16F:
            return getSupportedFormat(gl, (gl as GLContext)?.RGBA16F, (gl as GLContext)?.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(gl: GLContext | null, internalFormat: number, format: number, type: number | null | undefined) {
      const texture = (gl as GLContext)?.createTexture();
      (gl as GLContext)?.bindTexture((gl as GLContext)?.TEXTURE_2D, texture);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_MIN_FILTER, (gl as GLContext)?.NEAREST);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_MAG_FILTER, (gl as GLContext)?.NEAREST);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_WRAP_S, (gl as GLContext)?.CLAMP_TO_EDGE);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_WRAP_T, (gl as GLContext)?.CLAMP_TO_EDGE);
      (gl as GLContext)?.texImage2D((gl as GLContext)?.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type as number, null);
      const fbo = (gl as GLContext)?.createFramebuffer();
      (gl as GLContext)?.bindFramebuffer((gl as GLContext)?.FRAMEBUFFER, fbo);
      (gl as GLContext)?.framebufferTexture2D(
        (gl as GLContext)?.FRAMEBUFFER,
        (gl as GLContext)?.COLOR_ATTACHMENT0,
        (gl as GLContext)?.TEXTURE_2D,
        texture,
        0
      );
      const status = (gl as GLContext)?.checkFramebufferStatus((gl as GLContext)?.FRAMEBUFFER);
      return status === (gl as GLContext)?.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: { [key: number]: WebGLProgram };
      activeProgram: WebGLProgram | null;
      uniforms: { [key: string]: WebGLUniformLocation | null };
    
      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = {};
        this.activeProgram = null;
        this.uniforms = {};
      }
    
      setKeywords(keywords: string[]) {
        const hash = keywords.reduce((acc, kw) => acc + this.hashCode(kw), 0);
    
        let program = this.programs[hash];
        if (!program) {
          const fragmentShader = compileShader(
            (gl as GLContext).FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }
    
        if (program === this.activeProgram) return;
    
        this.uniforms = getUniforms(gl as WebGL2RenderingContext,program);
        this.activeProgram = program;
      }
    
      bind() {
        (gl as GLContext).useProgram(this.activeProgram);
      }
    
      private hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash |= 0;
        }
        return hash;
      }
    }
    
    

    class Program {
      program: WebGLProgram;
      uniforms: { [key: string]: WebGLUniformLocation | null };
    
      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        if (!vertexShader || !fragmentShader) {
          throw new Error("Shader(s) missing during program creation");
        }
    
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(gl as WebGL2RenderingContext,this.program);
      }
    
      bind() {
        (gl as GLContext).useProgram(this.program);
      }
    }
    

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader | null): WebGLProgram {
      const program = (gl as GLContext).createProgram();
      if (!program) throw new Error("Failed to create WebGLProgram");
    
      (gl as GLContext).attachShader(program, vertexShader);
      (gl as GLContext).attachShader(program, fragmentShader as WebGLShader);
      (gl as GLContext).linkProgram(program);
    
      if (!(gl as GLContext).getProgramParameter(program, (gl as GLContext).LINK_STATUS)) {
        const info = (gl as GLContext).getProgramInfoLog(program);
        (gl as GLContext).deleteProgram(program);
        throw new Error("Failed to link program: " + info);
      }
    
      return program;
    }
    

    function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram): { [key: string]: WebGLUniformLocation | null } {
      const uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const info = gl.getActiveUniform(program, i);
        if (!info) continue;
        uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return uniforms;
    }
    
    

    function compileShader(type: number, source: string, keywords: string[] | null | undefined = null) {
      source = addKeywords(source, keywords);
      const shader = (gl as GLContext)?.createShader(type) as WebGLShader;
      (gl as GLContext)?.shaderSource(shader, source);
      (gl as GLContext)?.compileShader(shader);
      if (!(gl as GLContext)?.getShaderParameter(shader, (gl as GLContext)?.COMPILE_STATUS))
        console.trace((gl as GLContext)?.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source: string, keywords: string[] | null | undefined) {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach((keyword) => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      (gl as GLContext)?.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `,null
    );

    const copyShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `,null
    );

    const clearShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `,null
    );

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `;

    const splatShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `,null
    );

    const advectionShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    );

    const divergenceShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,null
    );

    const curlShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `
    );

    const vorticityShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const pressureShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `
    );

    const gradientSubtractShader = compileShader(
      (gl as GLContext)?.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `
    );

    const blit = (() => {
      (gl as GLContext)?.bindBuffer((gl as GLContext)?.ARRAY_BUFFER, (gl as GLContext)?.createBuffer());
      (gl as GLContext)?.bufferData(
        (gl as GLContext)?.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        (gl as GLContext)?.STATIC_DRAW
      );
      (gl as GLContext)?.bindBuffer((gl as GLContext)?.ELEMENT_ARRAY_BUFFER, (gl as GLContext)?.createBuffer());
      (gl as GLContext)?.bufferData(
        (gl as GLContext)?.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        (gl as GLContext)?.STATIC_DRAW
      );
      (gl as GLContext)?.vertexAttribPointer(0, 2, (gl as GLContext)?.FLOAT, false, 0, 0);
      (gl as GLContext)?.enableVertexAttribArray(0);
      return (target: { width: number; height: number; fbo: number; } | null, clear = false) => {
        if (target == null) {
          (gl as GLContext)?.viewport(0, 0, (gl as GLContext)?.drawingBufferWidth, (gl as GLContext)?.drawingBufferHeight);
          (gl as GLContext)?.bindFramebuffer((gl as GLContext)?.FRAMEBUFFER, null);
        } else {
          (gl as GLContext)?.viewport(0, 0, target.width, target.height);
          (gl as GLContext)?.bindFramebuffer((gl as GLContext)?.FRAMEBUFFER, target.fbo);
        }
        if (clear) {
          (gl as GLContext)?.clearColor(0.0, 0.0, 0.0, 1.0);
          (gl as GLContext)?.clear((gl as GLContext)?.COLOR_BUFFER_BIT);
        }
        (gl as GLContext)?.drawElements((gl as GLContext)?.TRIANGLES, 6, (gl as GLContext)?.UNSIGNED_SHORT, 0);
      };
    })();
    
    type FBO = {
      texture: any;
      fbo: any;
      width: any;
      height: any;
      texelSizeX: number;
      texelSizeY: number;
      attach: (id: any) => any;
    };
    
    type DoubleFBO = {
      width: any;
      height: any;
      texelSizeX: number;
      texelSizeY: number;
      read: FBO;
      write: FBO;
      swap?: () => void;
    };
    

    let dye:DoubleFBO, velocity:DoubleFBO, divergence:FBO, curl:FBO, pressure:DoubleFBO;

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradientSubtract = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function initFrameBuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? (gl as GLContext)?.LINEAR : (gl as GLContext)?.NEAREST;
      (gl as GLContext)?.disable((gl as GLContext)?.BLEND);

      if (!dye)
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba?.internalFormat,
          rgba?.format,
          texType,
          filtering
        );
      else
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba?.internalFormat,
          rgba?.format,
          texType,
          filtering
        );

      if (!velocity)
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg?.internalFormat,
          rg?.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg?.internalFormat,
          rg?.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simRes.width,
        simRes.height,
        r?.internalFormat,
        r?.format,
        texType,
        (gl as GLContext)?.NEAREST
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        r?.internalFormat,
        r?.format,
        texType,
        (gl as GLContext)?.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r?.internalFormat,
        r?.format,
        texType,
        (gl as GLContext)?.NEAREST
      );
    }

    function createFBO(w: number, h: number, internalFormat: number | undefined, format: number | undefined, type: any, param: any) {
      (gl as GLContext)?.activeTexture((gl as GLContext)?.TEXTURE0);
      const texture = (gl as GLContext)?.createTexture();
      (gl as GLContext)?.bindTexture((gl as GLContext)?.TEXTURE_2D, texture);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_MIN_FILTER, param);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_MAG_FILTER, param);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_WRAP_S, (gl as GLContext)?.CLAMP_TO_EDGE);
      (gl as GLContext)?.texParameteri((gl as GLContext)?.TEXTURE_2D, (gl as GLContext)?.TEXTURE_WRAP_T, (gl as GLContext)?.CLAMP_TO_EDGE);
      (gl as GLContext)?.texImage2D((gl as GLContext)?.TEXTURE_2D, 0, internalFormat as number, w, h, 0, format as number, type, null);

      const fbo = (gl as GLContext)?.createFramebuffer();
      (gl as GLContext)?.bindFramebuffer((gl as GLContext)?.FRAMEBUFFER, fbo);
      (gl as GLContext)?.framebufferTexture2D(
        (gl as GLContext)?.FRAMEBUFFER,
        (gl as GLContext)?.COLOR_ATTACHMENT0,
        (gl as GLContext)?.TEXTURE_2D,
        texture,
        0
      );
      (gl as GLContext)?.viewport(0, 0, w, h);
      (gl as GLContext)?.clear((gl as GLContext)?.COLOR_BUFFER_BIT);

      const texelSizeX = 1.0 / w;
      const texelSizeY = 1.0 / h;
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: any) {
          (gl as GLContext)?.activeTexture((gl as GLContext)?.TEXTURE0 + id);
          (gl as GLContext)?.bindTexture((gl as GLContext)?.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number | undefined, format: number | undefined, type: any, param: any) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          const temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(target: { attach: (arg0: number) => any; }, w: number, h: number, internalFormat: number | undefined, format: number | undefined, type: any, param: any) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      (gl as GLContext)?.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO as FBO);
      return newFBO;
    }

    function resizeDoubleFBO(target: { width: any; height: any; texelSizeX: any; texelSizeY: any; read: any; write: any; swap?: () => void; }, w: number, h: number, internalFormat: number | undefined, format: number | undefined, type: any, param: any) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function updateKeywords() {
      const displayKeywords = [];
      if (config.SHADING) displayKeywords.push('SHADING');
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFrameBuffers();
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFrameBuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      requestAnimationFrame(updateFrame);
    }

    function calcDeltaTime() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      if(!canvas) return false;
      const width = scaleByPixelRatio((canvas as HTMLCanvasElement).clientWidth);
      const height = scaleByPixelRatio((canvas as HTMLCanvasElement).clientHeight);
      if ((canvas as HTMLCanvasElement).width !== width || (canvas as HTMLCanvasElement).height !== height) {
        (canvas as HTMLCanvasElement).width = width;
        (canvas as HTMLCanvasElement).height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt:number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor() as {r: number; g: number; b: number; a: number;};
        });
      }
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt:number) {
      (gl as GLContext)?.disable((gl as GLContext)?.BLEND);
      curlProgram.bind();
      (gl as GLContext)?.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      (gl as GLContext)?.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      (gl as GLContext)?.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      (gl as GLContext)?.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      (gl as GLContext)?.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      (gl as GLContext)?.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      (gl as GLContext)?.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      if(!velocity.swap) {
        throw new Error("Velocity double buffer swap function is not defined");
      }
      velocity.swap();
      divergenceProgram.bind();
      (gl as GLContext)?.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      (gl as GLContext)?.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      (gl as GLContext)?.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      (gl as GLContext)?.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write);
      if(!pressure.swap) {
        throw new Error("Pressure double buffer swap function is not defined");
      }
      pressure.swap();
      pressureProgram.bind();
      (gl as GLContext)?.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      (gl as GLContext)?.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        (gl as GLContext)?.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      gradientSubtract.bind();
      (gl as GLContext)?.uniform2f(
        gradientSubtract.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      (gl as GLContext)?.uniform1i(
        gradientSubtract.uniforms.uPressure,
        pressure.read.attach(0)
      );
      (gl as GLContext)?.uniform1i(
        gradientSubtract.uniforms.uVelocity,
        velocity.read.attach(1)
      );
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      (gl as GLContext)?.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering)
        (gl as GLContext)?.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      const velocityId = velocity.read.attach(0);
      (gl as GLContext)?.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      (gl as GLContext)?.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      (gl as GLContext)?.uniform1f(advectionProgram.uniforms.dt, dt);
      (gl as GLContext)?.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        (gl as GLContext)?.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY
        );
      (gl as GLContext)?.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      (gl as GLContext)?.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      (gl as GLContext)?.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      blit(dye.write);
      if(!dye.swap) {
        throw new Error("Dye double buffer swap function is not defined");
      }
      dye.swap();
    }

    function render(target:any) {
      (gl as GLContext)?.blendFunc((gl as GLContext)?.ONE, (gl as GLContext)?.ONE_MINUS_SRC_ALPHA);
      (gl as GLContext)?.enable((gl as GLContext)?.BLEND);
      drawDisplay(target);
    }

    function drawDisplay(target:any) {
      const width = target == null ? (gl as GLContext)?.drawingBufferWidth : target.width;
      const height = target == null ? (gl as GLContext)?.drawingBufferHeight : target.height;
      displayMaterial.bind();
      if (config.SHADING)
        (gl as GLContext)?.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
      (gl as GLContext)?.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      blit(target);
    }

    function splatPointer(pointer:Pointer) {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function clickSplat(pointer:Pointer) {
      const color = generateColor();
      if(!color.r || !color.g || !color.b) return;
      color.r *= 10.0;
      color.g *= 10.0;
      color.b *= 10.0;
      const dx = 10 * (Math.random() - 0.5);
      const dy = 30 * (Math.random() - 0.5);
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: { r: any; g: any; b: any; }) {
      if(!canvas) return;
      splatProgram.bind();
      (gl as GLContext)?.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      (gl as GLContext)?.uniform1f(
        splatProgram.uniforms.aspectRatio,
        (canvas as HTMLCanvasElement).width / (canvas as HTMLCanvasElement).height
      );
      (gl as GLContext)?.uniform2f(splatProgram.uniforms.point, x, y);
      (gl as GLContext)?.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      (gl as GLContext)?.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100.0)
      );
      blit(velocity.write);
      if(!velocity.swap) {
        throw new Error("Velocity double buffer swap function is not defined");
      }
      velocity.swap();

      (gl as GLContext)?.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      (gl as GLContext)?.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye.write);
      if(!dye.swap) {
        throw new Error("Dye double buffer swap function is not defined");
      }
      dye.swap();
    }

    function correctRadius(radius: number) {
      if(!canvas) return radius;
      const aspectRatio = (canvas as HTMLCanvasElement).width / (canvas as HTMLCanvasElement).height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
      if (!canvas) return;
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / (canvas as HTMLCanvasElement).width;
      pointer.texcoordY = 1.0 - posY / (canvas as HTMLCanvasElement).height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor() as { r: number; g: number; b: number; a: number; };
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number, color: { r: any; g: any; b: any; }) {
      if (!canvas) return;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / (canvas as HTMLCanvasElement).width;
      pointer.texcoordY = 1.0 - posY / (canvas as HTMLCanvasElement).height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    }

    function updatePointerUpData(pointer:Pointer) {
      pointer.down = false;
    }

    function correctDeltaX(delta: number) {
      if(!canvas) return delta;
      const aspectRatio = (canvas as HTMLCanvasElement).width / (canvas as HTMLCanvasElement).height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      if(!canvas) return delta;
      const aspectRatio = (canvas as HTMLCanvasElement).width / (canvas as HTMLCanvasElement).height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function generateColor() {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      if(c.r&&c.g&&c.b) {

      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;}
      return c;
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r, g, b;
      
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          break;
      }
      return { r, g, b };
    }

    function wrap(value: number, min: number, max: number) {
      const range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function getResolution(resolution: number) {
      let aspectRatio = (gl as GLContext)?.drawingBufferWidth / (gl as GLContext)?.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      if ((gl as GLContext)?.drawingBufferWidth > (gl as GLContext)?.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function scaleByPixelRatio(input: number) {
      const pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }


    window.addEventListener('mousedown', (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY);
      clickSplat(pointer);
    });

    document.body.addEventListener('mousemove', function handleFirstMouseMove(e) {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = generateColor();
      updateFrame();
      updatePointerMoveData(pointer, posX, posY, color);
      document.body.removeEventListener('mousemove', handleFirstMouseMove);
    });

    window.addEventListener('mousemove', (e) => {
      const pointer = pointers[0];
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      const color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color);
    });

    document.body.addEventListener('touchstart', function handleFirstTouchStart(e) {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updateFrame();
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
      document.body.removeEventListener('touchstart', handleFirstTouchStart);
    });

    window.addEventListener('touchstart', (e) => {
      const touches = e.targetTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        const posX = scaleByPixelRatio(touches[i].clientX);
        const posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY);
      }
    });

    window.addEventListener(
      'touchmove',
      (e) => {
        const touches = e.targetTouches;
        const pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          const posX = scaleByPixelRatio(touches[i].clientX);
          const posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerMoveData(pointer, posX, posY, pointer.color);
        }
      },
      false
    );

    window.addEventListener('touchend', (e) => {
      const touches = e.changedTouches;
      const pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

    updateFrame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 10,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <canvas
        ref={canvasRef}
        id="fluid"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;
