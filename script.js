function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";

    }  else {
        password.type = "password";
    }
}

const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
const counter = document.getElementById('counter');
const total = 3;
let cur = 0;

for (let i = 0; i < total; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(d);
}

function goTo(n) {
  cur = (n + total) % total;
  track.style.transform = `translateX(-${cur * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === cur));
  counter.textContent = `${cur + 1} / ${total}`;
}

document.getElementById('prev').addEventListener('click', () => goTo(cur - 1));
document.getElementById('next').addEventListener('click', () => goTo(cur + 1));

document.querySelectorAll('.color-dot').forEach(dot => {
  dot.addEventListener('click', function() {
    const carId = this.dataset.car;
    const body = this.dataset.body;
    const dark = this.dataset.dark;
    const svg = document.getElementById(carId);
    svg.querySelectorAll('rect, circle').forEach(el => {
      const f = el.getAttribute('fill');
      if (f && f !== '#2C2C2A' && f !== '#B4B2A9' && f !== '#B5D4F4' && f !== '#FAC775' && f !== '#F09595') {
        if (el.getAttribute('opacity') === '0.6' || el.getAttribute('opacity') === '0.3' || el.getAttribute('opacity') === '0.5') {
          el.setAttribute('fill', dark);
        } else {
          el.setAttribute('fill', body);
        }
      }
    });
    this.closest('.color-row').querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    this.classList.add('active');
    const label = this.closest('.slide-visual').querySelector('div[style*="font-size:12px"]');
    const names = {'car1':['Sport Racer','Sport Racer','Sport Racer','Sport Racer'],'car2':['City Cruiser','City Cruiser','City Cruiser','City Cruiser'],'car3':['Off-Road Beast','Off-Road Beast','Off-Road Beast','Off-Road Beast']};
    const colorNames = {
      '#D85A30':'Red','#185FA5':'Blue','#3B6D11':'Green','#888780':'Silver',
      '#D4537E':'Pink','#444441':'Matte Black','#BA7517':'Amber','#A32D2D':'Crimson','#5F5E5A':'Gunmetal','#0C447C':'Navy','#27500A':'Forest','#993C1D':'Burnt Orange'
    };
    const modelName = {'car1':'Sport Racer','car2':'City Cruiser','car3':'Off-Road Beast'};
    if (label) label.textContent = modelName[carId] + ' — ' + (colorNames[body] || '');
  });
});

let auto = setInterval(() => goTo(cur + 1), 4500);
const wrap = document.getElementById('wrap');
wrap.addEventListener('mouseenter', () => clearInterval(auto));
wrap.addEventListener('mouseleave', () => { auto = setInterval(() => goTo(cur + 1), 4500); });

let sx = 0;
wrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, {passive:true});
wrap.addEventListener('touchend', e => { const dx = sx - e.changedTouches[0].clientX; if (Math.abs(dx) > 40) goTo(dx > 0 ? cur + 1 : cur - 1); });