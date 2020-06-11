// https://observablehq.com/d/ddc06ed79c678e27@1585
import define1 from "./e93997d5089d7165@2264.js";
import define2 from "./0c800138c487d3e1@860.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["export_EMSC.csv",new URL("./files/3e3082fe674033910b52b91a5ac5e2305c947647936d30e89852e106ad1c89126096f3078dd6789cf347bfe0dff44a1b465a382a8675e6d180d36761ab40ca32",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Earthquakes

Inspiration from the work of [Raluca Nicola](https://twitter.com/nicolaraluk/status/1190358428008534016)
 ___`
)});
  main.variable(observer("renderer")).define("renderer", ["THREE","width","height","camera","scene","animate","vertex","radius"], function*(THREE,width,height,camera,scene,animate,vertex,radius)
{  
  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 20;
  controls.maxDistance = 100000;
  controls.enablePan = false;
  
  // postprocessing

  const composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( scene, camera ) );

  const glitchPass = new THREE.GlitchPass();
  
  const params = {
    exposure: 1,
    bloomStrength: 1,
    bloomThreshold: 0.1,
    bloomRadius: 0
  };
  
  let bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( width, height ), 1.5, 0.4, 0.85 );
	bloomPass.threshold = params.bloomThreshold;
	bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;
  
  composer.addPass( glitchPass );
  composer.addPass( bloomPass )
  
  while (true) {
     animate()
  
     const t = Date.now();
     const {x, y, z} = vertex([t / 100, Math.sin(t / 5000) * 45], radius * 3);
     camera.position.x = x;
     camera.position.y = y;
     camera.position.z = z;
     camera.lookAt(scene.position);
     
     composer.render();
     yield composer.renderer.domElement
  }
}
);
  main.variable(observer("viewof scaleFactor")).define("viewof scaleFactor", ["slider","width"], function(slider,width){return(
slider({
  min: 0.1, 
  max: 10, 
  step: 0.1, 
  value: width*0.004, 
  format: v => `Scale Factor ${v}`,
})
)});
  main.variable(observer("scaleFactor")).define("scaleFactor", ["Generators", "viewof scaleFactor"], (G, _) => G.input(_));
  main.variable(observer("viewof shaking")).define("viewof shaking", ["slider"], function(slider){return(
slider({
  min: 0, 
  max: 2, 
  step: 0.01, 
  value: 0.1, 
  format: v => `Shaking ${v}`,
})
)});
  main.variable(observer("shaking")).define("shaking", ["Generators", "viewof shaking"], (G, _) => G.input(_));
  main.variable(observer("viewof timeWindow")).define("viewof timeWindow", ["slider"], function(slider){return(
slider({
  min: 0, 
  max: 1, 
  step: 0.01, 
  value: 0.1, 
  format: v => `Time Window ${v}`,
})
)});
  main.variable(observer("timeWindow")).define("timeWindow", ["Generators", "viewof timeWindow"], (G, _) => G.input(_));
  main.variable(observer("viewof colorScheme")).define("viewof colorScheme", ["html","colorSchemes"], function(html,colorSchemes){return(
html`<select>
  ${colorSchemes.map(n => `<option value=${n} ${n === 'Plasma' ? 'selected' : '' }>${n}</option>`)}
</select>`
)});
  main.variable(observer("colorScheme")).define("colorScheme", ["Generators", "viewof colorScheme"], (G, _) => G.input(_));
  main.variable(observer("animate")).define("animate", ["particleSystem","speed"], function(particleSystem,speed){return(
function animate() {
  const progress = particleSystem.material.uniforms.progress.value;
  particleSystem.material.uniforms.progress.value = progress + speed;
}
)});
  main.variable(observer("particleSystem")).define("particleSystem", ["THREE","d3","earthquakes","radius","colorScheme","vertex","scaleFactor","vertexShader","fragmentShader"], function(THREE,d3,earthquakes,radius,colorScheme,vertex,scaleFactor,vertexShader,fragmentShader)
{
        const geometry = new THREE.BufferGeometry();
        const positions = []; 
        const atDepth = [];
        const colors = [];
        const sizes = [];
        const time = [];
        let color = new THREE.Color(0xffffff);

        const depthScale = d3.scaleLinear()
          .domain(d3.extent(earthquakes, d => d.depth))
          .range([radius, radius * 0.3])
        
        const colorScale = d3.scaleSequential(d3[`interpolate${colorScheme}`])
          .domain(d3.extent(earthquakes, d => d.depth))
        
        const sizeScale = d3.scaleSqrt()
          .domain(d3.extent(earthquakes, d => d.magnitude))
          .range([1, 10])
        
        const timeScale = d3.scaleLinear()
          .domain(d3.extent(earthquakes, d => d.date))
          .range([0, 1])
  
        earthquakes.forEach(d => {
          const pos = vertex([d.longitude, d.latitude], radius);
          const atDepthPos = vertex([d.longitude, d.latitude], depthScale(d.depth));
          
          positions.push(pos.x, pos.y, pos.z);
          atDepth.push(atDepthPos.x, atDepthPos.y, atDepthPos.z);
          color = color.setStyle(colorScale(d.depth));
          colors.push(color.r, color.g, color.b);
          sizes.push(sizeScale(d.magnitude) * scaleFactor); 
          time.push(timeScale(d.date))
        });

        geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('atDepth', new THREE.Float32BufferAttribute(atDepth, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('time', new THREE.Float32BufferAttribute(time, 1))
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1)
          .setUsage(THREE.DynamicDrawUsage));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            progress: { value: 0 },
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          transparent: true,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          opacity: 0.9,
        });

        const particleSystem = new THREE.Points(geometry, material);
        return particleSystem;
}
);
  main.variable(observer("vertexShader")).define("vertexShader", ["timeWindow","shaking","speed"], function(timeWindow,shaking,speed){return(
`
  attribute vec3 atDepth;
  attribute float size;
  attribute float time;
  varying vec3 vColor;
  uniform float progress;
  float timeWindow = ${timeWindow};

  // Simplex 2D noise
  //
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float random (float seed) {
    return fract(sin(seed)*100000.0);
  }

  float nearTime(float eventTime, float progress) {
    float distance = abs(eventTime - (progress - floor(progress)));
    if (distance <= timeWindow) {
      return cos((1.0 - (distance / timeWindow)) * 3.1415);
    }
    return 0.0;
  }

  void main() {
    vColor = color;
    float nearTime = nearTime(time, progress);
    gl_PointSize = max(size, size * nearTime);
    float noise = snoise(vec2(size, progress));

    float shakeStrength = float(${shaking});
    float xShake = snoise(vec2(progress * 0.1/${speed}, atDepth.x));
    float yShake = snoise(vec2(progress * 0.1/${speed}, atDepth.y));
    float zShake = snoise(vec2(progress * 0.1/${speed}, atDepth.z));
    vec3 shake = vec3(xShake, yShake, zShake);
    vec3 newPosition = atDepth + shake * shakeStrength * nearTime;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition , 1.0);
  }
