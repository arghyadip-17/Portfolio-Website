/* ======= Helpers & Init ======= */

// year
document.getElementById('year').textContent = new Date().getFullYear();

/* ======= Scroll reveal (IntersectionObserver) ======= */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

/* ======= Typing effect for hero title ======= */
const titleText = 'Arghyadip Ghosh';
const typedEl = document.getElementById('typed-title');
let tIdx = 0;
function typeNext() {
  if (!typedEl) return;
  typedEl.textContent = titleText.slice(0, tIdx);
  tIdx++;
  if (tIdx <= titleText.length) {
    setTimeout(typeNext, 80);
  } else {
    // blink caret once finished
    const caret = document.querySelector('.caret');
    let visible = true;
    setInterval(() => { if(caret) caret.style.opacity = (visible = !visible) ? '1' : '0'; }, 500);
  }
}
typeNext();

/* ======= Magnetic buttons ======= */
const magneticTargets = document.querySelectorAll('.magnetic');
magneticTargets.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width/2;
    const y = (e.clientY - rect.top) - rect.height/2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px) scale(1.03)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ======= Project filter buttons ======= */
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.getAttribute('data-filter');
    projects.forEach(p => {
      const cat = p.getAttribute('data-category');
      if (f === 'all' || f === cat) {
        p.style.display = '';
        // reveal if hidden
        p.classList.remove('hidden');
      } else {
        p.style.display = 'none';
      }
    });
  });
});

/* ======= Custom cursor glow ======= */
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  // slightly expand when over interactive elements
  const overInteractive = !!e.target.closest('a,button,.btn,.magnetic,.project-link');
  cursor.style.width = overInteractive ? '300px' : '220px';
  cursor.style.height = overInteractive ? '300px' : '220px';
});

/* ======= Particle background (lightweight) ======= */
(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const mouse = { x: W/2, y: H/2 };

  window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  // particles
  const count = Math.floor(Math.min(90, (W*H)/80000));
  const particles = [];
  function rand(min,max){ return Math.random()*(max-min)+min; }

  for (let i=0;i<count;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      vx: rand(-0.3,0.6),
      vy: rand(-0.3,0.6),
      r: rand(0.8,2.6),
      life: rand(40,220),
      hue: Math.random()*360
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for (let p of particles){
      // simple movement with wrap
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // mouse repulse
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120){
        const force = (120 - dist)/120;
        p.x += dx/dist * force * 3;
        p.y += dy/dist * force * 3;
      }

      // draw soft circle
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*10);
      grd.addColorStop(0, `rgba(56,189,248,${0.12})`);
      grd.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r*6, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

const text = "Arghyadip Ghosh";
const speed = 110;

let index = 0;
const target = document.getElementById("typewriter");

function typeEffect() {
  if (index < text.length) {
    target.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  }
}

typeEffect();
/* ===== Battery skill animation ===== */
const batteries = document.querySelectorAll('.battery-level');

const batteryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level;
      entry.target.style.width = level + '%';
      batteryObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

batteries.forEach(b => batteryObserver.observe(b));

/* ===== About text mouse drift ===== */
const floatLines = document.querySelectorAll('.float-line');

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;

  floatLines.forEach((line, i) => {
    line.style.transform = `translate(${x * (i + 1) * 0.15}px, ${y * (i + 1) * 0.15}px)`;
  });
});
/* ===== Cursor pop-out effect (FIXED) ===== */
document.querySelectorAll('.skill-float').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    card.style.transform =
      `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'translateY(0) rotateX(0) rotateY(0)';
  });
});
/* ===== Hero photo cursor tilt ===== */
const profileWrap = document.querySelector('.profile-wrap');

if (profileWrap) {
  profileWrap.addEventListener('mousemove', e => {
    const rect = profileWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    profileWrap.style.transform =
      `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  profileWrap.addEventListener('mouseleave', () => {
    profileWrap.style.transform =
      'translateY(0) rotateX(0) rotateY(0)';
  });
}
/* ===== Cursor tilt for project & experience cards ===== */
document.querySelectorAll('.project, .timeline-item').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    card.style.transform =
      `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform =
      'translateY(0) rotateX(0) rotateY(0)';
  });
});
/* ===== Z-stack activation for projects & experience ===== */
const zCards = document.querySelectorAll('.project, .timeline-item');

zCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    zCards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-active');
  });
});
