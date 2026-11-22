// =========================================================================
// ⚙️ KHU VỰC CẤU HÌNH THÔNG TIN (BẠN TỰ CHỈNH SỬA TẠI ĐÂY)
// =========================================================================
const CONFIG = {
  // 1. Tên người nhận (Crush):
  to: "Kim Phụng",

  // 2. Tên người gửi (Bạn):
  from: "Minh",

  // 3. Lời nhắn gửi sau khi người ấy bấm "Đồng ý":
  msg: `Từ giây phút này, cậu chính là điều ngọt ngào nhất trong cuộc sống của tớ. Tớ hứa sẽ luôn quan tâm, yêu thương, lắng nghe và mang lại thật nhiều niềm vui cho cậu mỗi ngày! 💕`
};
// =========================================================================

// Cập nhật thông tin ra màn hình
function applyConfig() {
  document.querySelectorAll('.crush-name-text').forEach(el => {
    el.textContent = CONFIG.to;
  });
  
  const senderEl = document.getElementById('senderNameText');
  if (senderEl) senderEl.textContent = CONFIG.from;

  const msgEl = document.getElementById('loveMessageBody');
  if (msgEl) msgEl.textContent = CONFIG.msg;

  // Cập nhật tiêu đề tab trình duyệt
  document.title = `Gửi ${CONFIG.to} ❤️ Điều tớ muốn nói...`;
}

applyConfig();

// ==========================================
// 1. HIỆU ỨNG CANVAS TRÁI TIM BAY (BACKGROUND)
// ==========================================
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
let hearts = [];
let confettiList = [];
let isConfettiActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingHeart {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 50;
    this.size = Math.random() * 14 + 10;
    this.speedY = Math.random() * 1.4 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = ['#ff4d79', '#ff7597', '#ffa3b8', '#ff3366'][Math.floor(Math.random() * 4)];
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const d = this.size;
    const x = this.x;
    const y = this.y;
    // Vẽ hình trái tim
    ctx.moveTo(x, y + d / 4);
    ctx.quadraticCurveTo(x, y, x + d / 4, y);
    ctx.quadraticCurveTo(x + d / 2, y, x + d / 2, y + d / 4);
    ctx.quadraticCurveTo(x + d / 2, y, x + (d * 3) / 4, y);
    ctx.quadraticCurveTo(x + d, y, x + d, y + d / 4);
    ctx.quadraticCurveTo(x + d, y + d / 2, x + (d * 3) / 4, y + (d * 3) / 4);
    ctx.lineTo(x + d / 2, y + d);
    ctx.lineTo(x + d / 4, y + (d * 3) / 4);
    ctx.quadraticCurveTo(x, y + d / 2, x, y + d / 4);
    ctx.fill();
    ctx.restore();
  }
}

// Khởi tạo trái tim nền
for (let i = 0; i < 28; i++) {
  const h = new FloatingHeart();
  h.y = Math.random() * canvas.height;
  hearts.push(h);
}

// Lớp Confetti cho lúc bấm Đồng Ý
class ConfettiParticle {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 12 + 4;
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity - 3;
    this.gravity = 0.22;
    this.size = Math.random() * 9 + 5;
    this.color = ['#ff3366', '#ff9ff3', '#feca57', '#54a0ff', '#1dd1a1', '#ff6b6b', '#ffd32a'][Math.floor(Math.random() * 7)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 12;
    this.opacity = 1;
    this.shape = Math.random() > 0.4 ? 'circle' : 'rect';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.rotSpeed;
    this.opacity -= 0.007;
  }
  draw() {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
    }
    ctx.restore();
  }
}

function loopAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Vẽ nền trái tim bay
  hearts.forEach(h => {
    h.update();
    h.draw();
  });

  // Vẽ Confetti khi kích hoạt
  if (isConfettiActive) {
    for (let i = confettiList.length - 1; i >= 0; i--) {
      const p = confettiList[i];
      p.update();
      p.draw();
      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        confettiList.splice(i, 1);
      }
    }
    // Bắn bổ sung nếu còn thời gian
    if (Math.random() < 0.25) {
      for (let k = 0; k < 4; k++) confettiList.push(new ConfettiParticle());
    }
  }

  requestAnimationFrame(loopAnimation);
}
loopAnimation();

function triggerConfettiShower() {
  isConfettiActive = true;
  for (let i = 0; i < 120; i++) {
    confettiList.push(new ConfettiParticle());
  }
  setTimeout(() => {
    isConfettiActive = false;
  }, 7000);
}