`
)});
  main.variable(observer("fragmentShader")).define("fragmentShader", function(){return(
`
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);  
  }
`
)});
  main.variable(observer("camera")).define("camera", ["width","height","THREE"], function(width,height,THREE)
{
  const fov = 45;
  const aspect = width/height;
  const near = 10;
  const far = 200000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 30)
  const pointLight = new THREE.PointLight( 0xffffff, 1 );
	camera.add( pointLight );
  return camera;
}
);
  main.variable(observer("scene")).define("scene", ["THREE","particleSystem","land"], function(THREE,particleSystem,land)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#000000');
  scene.add(particleSystem);
  scene.add(land);
  return scene
}
);
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("speed")).define("speed", function(){return(
0.001
)});
  main.variable(observer("radius")).define("radius", function(){return(
10
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Utils`
)});
  main.variable(observer("vertex")).define("vertex", ["THREE"], function(THREE){return(
function vertex([longitude, latitude], radius) {
  const lambda = longitude * Math.PI / 180;
  const phi = latitude * Math.PI / 180;
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.cos(lambda),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.sin(lambda)
  );
}
)});
  main.variable(observer("wireframe")).define("wireframe", ["THREE","vertex"], function(THREE,vertex){return(
function wireframe(multilinestring, radius, material) {
  const geometry = new THREE.Geometry();

  for (const P of multilinestring.coordinates) {
    for (let p0, p1 = vertex(P[0], radius), i = 1; i < P.length; ++i) {
      geometry.vertices.push(p0 = p1, p1 = vertex(P[i], radius));
    }
  }
  return new THREE.LineSegments(geometry, material);
}
)});
  main.variable(observer("colorSchemes")).define("colorSchemes", function(){return(
[
'BuGn',
'BuPu',
'GnBu',
'OrRd',
'PuBuGn',
'PuBu',
'PuRd',
'RdPu',
'YlGnBu',
'YlGn',
'YlOrBr',
'YlOrRd',
'Cividis',
'Viridis',
'Inferno',
'Magma',
'Plasma',
'Warm',
'Cool',
'CubehelixDefault',
'Turbo',
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Data

sources: [emsc-csem](https://www.emsc-csem.org/Earthquake/?filter=yes)
`
)});
  main.variable(observer("earthquakes")).define("earthquakes", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.dsvFormat(';').parse(await FileAttachment("export_EMSC.csv").text(), d3.autoType)
  .map( d => ({
  latitude: d.Latitude,
  longitude: d.Longitude,
  date: new Date(d.Date),
  magnitude: d.Magnitude,
  depth: d.Depth
}))
)});
  main.variable(observer("land")).define("land", ["topojson","wireframe","radius","THREE"], async function(topojson,wireframe,radius,THREE)
{
  const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-50m.json");
  const topology = await world.json();
  const mesh = topojson.mesh(topology, topology.objects.land);
  return wireframe(mesh, radius, new THREE.LineBasicMaterial({
    color: 0xffffff,
    opacity: 0.2,
  }));
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Dependencies & Data`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('https://d3js.org/d3.v5.min.js')
)});
  main.variable(observer("THREE")).define("THREE", ["require"], async function(require)
{
  const THREE = window.THREE = await require('three');
  await require('three/examples/js/controls/OrbitControls.js').catch(() => {});
  await require("three/examples/js/postprocessing/EffectComposer.js").catch(() => {});
  await require("three/examples/js/postprocessing/UnrealBloomPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/GlitchPass.js").catch(() => {});
  await require("three/examples/js/shaders/DigitalGlitch.js").catch(() => {});
  await require("three/examples/js/postprocessing/ShaderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/RenderPass.js").catch(() => {});
  await require("three/examples/js/controls/OrbitControls.js").catch(() => {});
  await require("three/examples/js/postprocessing/EffectComposer.js").catch(() => {});
  await require("three/examples/js/postprocessing/ShaderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/SSAARenderPass.js").catch(() => {});
  await require("three/examples/js/postprocessing/UnrealBloomPass.js").catch(() => {});
  await require("three/examples/js/shaders/LuminosityHighPassShader.js").catch(() => {});
  await require("three/examples/js/shaders/CopyShader.js").catch(() => {});
  return THREE;
}
);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("colorPicker", child2);
  return main;
}
