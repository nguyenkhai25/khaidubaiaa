// Plasma (simple animated noise-like plasma) and particles
(function(){
  // plasma canvas
  const plasma = document.getElementById('bg-plasma');
  const particles = document.getElementById('bg-particles');
  function resizeCanvas(c){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  resizeCanvas(plasma); resizeCanvas(particles);
  window.addEventListener('resize', ()=>{ resizeCanvas(plasma); resizeCanvas(particles); });

  // plasma animation (using sine fields for soft blobs)
  const pctx = plasma.getContext('2d');
  let t=0;
  function drawPlasma(){
    const w=plasma.width, h=plasma.height;
    pctx.clearRect(0,0,w,h);
    const grd = pctx.createLinearGradient(0,0,w,h);
    grd.addColorStop(0,'rgba(255,20,20,0.06)');
    grd.addColorStop(1,'rgba(80,0,0,0.04)');
    pctx.fillStyle = grd;
    pctx.fillRect(0,0,w,h);
    // soft moving circles
    for(let i=0;i<6;i++){
      const x = w*(0.2 + 0.6*Math.sin(t*0.3 + i));
      const y = h*(0.2 + 0.6*Math.cos(t*0.25 + i*1.1));
      const r = Math.min(w,h)*0.6*(0.08 + 0.07*Math.abs(Math.sin(t*0.2 + i)));
      const g = pctx.createRadialGradient(x,y,0,x,y,r);
      g.addColorStop(0,'rgba(255,40,40,0.12)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      pctx.fillStyle = g;
      pctx.beginPath(); pctx.arc(x,y,r,0,Math.PI*2); pctx.fill();
    }
    t += 0.9;
    requestAnimationFrame(drawPlasma);
  }
  drawPlasma();

  // particles layer (neon tiny particles drifting)
  const ctx = particles.getContext('2d');
  const N = Math.max(80, Math.floor(window.innerWidth/12));
  const parts = [];
  for(let i=0;i<N;i++){
    parts.push({
      x: Math.random()*particles.width,
      y: Math.random()*particles.height,
      vx: (Math.random()-0.5)*0.3,
      vy: (Math.random()-0.5)*0.3,
      r: 0.8 + Math.random()*1.8,
      life: Math.random()*200 + 100
    });
  }
  function drawParticles(){
    ctx.clearRect(0,0,particles.width,particles.height);
    for(let p of parts){
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.2;
      if(p.x< -10) p.x = particles.width+10;
      if(p.x>particles.width+10) p.x = -10;
      if(p.y< -10) p.y = particles.height+10;
      if(p.y>particles.height+10) p.y = -10;
      if(p.life < 0){ p.x = Math.random()*particles.width; p.y = Math.random()*particles.height; p.life = 200 + Math.random()*200; }
      const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      grd.addColorStop(0,'rgba(255,90,90,0.95)');
      grd.addColorStop(0.2,'rgba(255,30,30,0.6)');
      grd.addColorStop(1,'rgba(255,30,30,0)');
      ctx.fillStyle = grd;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // Gradient breathing subtle hue shift
  (function hueShift(){
    const bg = document.getElementById('bg-gradient');
    let time=0;
    function shift(){
      const hue = 345 + 15*Math.sin(time*0.2);
      bg.style.filter = 'hue-rotate(' + (hue%360) + 'deg)';
      time++;
      requestAnimationFrame(shift);
    }
    shift();
  })();

  // Scroll reveal for sections
  function revealOnScroll(){
    const reveals = document.querySelectorAll('.reveal');
    for(const r of reveals){
      const top = r.getBoundingClientRect().top;
      if(top < window.innerHeight - 80) r.classList.add('visible');
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);
})();
