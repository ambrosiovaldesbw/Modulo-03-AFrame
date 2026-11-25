"use strict";

window.FormationScenes = (() => {
  const TAU = Math.PI * 2;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const ramp = (start, end, value) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const mix = (from, to, t) => from + (to - from) * t;
  function randomFrom(initial) {
    let seed = initial;
    return () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
  }

  const fogNoise = [
    "float hash3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);}",
    "float noise3(vec3 p){vec3 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);",
    "return mix(mix(mix(hash3(i), hash3(i+vec3(1,0,0)), f.x), mix(hash3(i+vec3(0,1,0)), hash3(i+vec3(1,1,0)), f.x), f.y),",
    "mix(mix(hash3(i+vec3(0,0,1)), hash3(i+vec3(1,0,1)), f.x), mix(hash3(i+vec3(0,1,1)), hash3(i+vec3(1,1,1)), f.x), f.y), f.z);}",
    "float folds(vec3 p){return .55*noise3(p)+.27*noise3(p*2.1)+.126*noise3(p*4.4)+.054*noise3(p*9.1);}",
  ].join("\n");

  function makeSky(THREE, root) {
    const sky = new THREE.Mesh(new THREE.SphereGeometry(164, 42, 32), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { tint:{value:new THREE.Color("#6e568f")} },
      vertexShader:[
        "varying vec3 direction;",
        "void main(){direction=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
      ].join("\n"),
      fragmentShader:[
        "varying vec3 direction; uniform vec3 tint;",
        fogNoise,
        "void main(){",
        "vec3 d=normalize(direction); float h=d.y+.24*d.x+.12*sin(4.0*d.x+d.z);",
        "float lane=exp(-12.0*h*h); vec3 q=d*4.6+vec3(6.9,2.7,7.5);",
        "float cloud=folds(q+folds(q*1.1)); float curl=folds(q*2.0+vec3(1.2,5.4,3.2));",
        "float veins=smoothstep(.30,.82,cloud)*(.27+.73*curl)*lane;",
        "float shadow=1.0-smoothstep(.60,.82,folds(q*1.4));",
        "vec3 sky=vec3(.004,.0047,.011)+tint*veins*.20*shadow;",
        "sky+=vec3(.035,.016,.055)*smoothstep(.46,.8,cloud)*(.45+.55*lane);",
        "gl_FragColor=vec4(sky,1.0);",
        "#include <colorspace_fragment>",
        "}",
      ].join("\n"),
    }));
    sky.renderOrder = -10;
    root.add(sky);

    const stars = dotField(THREE, root, 2800, 12, ["#8ba5e8","#dcd9f7","#ffcca8","#a79be9"], { strength:.78, fadeDistance:false });
    stars.update((sample) => {
      const y = sample.b * 2 - 1;
      const distance = mix(113, 156, sample.d);
      const r = Math.sqrt(1-y*y) * distance;
      const angle = sample.a * TAU;
      return [r*Math.cos(angle), y*distance, r*Math.sin(angle)];
    }, (sample) => .52+sample.c**6*3.5);
    stars.points.renderOrder = -8;
    const hues = ["#705a9e","#80558b","#915573","#5e68a0","#80546d","#755283","#5f6089"];
    return (index) => sky.material.uniforms.tint.value.set(hues[index]);
  }

  function dotField(THREE, root, count, seed, palette, {strength=1,fadeDistance=true}={}) {
    const random = randomFrom(seed);
    const positions = new Float32Array(count*3);
    const colors = new Float32Array(count*3);
    const radii = new Float32Array(count);
    const phase = new Float32Array(count);
    const tints = palette.map((value)=>new THREE.Color(value));
    const samples = Array.from({length:count},(_,i)=>{
      const [a,b,c,d,e,f]=Array.from({length:6},random);
      const tone=tints[Math.floor(e*tints.length)];
      colors.set([tone.r,tone.g,tone.b],i*3);
      radii[i] = 1 + c**3*3.8;
      phase[i]=d;
      return {a,b,c,d,e,f};
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute("hue", new THREE.BufferAttribute(colors,3));
    geometry.setAttribute("radius", new THREE.BufferAttribute(radii,1));
    geometry.setAttribute("phase", new THREE.BufferAttribute(phase,1));
    const material = new THREE.ShaderMaterial({
      transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
      uniforms:{ strength:{value:strength}, time:{value:0}, attenuate:{value:fadeDistance?1:0} },
      vertexShader:[
        "attribute vec3 hue; attribute float radius; attribute float phase;",
        "uniform float time; uniform float attenuate; varying vec3 tone; varying float alpha;",
        "void main(){vec4 view=modelViewMatrix*vec4(position,1.0);",
        "float shrink=mix(1.0,23.0/max(-view.z,3.0),attenuate);",
        "gl_PointSize=clamp(radius*shrink,.9,72.0);",
        "tone=hue; alpha=(.44+.56*phase)*(.89+.11*sin(time+phase*34.0));",
        "gl_Position=projectionMatrix*view;}",
      ].join("\n"),
      fragmentShader:[
        "varying vec3 tone; varying float alpha; uniform float strength;",
        "void main(){float r=length(gl_PointCoord-.5)*2.0;",
        "float a=exp(-4.8*r*r)*(1.0-smoothstep(.40,1.0,r));",
        "gl_FragColor=vec4(tone,alpha*a*strength);",
        "#include <colorspace_fragment>",
        "}",
      ].join("\n"),
    });
    const points = new THREE.Points(geometry,material);
    points.frustumCulled = false;
    root.add(points);
    function update(map, resize) {
      for(const [i,sample] of samples.entries()) {
        const position = map(sample,i);
        positions.set(position,i*3);
        if (resize) radii[i]=resize(sample,i);
      }
      geometry.attributes.position.needsUpdate = true;
      if (resize) geometry.attributes.radius.needsUpdate = true;
    }
    return {
      points, update,
      light(value,time) { material.uniforms.strength.value=value; material.uniforms.time.value=time; },
    };
  }

  function radianceMap(THREE) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const pen = canvas.getContext("2d");
    const field = pen.createRadialGradient(64,64,0,64,64,64);
    field.addColorStop(0,"rgba(255,255,255,1)");
    field.addColorStop(.19,"rgba(255,255,255,.48)");
    field.addColorStop(.39,"rgba(255,255,255,.16)");
    field.addColorStop(.71,"rgba(255,255,255,.035)");
    field.addColorStop(1,"rgba(255,255,255,0)");
    pen.fillStyle = field;
    pen.fillRect(0,0,128,128);
    return new THREE.CanvasTexture(canvas);
  }

  function world(THREE, root) {
    const skyTint = makeSky(THREE,root);
    const haloTexture = radianceMap(THREE);
    const chapters = new Map();
    let active;
    function aura(parent, shade, size) {
      const object = new THREE.Sprite(new THREE.SpriteMaterial({
        color:shade, map:haloTexture, blending:THREE.AdditiveBlending, transparent:true, depthWrite:false
      }));
      object.scale.set(size,size,1);
      // El destello decora el astro. El raycaster selecciona la geometría del cuerpo.
      object.raycast = () => {};
      object.renderOrder = 6;
      parent.add(object);
      return object;
    }
    function body(parent, radius, colors, heat) {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius,72,44),new THREE.ShaderMaterial({
        uniforms:{
          dark:{value:new THREE.Color(colors[0])}, mid:{value:new THREE.Color(colors[1])},
          bright:{value:new THREE.Color(colors[2])}, heat:{value:heat}, time:{value:0},
        },
        vertexShader:[
          "varying vec3 surface; varying vec3 normalView; varying vec3 viewPoint;",
          "void main(){surface=normalize(position); normalView=normalize(normalMatrix*normal);",
          "vec4 p=modelViewMatrix*vec4(position,1.0); viewPoint=normalize(-p.xyz); gl_Position=projectionMatrix*p;}",
        ].join("\n"),
        fragmentShader:[
          "varying vec3 surface; varying vec3 normalView; varying vec3 viewPoint;",
          "uniform vec3 dark; uniform vec3 mid; uniform vec3 bright; uniform float heat; uniform float time;",
          fogNoise,
          "void main(){",
          "vec3 p=surface*8.0; float eddy=folds(p+vec3(0.0,time*.08,0.0));",
          "float texture=folds(p+2.3*eddy); float l=dot(normalize(normalView),normalize(vec3(-.56,.62,.63)));",
          "float day=.18+.82*max(0.0,l); float limb=pow(1.0-max(0.0,dot(normalize(normalView),viewPoint)),3.0);",
          "vec3 rock=mix(dark,mid,smoothstep(.23,.68,texture))*day;",
          "float cracks=pow(max(0.0,1.0-abs(eddy-.53)*12.0),3.5)*smoothstep(.38,.68,texture);",
          "vec3 emission=mix(mid,bright,smoothstep(.26,.77,texture))*heat;",
          "vec3 color=rock+emission*(.60+1.65*cracks)+bright*(.29+.3*heat)*limb;",
          "gl_FragColor=vec4(color,1.0);",
          "#include <colorspace_fragment>",
          "}",
        ].join("\n"),
      }));
      parent.add(mesh);
      return mesh;
    }
    function disk(parent, radius, inner, palette) {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(radius*2,radius*2),new THREE.ShaderMaterial({
        side:THREE.DoubleSide, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
        uniforms:{
          inner:{value:inner/radius}, time:{value:0}, opacity:{value:1},
          hot:{value:new THREE.Color(palette[0])}, cold:{value:new THREE.Color(palette[1])},
        },
        vertexShader:[
          "varying vec2 uvPos; void main(){uvPos=uv*2.0-1.0; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        ].join("\n"),
        fragmentShader:[
          "varying vec2 uvPos; uniform float inner; uniform float time; uniform float opacity; uniform vec3 hot; uniform vec3 cold;",
          fogNoise,
          "void main(){",
          "float r=length(uvPos); float spin=atan(uvPos.y,uvPos.x)-time*.23/(.28+r);",
          "float pitch=spin+r*12.0; vec2 flow=vec2(cos(pitch),sin(pitch))*r;",
          "float grain=folds(vec3(flow*9.5,2.0));",
          "float belts=.24+.59*pow(.5+.5*sin(r*55.0+grain*5.0),2.5)+.26*pow(.5+.5*sin(r*118.0),5.0);",
          "float spiral=.60+.40*sin(pitch*3.0+grain*3.2);",
          "float edge=smoothstep(inner*.72,inner*1.5+.03,r)*(1.0-smoothstep(.56,1.0,r));",
          "float f=edge*belts*(.28+.72*grain)*(.32+.68*spiral);",
          "vec3 color=mix(hot,cold,smoothstep(.1,.86,r));",
          "gl_FragColor=vec4(color,f*opacity);",
          "#include <colorspace_fragment>",
          "}",
        ].join("\n"),
      }));
      mesh.rotation.x=-Math.PI/2;
      parent.add(mesh);
      return mesh;
    }
    function ellipse(parent, radius, color, opacity, flatten=1) {
      const vertices=[];
      for(let i=0;i<144;i++){
        const theta=i*TAU/144;
        vertices.push(new THREE.Vector3(radius*Math.cos(theta),0,radius*flatten*Math.sin(theta)));
      }
      const line=new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(vertices),
        new THREE.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));
      parent.add(line);
      return line;
    }

    const plasma = ["#5a1a28","#fa7440","#fff1ac"];
    const earthColors = ["#231623","#853928","#ffd08b"];
    const stone = ["#191928","#70616e","#c0a5a3"];

    function nebulosa(parent) {
      const dust = dotField(THREE,parent,5700,41,["#777dec","#c4a5ff","#5453b5","#ed99c4","#e4b9ef","#70a9dc"]);
      const glints = dotField(THREE,parent,530,81,["#9c73ea","#bb73c5","#777bce","#8b8fe1"]);
      const core = aura(parent,"#b191f0",15);
      const glow = aura(parent,"#ffbbcf",4);
      const knot = [1.6,.03,1.0];
      return {
        targets: [[0,0,0],knot],
        render(progress,time) {
          const pull = ramp(.04,.92,progress);
          const shape=(s,i)=>{
            const r=(3.2+s.a**.73*8.2)*mix(1.17,.44,pull);
            const arm=(i%5)*TAU/5;
            const angle=arm+s.a*4.1 + (s.b-.5)*mix(2.0,1.02,pull)+time*(.063+s.a*.026);
            const height = (s.d-.5)*(3.4+r*.33)*mix(1,.28,pull);
            return [r*Math.cos(angle)*1.18,height,r*Math.sin(angle)*.78];
          };
          dust.update(shape);
          glints.update(shape,s=>9+s.c**1.4*31);
          dust.light(.94+pull*.35,time);
          glints.light(.29,time*.65);
          core.material.opacity = .54+pull*.19;
          glow.material.opacity = .13+pull*.8;
          glow.scale.setScalar(3.1+pull*2.4);
        },
      };
    }

    function sun(parent) {
      const star=body(parent,1.83,plasma,.65);
      const halo=aura(parent,"#ff8d58",16);
      const corona=aura(parent,"#ffd18a",6.9);
      const skirt=disk(parent,13,.6,["#f6ae70","#8966cb"]);
      skirt.rotation.z=.08;
      const flow=dotField(THREE,parent,3700,83,["#f7ac7a","#eb7e5b","#ebc99b","#a997e4"]);
      return {
        targets:[[0,0,0],[4.8,.32,1.8]],
        render(progress,time) {
          const birth=ramp(.24,.66,progress);
          star.scale.setScalar(.18+birth*.82);
          star.rotation.y=time*.24;
          star.material.uniforms.heat.value=.45+birth*.97;
          star.material.uniforms.time.value=time;
          halo.material.opacity=.14+birth*.72;
          corona.material.opacity=.10+birth*.66+.05*Math.sin(time*1.2);
          skirt.material.uniforms.opacity.value=.56;
          skirt.material.uniforms.time.value=time;
          flow.update((s,i)=>{
            const r=.7+((s.a+2-time*.033+s.d*.04)%1)*11;
            const a=i%4*TAU/4+s.a*4+s.d*.7+time*.24;
            return [r*Math.cos(a),(s.b-.5)*(.3+r*.20),r*Math.sin(a)];
          });
          flow.light(.83,time);
        },
      };
    }

    function protoplanet(parent) {
      const star=body(parent,1.22,plasma,1.12);
      const core=aura(parent,"#ffb972",10);
      core.material.opacity=.68;
      const primary=disk(parent,13.8,1.35,["#f7a063","#a084d8"]);
      const stretched=disk(parent,14.4,2.8,["#c998a3","#7271bc"]);
      stretched.position.y=-.27;
      const grains=dotField(THREE,parent,5750,94,["#ffb585","#ffd6a4","#b38cba","#9389de"]);
      return {
        targets:[[0,0,0],[6.6,.05,2.5]],
        render(progress,time) {
          star.rotation.y=time*.25;
          star.material.uniforms.time.value=time;
          primary.material.uniforms.time.value=time;
          primary.material.uniforms.opacity.value=.69+.71*ramp(0,.79,progress);
          stretched.material.uniforms.opacity.value=.63;
          stretched.material.uniforms.time.value=-time*.36;
          grains.update(s=>{
            const radius=1.7+s.a**.82*11.3;
            const angle=s.b*TAU + time*(1.2/(radius+1.4)+.028);
            return [radius*Math.cos(angle), (s.c-.5)*(1.1-.82*ramp(0,.95,progress)), radius*Math.sin(angle)];
          });
          grains.light(.87,time);
        },
      };
    }

    function accretion(parent) {
      const skirt=disk(parent,14,1.2,["#ff995c","#8f75bd"]);
      const star=body(parent,.95,plasma,1.2);
      const core=aura(parent,"#ffc784",8.1);
      core.material.opacity=.7;
      const swarm=dotField(THREE,parent,2800,103,["#d9a48d","#eb9b7a","#7c79b9","#bda0b9"]);
      const outlines=[];
      const random=randomFrom(209);
      const embryonic=[];
      for(let i=0;i<5;i++){
        const piece=body(parent,mix(.31,1.06,i/4),i<2?earthColors:["#201c36","#846286","#d6add1"],.12);
        embryonic.push(piece);
        const shimmer=aura(parent,i<2?"#efa481":"#bda4ed",3.2);
        shimmer.material.opacity=.17;
        outlines.push(shimmer);
      }
      const fragments=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),new THREE.MeshStandardMaterial({
        roughness:1,color:"#a38180",emissive:"#503145",emissiveIntensity:.36
      }),220);
      fragments.frustumCulled=false;
      const orbits=Array.from({length:220},(_,i)=>({group:i%5,turn:random()*TAU,radius:.5+random()*2.7,height:random()-.5,size:.018+random()**2*.105}));
      const pose=new THREE.Object3D();
      parent.add(fragments);
      return {
        targets:[()=>outlines[0].position,()=>outlines[3].position],
        render(progress,time) {
          const growth=ramp(.07,.94,progress);
          skirt.material.uniforms.time.value=time;
          skirt.material.uniforms.opacity.value=.88-.52*growth;
          star.material.uniforms.time.value=time;
          for(const [i,embryo] of embryonic.entries()){
            const angle=.19+i*1.26+time*(.27/(i+1)+.033);
            const r=3.4+i*1.86;
            embryo.position.set(r*Math.cos(angle),Math.sin(i*8)*.21,r*Math.sin(angle));
            embryo.scale.setScalar(.14+.86*ramp(.06+i*.052,.83+i*.025,progress));
            embryo.rotation.y=time*.15+i;
            embryo.material.uniforms.time.value=time;
            outlines[i].position.copy(embryo.position);
            outlines[i].material.opacity=.07+.17*growth+.12*Math.max(0,Math.sin(time*2.6+i*5))**7;
          }
          swarm.update(s=>{
            const radius=1.5+s.b**.8*11.4;
            const angle=s.a*TAU+time*.78/(radius+.9);
            return [radius*Math.cos(angle),(s.d-.5)*.42,radius*Math.sin(angle)];
          });
          swarm.light(.84-.41*growth,time);
          for(const [i,frag] of orbits.entries()){
            const origin=embryonic[frag.group].position;
            const a=frag.turn+time*(.7+.52/frag.radius);
            const r=frag.radius*(1-.68*growth);
            pose.position.set(origin.x+Math.cos(a)*r,origin.y+frag.height*(1-.55*growth),origin.z+Math.sin(a)*r);
            pose.rotation.set(a,frag.turn,a*.58);
            pose.scale.setScalar(frag.size*(1-.69*growth));
            pose.updateMatrix();
            fragments.setMatrixAt(i,pose.matrix);
          }
          fragments.instanceMatrix.needsUpdate=true;
        },
      };
    }

    function primitiveEarth(parent) {
      const proto=body(parent,2.95,earthColors,.42);
      const glow=aura(parent,"#f98757",16);
      glow.material.opacity=.46;
      const belt=ellipse(parent,7.4,"#8e5d80",.23,.82);
      belt.rotation.z=.055;
      const field=dotField(THREE,parent,3440,602,["#bd91ab","#ff9b66","#e0b0a7","#b39ecf"]);
      const flash=aura(parent,"#ffc09a",7.5);
      const pebbles=Array.from({length:12},(_,i)=>{
        const piece=new THREE.Mesh(new THREE.DodecahedronGeometry(.11+i*.013,0),new THREE.MeshStandardMaterial({
          color:"#987277",roughness:1,emissive:"#603041",emissiveIntensity:.43
        }));
        parent.add(piece);
        return piece;
      });
      return {
        targets:[[0,0,0],[5.6,0,1]],
        render(progress,time) {
          const growth=ramp(0,.86,progress);
          proto.scale.setScalar(.47+.53*growth);
          proto.rotation.y=time*.18;
          proto.rotation.z=.13;
          proto.material.uniforms.heat.value=.22+.31*growth;
          proto.material.uniforms.time.value=time;
          glow.material.opacity=.25+.24*growth;
          field.update(s=>{
            const radius=2.55+s.a*7.5*(1-.44*growth);
            const angle=s.b*TAU + time*.62/(.36+s.a);
            return [radius*Math.cos(angle),(s.c-.5)*(2.6-.88*growth),radius*Math.sin(angle)];
          });
          field.light(.80-.32*growth,time);
          for(const [i,piece] of pebbles.entries()){
            const a=i*TAU/12+time*.26;
            const r=(4.2+i%4*1.27)*(1-.58*growth);
            piece.position.set(r*Math.cos(a),Math.sin(a*2.3)*.94,r*Math.sin(a));
            piece.rotation.set(a,a*.76,i);
            piece.visible=r>2.26+growth*.62;
          }
          const a=time*.44;
          flash.position.set(Math.cos(a)*2.65,.55,Math.sin(a)*2.65);
          flash.material.opacity=Math.max(0,Math.sin((progress-.13)*37))**9*growth*.81;
        },
      };
    }

    function impact(parent) {
      const proto=body(parent,2.56,earthColors,.43);
      const theia=body(parent,1.06,stone,.075);
      const moon=body(parent,.83,["#263041","#8e8493","#c1c4d6"],.045);
      const vapor=aura(parent,"#f47b65",12);
      const flare=aura(parent,"#ffceaa",22);
      flare.position.set(1.98,.54,.16);
      const ring=ellipse(parent,5.85,"#b29dcb",.38,.84);
      const ejecta=dotField(THREE,parent,5200,532,["#ff9568","#ffce9a","#ca92ba","#bb91d4","#d2c5f0"]);
      const ash=disk(parent,10,2.53,["#e68a7e","#8971c2"]);
      ash.rotation.z=.11;
      return {
        targets:[[0,0,0],()=>theia.visible?theia.position:undefined,()=>moon.visible?moon.position:undefined],
        render(progress,time) {
          const approach=ramp(0,.34,progress);
          const impactAge=Math.max(0,progress-.355);
          const burst=ramp(.355,.44,progress);
          const ringForm=ramp(.425,.64,progress);
          const condense=ramp(.62,.965,progress);
          proto.rotation.y=time*.21;
          proto.material.uniforms.heat.value=.35+.62*burst-.29*condense;
          proto.material.uniforms.time.value=time;
          theia.position.set(mix(11.5,3.13,approach),mix(3.9,.63,approach),mix(-2.7,.24,approach));
          theia.rotation.y=time*.49;
          theia.visible=progress<.359;
          flare.material.opacity=.92*ramp(.345,.375,progress)*(1-ramp(.383,.505,progress));
          flare.scale.setScalar(9+burst*19);
          vapor.material.opacity=.31+burst*.50-condense*.21;
          const moonAngle=time*.22-.27;
          moon.position.set(Math.cos(moonAngle)*5.9,.20,Math.sin(moonAngle)*5.03);
          moon.rotation.y=time*.29;
          moon.visible=progress>.61;
          moon.scale.setScalar(.14+condense*.86);
          ring.material.opacity=condense*.61;
          ash.material.uniforms.opacity.value=ringForm*(.64-.48*condense);
          ash.material.uniforms.time.value=time*.65;
          ejecta.points.visible=progress>.35;
          ejecta.update((s,i)=>{
            const radius=2.8+s.a*7.6;
            const angle=s.b*TAU+time*(.34+.23*s.f);
            const spread=(s.a**.8)*burst*11;
            let x=mix(1.74+spread*Math.cos(angle),Math.cos(angle)*radius,ringForm);
            let z=mix(.14+spread*Math.sin(angle)*.85,Math.sin(angle)*radius*.88,ringForm);
            let y=(s.d-.5)*mix(impactAge*9,.87,ringForm);
            if (i%5<2) {
              const gather=condense*.94;
              x=mix(x,moon.position.x+(s.f-.5)*.95,gather);
              y=mix(y,moon.position.y+(s.c-.5)*.82,gather);
              z=mix(z,moon.position.z+(s.e-.5)*.98,gather);
            }
            return [x,y,z];
          });
          ejecta.light((.33+.91*burst)*(1-.81*condense),time);
        },
      };
    }

    const scenes = [nebulosa,sun,protoplanet,accretion,primitiveEarth,impact];
    return {
      aura, disk, ellipse, body,
      set(index, formationRoot) {
        if (active) active.group.visible=false;
        skyTint(index);
        active = undefined;
        if(index>=scenes.length) return;
        if(!chapters.has(index)){
          const group = new THREE.Group();
          formationRoot.add(group);
          chapters.set(index,{...scenes[index](group),group});
        }
        active=chapters.get(index);
        active.group.visible=true;
      },
      render(progress,time){ active?.render(progress,time); },
      target(index) {
        const position=active?.targets[index];
        return typeof position==="function" ? position() : position;
      },
    };
  }

  return {world, clamp, ramp, mix, randomFrom};
})();
