"use strict";

window.addEventListener("DOMContentLoaded",()=>{
  const bodies=[
    {id:"sun",name:"Sol",type:"Estrella",size:1.65,color:"#ffbd56",dark:"#e98638",light:"#ffe1a2",distance:0,speed:0,angle:0,info:"La estrella que concentra la mayor parte de la masa del sistema solar. Su luz y calor llegan a los planetas."},
    {id:"mercury",name:"Mercurio",type:"Planeta rocoso",size:.32,color:"#9b9386",dark:"#59554f",light:"#d1c8b8",distance:2.8,speed:.32,angle:1.6,info:"Es el planeta más cercano al Sol. Su superficie tiene cráteres y su año dura 88 días terrestres."},
    {id:"venus",name:"Venus",type:"Planeta rocoso",size:.50,color:"#e8bb72",dark:"#9c5d2f",light:"#ffe3a9",distance:4.05,speed:.235,angle:3.35,info:"Su atmósfera densa retiene calor y lo convierte en el planeta más caliente del sistema solar."},
    {id:"earth",name:"Tierra",type:"Planeta rocoso",size:.55,color:"#4e90dc",dark:"#183c88",light:"#72bedf",distance:5.55,speed:.18,angle:.10,info:"Es el tercer planeta desde el Sol. Su Luna es el resultado de un proceso que comenzó en las primeras etapas del sistema solar."},
    {id:"mars",name:"Marte",type:"Planeta rocoso",size:.40,color:"#c8714f",dark:"#6e312c",light:"#eba37d",distance:7.1,speed:.145,angle:2.40,info:"El óxido de hierro da a su superficie un tono rojizo. Alberga el monte Olimpo, un enorme volcán."},
    {id:"jupiter",name:"Júpiter",type:"Gigante gaseoso",size:1.12,color:"#dcb294",dark:"#866953",light:"#f5d9bb",distance:10.05,speed:.087,angle:5.55,info:"Es el mayor de los planetas. La Gran Mancha Roja es una tormenta en su atmósfera."},
    {id:"saturn",name:"Saturno",type:"Gigante gaseoso",size:.90,color:"#d6b878",dark:"#8e774f",light:"#f6e1a6",distance:13.5,speed:.059,angle:3.05,info:"Sus anillos contienen partículas de hielo y roca. Algunas son diminutas y otras alcanzan varios metros."},
    {id:"uranus",name:"Urano",type:"Gigante helado",size:.67,color:"#83d5dd",dark:"#397a90",light:"#bbeced",distance:16.9,speed:.036,angle:5.06,info:"Su eje de rotación está muy inclinado. El metano de su atmósfera contribuye a su color azul verdoso."},
    {id:"neptune",name:"Neptuno",type:"Gigante helado",size:.65,color:"#526fdf",dark:"#253b9c",light:"#a1adf3",distance:20.6,speed:.029,angle:4.13,info:"Es el planeta más lejano del Sol. En su atmósfera se han medido vientos muy intensos."},
  ];
  const chapters = [
    {
      title:"Nebulosa inicial", short:"Nebulosa", epoch:"Hace unos 4.600 millones de años", duration:18, camera:[0,4.6,19.4,-.23],
      info:"Una región de una nube de gas y polvo empezó a contraerse por su propia gravedad. Al reducirse la nube, el material se concentró hacia el centro y el giro se hizo más rápido.",
      captions:[[0,"Una región de la nube empieza a contraerse por su propia gravedad."],[.32,"El gas y el polvo se arremolinan al acercarse hacia el centro."],[.73,"La nube se comprime y concentra cada vez más materia."]],
      points:[
        {id:"cloud",name:"Nube de gas y polvo",color:"#baa4fd",info:"El gas, principalmente hidrógeno y helio, arrastraba pequeñas partículas sólidas."},
        {id:"collapse",name:"Contracción",color:"#edabcc",info:"La gravedad acerca el material y aumenta la densidad en el centro."},
      ],
    },
    {
      title:"Formación del Sol", short:"Nacimiento del Sol", epoch:"El centro de la nube", duration:18, camera:[0,3.3,17.2,-.19],
      info:"El material acumulado formó una protoestrella. Cuando el núcleo alcanzó condiciones para fusionar hidrógeno, el Sol empezó a generar energía por fusión.",
      captions:[[0,"El material se acumula en una protoestrella."],[.26,"Al comprimirse, el núcleo se calienta."],[.57,"La fusión del hidrógeno alimenta al Sol joven."]],
      points:[
        {id:"star",name:"Protoestrella",color:"#ffd19c",info:"La concentración central se calentó a medida que ganó masa."},
        {id:"inflow",name:"Flujo de materia",color:"#e7a099",info:"Parte de la materia cayó al centro mientras el disco seguía girando a su alrededor."},
      ], effects:[[.58,"sun"]],
    },
    {
      title:"Disco protoplanetario", short:"Disco", epoch:"Alrededor del Sol joven", duration:19, camera:[0,9.6,20,-.44],
      info:"El giro y las colisiones entre partículas aplanaron la nube en un disco. Sus regiones tenían distintas temperaturas y contenían gas, roca, metales y hielos.",
      captions:[[0,"El gas y el polvo forman un disco alrededor del Sol joven."],[.34,"El material interior gira más rápido que el exterior."],[.71,"En zonas más frías del disco podían conservarse hielos."]],
      points:[
        {id:"center",name:"Sol joven",color:"#ffc894",info:"El Sol y el disco se desarrollaron al mismo tiempo a partir de la nube en contracción."},
        {id:"disc",name:"Disco de gas y polvo",color:"#bc9cf1",info:"El disco aportó materia a los cuerpos que empezaron a crecer en órbita."},
      ],
    },
    {
      title:"Formación de planetas", short:"Formación de planetas", epoch:"Acreción en el disco", duration:21, camera:[0,11.4,22.7,-.45],
      info:"El polvo y los fragmentos se agruparon. Algunos cuerpos sólidos se hicieron lo bastante grandes para atraer más materia y se convirtieron en protoplanetas.",
      captions:[[0,"Pequeños fragmentos se agrupan en el disco."],[.31,"Los planetesimales atraen más materia y chocan entre sí."],[.70,"Varios embriones planetarios crecen mientras el disco se dispersa."]],
      points:[
        {id:"seeds",name:"Planetesimal",color:"#edac8d",info:"Un cuerpo sólido pequeño que puede sumarse a cuerpos mayores mediante acreción."},
        {id:"embryos",name:"Protoplaneta",color:"#c6a9f8",info:"Un embrión planetario con masa suficiente para atraer parte del material cercano."},
      ], effects:[[.35,"spark"],[.69,"spark"]],
    },
    {
      title:"Tierra primitiva", short:"Tierra primitiva", epoch:"Un planeta rocoso en formación", duration:20, camera:[0,3.6,14.6,-.23],
      info:"La Tierra creció a partir de cuerpos rocosos del disco interior. La energía de las colisiones y el calor interno mantuvieron muy caliente al planeta joven.",
      captions:[[0,"La Tierra se forma por acreción, como otros planetas rocosos."],[.35,"Las colisiones aportan masa y energía."],[.72,"La Tierra joven conserva gran parte de ese calor."]],
      points:[
        {id:"protoearth",name:"Tierra joven",color:"#ffba88",info:"Este acercamiento muestra un planeta todavía en crecimiento y con una superficie muy caliente."},
        {id:"rock",name:"Fragmentos rocosos",color:"#d59eb3",info:"Parte de los fragmentos aportó masa al planeta. Otros siguieron en trayectorias distintas."},
      ], effects:[[.38,"spark"]],
    },
    {
      title:"Gran impacto y origen de la Luna", short:"Origen de la Luna", epoch:"Hace unos 4.500 millones de años", duration:26, camera:[0,3.7,16.5,-.21],
      info:"Según la hipótesis principal, un gran cuerpo chocó con la Tierra joven. Parte del material expulsado quedó en órbita y contribuyó a formar la Luna.",
      captions:[[0,"Un posible escenario del gran impacto. El cuerpo que se acerca suele llamarse Theia."],[.34,"El impacto expulsa material caliente. Parte queda en órbita alrededor de la Tierra."],[.62,"Los fragmentos en órbita se acumulan y forman la Luna."],[.89,"La Luna se distingue mientras los restos del disco se dispersan."]],
      points:[
        {id:"earth",name:"Tierra joven",color:"#ffad80",info:"El impacto habría alterado la Tierra y expulsado parte de su material."},
        {id:"theia",name:"Theia",color:"#ddabbd",info:"Nombre del cuerpo propuesto en una versión de la hipótesis. Su trayectoria exacta sigue en estudio."},
        {id:"moon",name:"Luna",color:"#c3bff4",info:"En este escenario, la Luna crece por acumulación de material que quedó en órbita."},
      ], effects:[[.355,"impact"],[.72,"moon"]],
    },
    {
      title:"Sistema solar estructurado", short:"Sistema solar final", epoch:"El resultado del recorrido", duration:20, camera:[0,11.4,30,-.34],
      info:"Al dispersarse gran parte del gas y del polvo, quedaron el Sol, ocho planetas y cuerpos menores. Selecciona los astros o recorre sus órbitas para explorar el resultado.",
      captions:[[0,"Las órbitas se hacen visibles a medida que se aclara el disco."],[.27,"Explora el Sol, los ocho planetas y la Luna. Los astros se pueden seleccionar."]],
    },
  ];

  function seed(initial) {
    let value=initial;
    return ()=>{
      value=(Math.imul(value,1664525)+1013904223)>>>0;
      return value/4294967296;
    };
  }
  function makeSurface(body,index) {
    const map=document.createElement("canvas");
    map.width=512;
    map.height=256;
    const paint=map.getContext("2d");
    const random=seed(277+index*51);
    paint.fillStyle=body.color;
    paint.fillRect(0,0,512,256);
    const gas=["jupiter","saturn","uranus","neptune","venus"].includes(body.id);
    if (gas) {
      for (let i=0;i<36;i++) {
        paint.fillStyle=i%2?body.dark:body.light;
        paint.globalAlpha=.08+random()*.31;
        paint.fillRect(0,random()*256,512,2+random()*21);
      }
    }
    for(let i=0;i<(gas?180:840);i++) {
      paint.fillStyle=i%2?body.dark:body.light;
      paint.globalAlpha=.06+random()*.19;
      paint.beginPath();
      paint.ellipse(random()*512,random()*256,2+random()*(gas?40:17),.75+random()*(gas?2.8:12),0,0,Math.PI*2);
      paint.fill();
    }
    paint.globalAlpha=.82;
    if (body.id==="earth") {
      const continents=[[[39,68],[84,32],[140,50],[143,79],[116,98],[104,133],[84,130],[65,95]],
        [[111,126],[150,126],[182,165],[164,199],[147,222],[131,179]],
        [[237,79],[286,43],[360,42],[433,85],[367,119],[337,106],[310,130],[279,110],[239,118]],
        [[230,115],[278,121],[289,152],[272,188],[249,198],[219,158]],
        [[381,158],[425,149],[465,179],[451,197],[407,192]]];
      paint.fillStyle="#6ea97a";
      for (const shape of continents) {
        paint.beginPath();
        shape.forEach(([x,y],i)=>i?paint.lineTo(x,y):paint.moveTo(x,y));
        paint.closePath();
        paint.fill();
      }
      paint.globalAlpha=.56;
      paint.fillStyle="#e0edf1";
      paint.fillRect(0,0,512,17);
      paint.fillRect(0,241,512,15);
    }
    if(body.id==="jupiter"){
      paint.fillStyle="#b86754";
      paint.beginPath();
      paint.ellipse(385,160,29,10,0,0,Math.PI*2);
      paint.fill();
    }
    const texture=new THREE.CanvasTexture(map);
    texture.colorSpace=THREE.SRGBColorSpace;
    return texture;
  }
  function orbit(distance) {
    const positions=[];
    for(let i=0;i<144;i++){
      const t=i/144*Math.PI*2;
      positions.push(new THREE.Vector3(Math.cos(t)*distance,0,Math.sin(t)*distance));
    }
    return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(positions),
      new THREE.LineBasicMaterial({color:"#627aa4",transparent:true,opacity:.32}));
  }

  const moon = {
    id:"moon-final",name:"Luna",type:"Satélite natural",size:.22,color:"#c3c3dc",dark:"#69677c",light:"#e5e1f4",
    distance:0,speed:0,angle:0, info:"Es el satélite natural de la Tierra. Sus rocas aportan pistas sobre cómo se formó y cómo evolucionó su órbita.",
  };
  const catalog = [...bodies, moon];
  const byId = (id) => document.getElementById(id);
  const loading = byId("loading");
  const lastStage = chapters.length - 1;
  const showStatus = (message) => {
    const status = byId("app-status");
    status.textContent = message;
    status.hidden = !message;
  };
  if (!window.AFRAME || !window.FormationScenes) {
    loading.textContent = "No se pudo cargar la escena 3D. Comprueba la conexión y recarga la página.";
    return;
  }
  const {THREE} = AFRAME;
  const {world,clamp,ramp,mix} = window.FormationScenes;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let stageIndex = 0, elapsed = 0, runningTime = 0;
  let playing = !reducedMotion, guided = false, ready = false, narrated = false;
  let selected, lastCaption, lastTimeText, transition;
  let graphics, finalSystem, scene, vrTexture;
  const marks = [], stageButtons = [], objectButtons = new Map();
  const view = byId("stage");
  const play = byId("play");
  const scrub = byId("progress");
  const playIcon = () => playing ? "Ⅱ" : "⏵";
  const button = (id, handler) => byId(id).addEventListener("click",handler);

  function selectedSet() {
    return stageIndex === lastStage ? catalog : chapters[stageIndex].points;
  }

  function showSelection(item) {
    selected = item;
    for (const [id,element] of objectButtons) element.setAttribute("aria-pressed",String(id===item?.id));
    const text = byId("detail");
    text.replaceChildren();
    if (item) {
      const title = document.createElement("strong");
      title.textContent = item.name + ". ";
      text.append(title,item.info);
    } else {
      text.textContent = "Selecciona un objeto en la imagen o en la lista para ver su detalle.";
    }
    paintVR();
  }

  function writeObjects() {
    const list = byId("objects");
    list.replaceChildren();
    objectButtons.clear();
    for (const item of selectedSet()) {
      const element = document.createElement("button");
      const dot = document.createElement("i");
      element.type = "button";
      dot.setAttribute("aria-hidden","true");
      dot.style.setProperty("--point",item.color);
      element.append(dot,item.name);
      element.addEventListener("click",()=>showSelection(item));
      list.append(element);
      objectButtons.set(item.id,element);
    }
    showSelection();
  }

  for (const [index,chapter] of chapters.entries()) {
    const li = document.createElement("li"), item = document.createElement("button");
    const number = document.createElement("b");
    item.type = "button";
    number.textContent = String(index+1).padStart(2,"0");
    number.setAttribute("aria-hidden","true");
    item.append(number,chapter.short);
    item.addEventListener("click",()=>goTo(index));
    li.append(item);
    byId("timeline").append(li);
    stageButtons.push(item);
  }

  function stepButtons() {
    byId("previous").disabled = stageIndex === 0;
    byId("next").disabled = stageIndex === lastStage;
    byId("guide").setAttribute("aria-pressed",String(guided));
    play.textContent = playIcon();
    const label = playing ? "Pausar animación" : "Reproducir animación";
    play.setAttribute("aria-label",label);
    play.title = label;
  }
  const formatTime = (seconds) => Math.floor(seconds/60)+":"+String(Math.floor(seconds%60)).padStart(2,"0");

  function setCaption() {
    const {duration,captions} = chapters[stageIndex];
    const progress = clamp(elapsed/duration);
    scrub.value = Math.round(progress*1000);
    const active = captions.findLast(([start])=>progress>=start)?.[1];
    if (lastCaption !== active) {
      byId("caption").textContent = active;
      lastCaption = active;
      paintVR();
    }
    const current = formatTime(elapsed) + " / " + formatTime(duration);
    if (current !== lastTimeText) {
      byId("time").textContent = current;
      scrub.setAttribute("aria-valuetext",formatTime(elapsed) + " de " + formatTime(duration));
      lastTimeText = current;
    }
  }

  function frameCamera() {
    if (!ready) return;
    const [x,y,z,pitch] = chapters[stageIndex].camera;
    const rig = byId("rig"), camera = byId("eye");
    rig.object3D.position.set(x,y,z);
    if (!scene.is("vr-mode")) {
      camera.object3D.position.set(0,1.6,0);
      const look = camera.components["look-controls"];
      if (look?.pitchObject) {
        look.pitchObject.rotation.x = pitch;
        look.yawObject.rotation.y = 0;
      }
    }
    const controls = camera.components["wasd-controls"];
    controls?.velocity?.set(0,0,0);
  }

  function goTo(index, animate=true) {
    if (!ready || index < 0 || index > lastStage) return;
    if (animate && index===stageIndex && elapsed===0) return;
    stageIndex = index;
    elapsed = 0;
    runningTime = 0;
    lastCaption = undefined;
    const chapter = chapters[index];
    byId("epoch").textContent = chapter.epoch;
    byId("chapter-title").textContent = chapter.title;
    byId("description").textContent = chapter.info;
    byId("stage-number").innerHTML = "<i></i> ETAPA " + String(index+1).padStart(2,"0") + " <span>/ 07</span>";
    for (const [i,element] of stageButtons.entries()) {
      if (i===index) element.setAttribute("aria-current","step");
      else element.removeAttribute("aria-current");
    }
    scrub.value = 0;
    writeObjects();
    graphics.set(index,byId("formation").object3D);
    finalSystem?.setActive(index===lastStage);
    rebuildMarks(chapter.points ?? []);
    frameCamera();
    renderStages();
    setCaption();
    stepButtons();
    if (animate) {
      if (!reducedMotion && !scene.is("vr-mode")) {
        transition?.cancel();
        transition = byId("stage-veil").animate([{opacity:.79},{opacity:0}],{duration:690,easing:"cubic-bezier(.16,1,.3,1)"});
      }
      effect("scene");
      sayChapter();
    }
  }

  function renderStages() {
    const progress = clamp(elapsed/chapters[stageIndex].duration);
    graphics.render(progress,runningTime);
    if (stageIndex === lastStage) finalSystem?.render(progress,runningTime);
    for (const [i,mark] of marks.entries()) {
      const point = graphics.target(i);
      const visible = Boolean(point);
      if (mark.object3D.visible !== visible) {
        mark.object3D.visible = visible;
        mark.classList.toggle("astro",visible);
        scene.components.raycaster?.refreshObjects();
      }
      if (!point) continue;
      const {x,y,z} = Array.isArray(point) ? {x:point[0],y:point[1],z:point[2]} : point;
      mark.object3D.position.set(x+.34,y+.5,z+.18);
    }
  }

  function advance(delta) {
    if (!ready || !playing) return;
    const duration = chapters[stageIndex].duration;
    const before = elapsed/duration;
    elapsed = Math.min(duration,elapsed+delta);
    runningTime += delta;
    for (const [at,kind] of chapters[stageIndex].effects ?? []) {
      if (before < at && elapsed/duration >= at) effect(kind);
    }
    renderStages();
    setCaption();
    if (elapsed===duration && stageIndex < lastStage) {
      if (guided) goTo(stageIndex+1);
      else {
        playing = false;
        stepButtons();
      }
    } else if (elapsed===duration && guided) {
      guided = false;
      stepButtons();
    }
  }

  AFRAME.registerComponent("formation-clock",{
    tick(_time,delta=0){ if (Number.isFinite(delta) && delta>0) advance(Math.min(delta,90)/1000); },
  });

  function setPlaying(next) {
    if (!ready) return;
    if (next && stageIndex!==lastStage && elapsed>=chapters[stageIndex].duration) rewind();
    playing=next;
    if (narrated) {
      if (next) window.speechSynthesis.resume();
      else window.speechSynthesis.pause();
    }
    stepButtons();
  }
  function rewind() {
    if (!ready) return;
    elapsed=0;
    runningTime=0;
    scrub.value=0;
    renderStages();
    setCaption();
    sayChapter();
  }
  button("play",()=>setPlaying(!playing));
  button("replay",()=>{rewind();setPlaying(true);});
  button("previous",()=>{if (stageIndex>0) {playing=true;goTo(stageIndex-1);}});
  button("next",()=>{if (stageIndex<lastStage) {playing=true;goTo(stageIndex+1);}});
  button("guide",()=>{
    if (!ready) return;
    guided=!guided;
    if (guided) {
      playing=true;
      if (stageIndex!==0) goTo(0);
      else if (elapsed>=chapters[stageIndex].duration) rewind();
      if (narrated) window.speechSynthesis.resume();
    }
    stepButtons();
  });
  button("recenter",frameCamera);
  scrub.addEventListener("input",()=>{
    if (!ready) return;
    if (playing) setPlaying(false);
    elapsed = Number(scrub.value)/1000*chapters[stageIndex].duration;
    runningTime = elapsed;
    renderStages();
    setCaption();
  });
  scrub.addEventListener("change",()=>{
    if (!ready) return;
    if (elapsed===chapters[stageIndex].duration && stageIndex!==lastStage && !guided) setPlaying(false);
  });

  let markerMap;
  function markerTexture() {
    if (markerMap) return markerMap;
    const canvas=document.createElement("canvas");
    canvas.width=canvas.height=64;
    const pen=canvas.getContext("2d");
    pen.lineWidth=2;
    pen.strokeStyle="#f7e9ff";
    pen.globalAlpha=.8;
    pen.beginPath();
    pen.arc(32,32,18,0,Math.PI*2);
    pen.stroke();
    pen.globalAlpha=1;
    pen.fillStyle="#efcbf1";
    pen.beginPath();
    pen.arc(32,32,4,0,Math.PI*2);
    pen.fill();
    markerMap=new THREE.CanvasTexture(canvas);
    markerMap.colorSpace=THREE.SRGBColorSpace;
    return markerMap;
  }

  function rebuildMarks(points) {
    for (const mark of marks) {
      mark.getObject3D("mesh").geometry.dispose();
      mark.getObject3D("mesh").material.dispose();
      mark.getObject3D("marker").material.dispose();
      mark.remove();
    }
    marks.length=0;
    for (const point of points) {
      const entity=document.createElement("a-entity");
      entity.classList.add("astro");
      const hit = new THREE.Mesh(new THREE.SphereGeometry(.45,12,9),
        new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));
      const label = new THREE.Sprite(new THREE.SpriteMaterial({
        map:markerTexture(),depthTest:false,depthWrite:false,transparent:true
      }));
      label.raycast = () => {};
      label.scale.set(.59,.59,1);
      label.renderOrder=9;
      entity.setObject3D("mesh",hit);
      entity.setObject3D("marker",label);
      entity.addEventListener("click",(event)=>{if (event.detail?.cursorEl) showSelection(point);});
      byId("formation").append(entity);
      marks.push(entity);
    }
    scene.components.raycaster?.refreshObjects();
  }

  AFRAME.registerComponent("solar-system",{
    init() { this.all=[]; },
    build() {
      if (this.all.length) return;
      const system = this.el.object3D;
      this.rings=[];
      this.skirt=graphics.disk(system,22,1.6,["#a53e3c","#685580"]);
      for (const [i,entry] of catalog.entries()) {
        const entity=document.createElement("a-entity");
        const texture=makeSurface(entry,i);
        const material=entry.id==="sun" ? new THREE.MeshBasicMaterial({map:texture})
          : new THREE.MeshStandardMaterial({map:texture,roughness:1});
        const mesh=new THREE.Mesh(new THREE.SphereGeometry(entry.size,48,28),material);
        if (entry.id==="sun") {
          this.glow=graphics.aura(mesh,"#ffa360",9.3);
          this.glow.material.opacity=.9;
        }
        if (entry.id==="saturn") {
          for (const [inner,outer,opacity] of [[1.13,1.42,.53],[1.46,1.59,.61],[1.62,1.75,.27]]) {
            const ring=new THREE.Mesh(new THREE.RingGeometry(inner,outer,84),
              new THREE.MeshBasicMaterial({color:"#e8d9b8",side:THREE.DoubleSide,opacity,transparent:true,depthWrite:false}));
            ring.rotation.x=Math.PI/2-.24;
            ring.rotation.y=.33;
            mesh.add(ring);
          }
        }
        entity.setObject3D("mesh",mesh);
        entity.addEventListener("click",(event)=>{
          if (stageIndex===lastStage && event.detail?.cursorEl) showSelection(entry);
        });
        this.el.append(entity);
        if (entry.distance) {
          const line=orbit(entry.distance);
          system.add(line);
          this.rings.push(line);
        }
        this.all.push({body:entry,entity,mesh});
      }
      this.moonRing=graphics.ellipse(system,.92,"#b9a9d5",.42);
      const field=FormationScenes.randomFrom(456);
      const rocks=Array.from({length:340},()=>{
        const a=field()*Math.PI*2,r=7.65+field()*1.62;
        return new THREE.Vector3(r*Math.cos(a),(field()-.5)*.39,r*Math.sin(a));
      });
      this.belt=new THREE.Points(new THREE.BufferGeometry().setFromPoints(rocks),
        new THREE.PointsMaterial({color:"#b5a4c0",size:.034,transparent:true,opacity:.62}));
      system.add(this.belt);
    },
    setActive(active) {
      if(active) this.build();
      this.el.object3D.visible=active;
      for(const {entity} of this.all) entity.classList.toggle("astro",active);
    },
    render(progress,time) {
      if(!this.all.length) return;
      const resolved=ramp(0,.52,progress);
      const spread=mix(.66,1,resolved);
      this.skirt.material.uniforms.opacity.value=.88*(1-resolved);
      this.skirt.material.uniforms.time.value=time*.75;
      this.glow.material.opacity=.78+.08*Math.sin(time*.64);
      this.belt.rotation.y=time*.047;
      for(const line of this.rings) {
        line.material.opacity=.14+.27*resolved;
        line.scale.set(spread,1,spread);
      }
      for(const {body,entity,mesh} of this.all) {
        const angle=body.angle+body.speed*time;
        if(body.id==="moon-final") {
          const earth=this.all[3].entity.object3D.position;
          this.moonRing.position.copy(earth);
          entity.object3D.position.set(earth.x+Math.cos(.65*time)*.92,.06,earth.z+Math.sin(.65*time)*.92);
          mesh.scale.setScalar(.15+.85*resolved);
        } else {
          entity.object3D.position.set(Math.cos(angle)*body.distance*spread,0,Math.sin(angle)*body.distance*spread);
          mesh.scale.setScalar(body.id==="sun" ? 1 : .34+.66*resolved);
        }
        mesh.rotation.y=time*.23;
      }
    },
  });

  const vrCanvas=document.createElement("canvas");
  vrCanvas.width=840;
  vrCanvas.height=285;
  const vrPen=vrCanvas.getContext("2d");
  function wrap(text,x,y){
    let line="";
    for(const word of text.split(" ")) {
      if (line && vrPen.measureText(line+" "+word).width>765) {
        vrPen.fillText(line,x,y);
        line=word;
        y+=39;
      } else line+=(line?" ":"")+word;
    }
    if(line) vrPen.fillText(line,x,y);
  }
  function paintVR() {
    if (!vrTexture) return;
    vrPen.fillStyle="#121021";
    vrPen.fillRect(0,0,840,285);
    vrPen.fillStyle="#e7c8fc";
    vrPen.font="600 28px sans-serif";
    vrPen.fillText("ETAPA " + (stageIndex+1) + " / 7",30,49);
    vrPen.fillStyle="#fff5fb";
    vrPen.font="bold 43px sans-serif";
    const title = selected?.name ?? chapters[stageIndex].title;
    vrPen.fillText(title,30,107,780);
    vrPen.font="29px sans-serif";
    wrap(selected?.info ?? lastCaption ?? chapters[stageIndex].captions[0][1],31,164);
    vrTexture.needsUpdate=true;
  }

  function vrControl(id,label,offset) {
    const entity=byId(id);
    const canvas=document.createElement("canvas");
    canvas.width=256;
    canvas.height=120;
    const pen=canvas.getContext("2d");
    pen.fillStyle="#271b38";
    pen.fillRect(0,0,256,120);
    pen.font="bold 36px sans-serif";
    pen.fillStyle="#f3dbff";
    pen.textAlign="center";
    pen.fillText(label,128,73);
    const texture=new THREE.CanvasTexture(canvas);
    texture.colorSpace=THREE.SRGBColorSpace;
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(.37,.17),
      new THREE.MeshBasicMaterial({map:texture,depthTest:false}));
    mesh.renderOrder=11;
    entity.setObject3D("mesh",mesh);
    entity.addEventListener("click",(event)=>{
      if (!event.detail?.cursorEl || !scene.is("vr-mode")) return;
      const next=stageIndex+offset;
      if (next<0 || next>lastStage) return;
      playing=true;
      goTo(next);
    });
  }

  byId("stage").append(byId("solar-template").content.cloneNode(true));
  scene = view.querySelector("a-scene");
  byId("formation").setAttribute("formation-clock","");
  if ("ResizeObserver" in window) {
    const resizeStage = new ResizeObserver(()=>{
      if (scene.renderer && scene.hasLoaded) scene.resize();
    });
    resizeStage.observe(view);
  }
  const sceneTimeout = window.setTimeout(()=>{
    if (!ready) loading.textContent="La escena 3D no se pudo iniciar. Comprueba que el navegador admita WebGL.";
  },12000);
  function startScene(){
    window.clearTimeout(sceneTimeout);
    if (ready) return;
    try {
      graphics=world(THREE,byId("environment").object3D);
      finalSystem=byId("universe").components["solar-system"];
      vrTexture=new THREE.CanvasTexture(vrCanvas);
      vrTexture.colorSpace=THREE.SRGBColorSpace;
      const panel=byId("vr-facts");
      const mesh=new THREE.Mesh(new THREE.PlaneGeometry(1.67,.566),new THREE.MeshBasicMaterial({map:vrTexture,depthTest:false}));
      mesh.renderOrder=10;
      panel.setObject3D("mesh",mesh);
      vrControl("vr-previous","Anterior",-1);
      vrControl("vr-next","Siguiente",1);
      ready=true;
      goTo(0,false);
      loading.hidden=true;
    } catch(error) {
      ready=false;
      loading.textContent="La escena 3D encontró un problema al cargar. Recarga para volver a intentarlo.";
      console.warn(error);
    }
  }
  if (scene.renderStarted) startScene();
  else scene.addEventListener("renderstart",startScene,{once:true});

  function immersive(isActive) {
    for (const id of ["vr-facts","vr-previous","vr-next"]) {
      const element=byId(id);
      element.setAttribute("visible",isActive);
      if (id!=="vr-facts") element.classList.toggle("astro",isActive);
    }
    scene.components.raycaster?.refreshObjects();
  }
  scene.addEventListener("enter-vr",()=>immersive(true));
  scene.addEventListener("exit-vr",()=>immersive(false));
  if (window.isSecureContext && navigator.xr?.isSessionSupported) {
    navigator.xr.isSessionSupported("immersive-vr").then(supported=>{byId("vr").hidden=!supported;}).catch(()=>{});
  }
  button("vr",async()=>{
    try { await scene.enterVR(); }
    catch { showStatus("No se pudo iniciar la sesión de realidad virtual."); }
  });
  button("full",async()=>{
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { showStatus("El navegador no pudo activar la pantalla completa."); }
  });
  document.addEventListener("fullscreenchange",()=>{
    byId("full-label").textContent=document.fullscreenElement?"Salir de pantalla completa":"Pantalla completa";
  });

  function sayChapter() {
    if (!narrated) return;
    const engine=window.speechSynthesis;
    engine.cancel();
    const chapter=chapters[stageIndex];
    const voice=new SpeechSynthesisUtterance(chapter.title+". "+chapter.info);
    voice.lang="es-CL";
    const available=engine.getVoices();
    voice.voice=available.find(item=>item.lang.startsWith("es-CL")) ?? available.find(item=>item.lang.startsWith("es")) ?? null;
    voice.rate=.94;
    engine.speak(voice);
    if (!playing) engine.pause();
  }
  if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    byId("narration").hidden=false;
    button("narration",()=>{
      narrated=!narrated;
      byId("narration").setAttribute("aria-pressed",String(narrated));
      if (narrated) sayChapter();
      else window.speechSynthesis.cancel();
    });
  }

  let audio,master,noise,sounding=false;
  function initSound() {
    audio=new (window.AudioContext||window.webkitAudioContext)();
    master=audio.createGain();
    master.gain.value=0;
    master.connect(audio.destination);
    for (const [i,frequency] of [42,62.93,83.87,125.8].entries()) {
      const pad=audio.createOscillator(), level=audio.createGain();
      pad.type="sine";
      pad.frequency.value=frequency;
      level.gain.value=.13/(i+1);
      pad.connect(level).connect(master);
      pad.start();
    }
    noise=audio.createBuffer(1,Math.floor(audio.sampleRate*1.2),audio.sampleRate);
    const series=noise.getChannelData(0);
    const random=FormationScenes.randomFrom(208);
    for(let i=0;i<series.length;i++) series[i]=random()*2-1;
  }

  function effect(kind) {
    if (!sounding || !audio || audio.state!=="running") return;
    const t=audio.currentTime;
    const shapes={scene:[146,92,.44,.15],sun:[85,185,1.4,.50],spark:[85,39,.36,.18],impact:[85,31,1.19,.60],moon:[202,380,1.35,.24]};
    const [start,end,span,strength]=shapes[kind];
    const tone=audio.createOscillator(), fade=audio.createGain();
    tone.type="sine";
    tone.frequency.setValueAtTime(start,t);
    tone.frequency.exponentialRampToValueAtTime(end,t+span*.86);
    fade.gain.setValueAtTime(.001,t);
    fade.gain.exponentialRampToValueAtTime(strength,t+.08);
    fade.gain.exponentialRampToValueAtTime(.001,t+span);
    tone.connect(fade).connect(master);
    tone.start(t);
    tone.stop(t+span);
    if (kind==="scene" || kind==="impact" || kind==="spark") {
      const burst=audio.createBufferSource(), filter=audio.createBiquadFilter(), envelope=audio.createGain();
      burst.buffer=noise;
      filter.type="lowpass";
      filter.frequency.setValueAtTime(kind==="impact" ? 1300 : 800,t);
      filter.frequency.exponentialRampToValueAtTime(120,t+span);
      envelope.gain.setValueAtTime(kind==="impact" ? .5 : .12,t);
      envelope.gain.exponentialRampToValueAtTime(.001,t+span);
      burst.connect(filter).connect(envelope).connect(master);
      burst.start(t);
      burst.stop(t+span);
    }
  }

  button("sound",async()=>{
    try {
      if (!audio) initSound();
      await audio.resume();
      sounding=!sounding;
      master.gain.setTargetAtTime(sounding ? .21 : 0,audio.currentTime,.12);
      byId("sound").setAttribute("aria-pressed",String(sounding));
    } catch { showStatus("Este navegador no pudo activar el sonido."); }
  });
  window.addEventListener("pagehide",()=>{
    if(narrated) window.speechSynthesis.cancel();
    audio?.suspend();
  });
  window.addEventListener("pageshow",(event)=>{
    if(event.persisted && sounding) {sounding=false;byId("sound").setAttribute("aria-pressed","false");}
  });
  stepButtons();
});