// ==========================================
// 2. ÂM THANH LÃNG MẠN (WEB AUDIO SYNTHESIZER)
// ==========================================
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playMelodyNote(freq, duration = 0.5, type = 'sine') {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

const romanticNotes = [
  523.25, 587.33, 659.25, 783.99, 880.00, 659.25, 783.99, 1046.50
];
let noteIndex = 0;

function toggleMusic() {
  initAudio();
  const icon = document.getElementById('musicIcon');
  if (isMusicPlaying) {
    isMusicPlaying = false;
    clearInterval(musicInterval);
    icon.textContent = '🔇';
  } else {
    isMusicPlaying = true;
    icon.textContent = '🎶';
    musicInterval = setInterval(() => {
      playMelodyNote(romanticNotes[noteIndex], 0.8, 'triangle');
      noteIndex = (noteIndex + 1) % romanticNotes.length;
    }, 450);
  }
}

document.getElementById('musicToggleBtn').addEventListener('click', toggleMusic);

function playSuccessChime() {
  initAudio();
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
  notes.forEach((f, i) => {
    setTimeout(() => {
      playMelodyNote(f, 0.7, 'sine');
    }, i * 110);
  });
}

// ==========================================
// 3. CHUYỂN ĐỔI GIAI ĐOẠN (STAGES)
// ==========================================
const envelopeSection = document.getElementById('envelopeSection');
const questionSection = document.getElementById('questionSection');
const acceptedSection = document.getElementById('acceptedSection');
const envelopeCard = document.getElementById('envelopeCard');
const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');

function openLetter() {
  initAudio();
  const flap = document.querySelector('.envelope-flap');
  const letter = document.querySelector('.envelope-letter-preview');
  
  flap.style.transform = 'rotateX(180deg)';
  flap.style.zIndex = '1';
  letter.style.transform = 'translateY(-60px)';

  setTimeout(() => {
    envelopeSection.classList.remove('active-stage');
    envelopeSection.classList.add('hidden-stage');

    questionSection.classList.remove('hidden-stage');
    questionSection.classList.add('active-stage');
    
    if (!isMusicPlaying) toggleMusic();
  }, 700);
}

envelopeCard.addEventListener('click', openLetter);
openEnvelopeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openLetter();
});

// ==========================================
// 4. NÚT "KHÔNG NHA" CHẠY TRỐN THÔNG MINH
// ==========================================
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtnText = document.getElementById('noBtnText');
const playground = document.getElementById('playground');

let dodgeCount = 0;
let yesScale = 1;

const naughtyQuotes = [
  'Nghĩ lại đii! 🥺',
  'Thật sự luôn? 💔',
  'Đừng bấm tớ mò! 😭',
  'Bấm nút đỏ đi mà! 👉',
  'Không cho bấm đâu lêu lêu 😝',
  'Nút này hỏng rùi nha 🛠️',
  'Hic, đừng từ chối tớ mà... 😢',
  'Vẫn đuổi theo bấm à? Bướng thế! 😼',
  'Cậu trốn không thoát tớ đâu! 💖'
];

function dodgeButton(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  dodgeCount++;
  noBtnText.textContent = naughtyQuotes[dodgeCount % naughtyQuotes.length];

  yesScale = Math.min(yesScale + 0.12, 1.8);
  yesBtn.style.transform = `scale(${yesScale})`;

  const padding = 20;
  const btnWidth = noBtn.offsetWidth || 120;
  const btnHeight = noBtn.offsetHeight || 44;

  const maxX = window.innerWidth - btnWidth - padding;
  const maxY = window.innerHeight - btnHeight - padding;

  const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
  const randomY = Math.max(padding + 60, Math.floor(Math.random() * maxY));

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.zIndex = '999';
}

noBtn.addEventListener('mouseenter', dodgeButton);
noBtn.addEventListener('touchstart', dodgeButton, { passive: false });
noBtn.addEventListener('click', dodgeButton);

// ==========================================
// 5. XỬ LÝ KHI BẤM "ĐỒNG Ý LUÔN"
// ==========================================
yesBtn.addEventListener('click', () => {
  playSuccessChime();
  triggerConfettiShower();

  questionSection.classList.remove('active-stage');
  questionSection.classList.add('hidden-stage');

  acceptedSection.classList.remove('hidden-stage');
  acceptedSection.classList.add('active-stage');
});

// Xem lại từ đầu
document.getElementById('replayBtn').addEventListener('click', () => {
  location.reload();
});
