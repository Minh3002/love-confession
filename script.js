// =========================================================================
// ⚙️ KHU VỰC CẤU HÌNH THÔNG TIN (BẠN TỰ CHỈNH SỬA TẠI ĐÂY)
// =========================================================================
const CONFIG = {
  // 1. Tên người nhận (Crush của bạn):
  to: "Kim Phụng",

  // 2. Tên người gửi (Bạn):
  from: "Minh",

  // 3. Lời nhắn chân thành khi người ấy bấm "Đồng ý":
  msg: `Từ giây phút này, cậu chính là điều ngọt ngào nhất trong cuộc sống của tớ. Tớ hứa sẽ luôn quan tâm, yêu thương, lắng nghe và mang lại thật nhiều niềm vui cho cậu mỗi ngày! 💕`
};
// =========================================================================

// Khởi tạo hiển thị dữ liệu
function applyConfig() {
  document.querySelectorAll('.crush-name-display').forEach(el => {
    el.textContent = CONFIG.to;
  });

  const senderEl = document.getElementById('senderNameDisplay');
  if (senderEl) senderEl.textContent = CONFIG.from;

  document.title = `Gửi ${CONFIG.to} ❤️ Điều tớ muốn nói...`;
}
applyConfig();

// =========================================================================
// 1. CANVAS NỀN: TRÁI TIM 3D & HẠT SÁNG LUNG LINH (60 FPS)
// =========================================================================
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let confettiList = [];
let isConfettiActive = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class AmbientParticle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 40;
    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 0.9 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.5 + 0.25;
    this.type = Math.random() > 0.35 ? 'heart' : 'sparkle';
    this.color = ['#ff4d6d', '#ff758f', '#ffb3c6', '#c9184a', '#ffd1dc'][Math.floor(Math.random() * 5)];
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    
    if (this.type === 'heart') {
      const d = this.size;
      const x = this.x;
      const y = this.y;
      ctx.beginPath();
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
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

for (let i = 0; i < 30; i++) {
  const p = new AmbientParticle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

// Lớp Confetti & Cánh hoa hồng rơi khi bấm Đồng Ý
class LuxuryConfetti {
  constructor() {
    this.x = canvas.width / 2 + (Math.random() - 0.5) * 80;
    this.y = canvas.height / 2;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 14 + 5;
    this.vx = Math.cos(angle) * velocity;
    this.vy = Math.sin(angle) * velocity - 4;
    this.gravity = 0.25;
    this.size = Math.random() * 11 + 6;
    this.color = ['#ff4d6d', '#ff758f', '#c9184a', '#ffd700', '#ffffff', '#ff85a1', '#70d6ff'][Math.floor(Math.random() * 7)];
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 14;
    this.opacity = 1;
    this.isPetal = Math.random() > 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.rotation += this.rotSpeed;
    this.opacity -= 0.006;
  }
  draw() {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;

    if (this.isPetal) {
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.8);
    }
    ctx.restore();
  }
}

function loopAmbient() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  if (isConfettiActive) {
    for (let i = confettiList.length - 1; i >= 0; i--) {
      const c = confettiList[i];
      c.update();
      c.draw();
      if (c.opacity <= 0 || c.y > canvas.height + 60) {
        confettiList.splice(i, 1);
      }
    }
    if (Math.random() < 0.3) {
      for (let k = 0; k < 4; k++) confettiList.push(new LuxuryConfetti());
    }
  }

  requestAnimationFrame(loopAmbient);
}
loopAmbient();

function launchGrandConfetti() {
  isConfettiActive = true;
  for (let i = 0; i < 150; i++) {
    confettiList.push(new LuxuryConfetti());
  }
  setTimeout(() => {
    isConfettiActive = false;
  }, 8000);
}

// =========================================================================
// 2. ÂM THANH NỀN: GIAI ĐIỆU HARP/PIANO LOFI DU DƯƠNG (WEB AUDIO API)
// =========================================================================
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function ensureAudioReady() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playWarmChordTone(freq, duration = 1.0, gainVal = 0.08) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

const romanticProgression = [
  [523.25, 659.25], // C5 + E5
  [587.33, 783.99], // D5 + G5
  [659.25, 880.00], // E5 + A5
  [783.99, 1046.50],// G5 + C6
  [659.25, 880.00], // E5 + A5
  [587.33, 783.99]  // D5 + G5
];
let chordIndex = 0;

function toggleMusic() {
  ensureAudioReady();
  const musicPill = document.getElementById('musicToggleBtn');
  const label = document.getElementById('musicLabel');

  if (isMusicPlaying) {
    isMusicPlaying = false;
    clearInterval(musicInterval);
    musicPill.classList.remove('playing');
    label.textContent = 'Bật nhạc chill ✨';
  } else {
    isMusicPlaying = true;
    musicPill.classList.add('playing');
    label.textContent = 'Đang phát nhạc 💕';
    
    musicInterval = setInterval(() => {
      const chord = romanticProgression[chordIndex];
      playWarmChordTone(chord[0], 1.2, 0.07);
      setTimeout(() => {
        playWarmChordTone(chord[1], 1.0, 0.05);
      }, 180);
      chordIndex = (chordIndex + 1) % romanticProgression.length;
    }, 750);
  }
}

document.getElementById('musicToggleBtn').addEventListener('click', toggleMusic);

function playCelebrationChime() {
  ensureAudioReady();
  const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
  chimeNotes.forEach((f, i) => {
    setTimeout(() => {
      playWarmChordTone(f, 1.2, 0.09);
    }, i * 120);
  });
}

// =========================================================================
// 3. MỞ PHONG BÌ THƯ VINTAGE (GIAI ĐOẠN 1 -> GIAI ĐOẠN 2)
// =========================================================================
const envelopeStage = document.getElementById('envelopeStage');
const questionStage = document.getElementById('questionStage');
const successStage = document.getElementById('successStage');
const envelopeBox = document.getElementById('envelopeBox');
const waxSealBtn = document.getElementById('waxSealBtn');

function openLoveEnvelope() {
  ensureAudioReady();
  if (!isMusicPlaying) toggleMusic();

  const flap = document.querySelector('.envelope-top-flap');
  const letterCard = document.querySelector('.inside-letter-card');
  const seal = document.getElementById('waxSealBtn');

  seal.style.transform = 'translateX(-50%) scale(1.4)';
  seal.style.opacity = '0';
  
  setTimeout(() => {
    flap.style.transform = 'rotateX(180deg)';
    flap.style.zIndex = '2';
    letterCard.style.transform = 'translateY(-75px)';
  }, 200);

  setTimeout(() => {
    envelopeStage.classList.remove('active-stage');
    envelopeStage.classList.add('hidden-stage');

    questionStage.classList.remove('hidden-stage');
    questionStage.classList.add('active-stage');
  }, 950);
}

envelopeBox.addEventListener('click', openLoveEnvelope);
waxSealBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openLoveEnvelope();
});

// =========================================================================
// 4. CÁCH 3: CHÚ GẤU NÀI NỈ XIN CƠ HỘI (PERSUASION DIALOG)
// =========================================================================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const yesBtnText = document.getElementById('yesBtnText');
const noBtnText = document.getElementById('noBtnText');
const speechBubble = document.getElementById('speechBubble');
const speechText = document.getElementById('speechText');

// Các bộ phận SVG của chú gấu để thay đổi biểu cảm
const mascotMouth = document.getElementById('mascotMouth');
const tearDrops = document.getElementById('tearDrops');
const earLeft = document.getElementById('earLeft');
const earRight = document.getElementById('earRight');
const floatingProp = document.getElementById('floatingProp');

let refuseCount = 0;

// Kịch bản nài nỉ từng bước của chú Gấu
const persuasionSteps = [
  {
    // Lần từ chối 1
    speech: "Cậu nghĩ lại đi mừ... Tớ biết nấu ăn, biết lắng nghe và chiều cậu nhất trần đời luôn á! 🥺🍳",
    yesText: "Thử nghĩ lại & Đồng ý ❤️",
    noText: "Vẫn không nha 😼",
    prop: "🍳",
    mouth: "M94 116 Q100 110 106 116", // Mếu nhẹ
    tears: 0,
    earY: 58
  },
  {
    // Lần từ chối 2
    speech: "Tớ hứa mua trà sữa, đưa cậu đi ăn ngon, dạo phố và chụp ảnh xinh cho cậu mỗi tuần luôn nè! 🧋🛵",
    yesText: "Chốt deal luônnn! 💖",
    noText: "Chưa chịu đâu 🙈",
    prop: "🧋",
    mouth: "M94 116 Q100 108 106 116", // Mếu hơn
    tears: 0,
    earY: 62
  },
  {
    // Lần từ chối 3
    speech: `Huhu ${CONFIG.to} ơi cậu nỡ lòng nào từ chối tớ sao... Trái tim tớ tan vỡ mất thui! 😭💔`,
    yesText: "Thương quá, đồng ý luônnn! 🥰",
    noText: "",
    prop: "💔",
    mouth: "M92 110 Q100 126 108 110", // Há to khóc
    tears: 1,
    earY: 66
  }
];

function handleRefuse() {
  refuseCount++;

  // Thêm hiệu ứng rung lắc nhẹ khi bấm nút Không
  noBtn.classList.remove('shake-anim');
  void noBtn.offsetWidth; // Trigger reflow
  noBtn.classList.add('shake-anim');

  // Lấy dữ liệu của bước nài nỉ tương ứng
  const stepIdx = Math.min(refuseCount - 1, persuasionSteps.length - 1);
  const currentStep = persuasionSteps[stepIdx];

  // 1. Cập nhật bong bóng thoại
  speechText.textContent = currentStep.speech;
  speechBubble.classList.remove('bubble-pop-anim');
  void speechBubble.offsetWidth;
  speechBubble.classList.add('bubble-pop-anim');

  // 2. Cập nhật chữ trên các nút
  yesBtnText.textContent = currentStep.yesText;

  // 3. Thay đổi biểu cảm chú Gấu
  if (mascotMouth) mascotMouth.setAttribute('d', currentStep.mouth);
  if (tearDrops) tearDrops.setAttribute('opacity', currentStep.tears);
  if (floatingProp) floatingProp.textContent = currentStep.prop;

  // Cụp tai gấu nhẹ theo mức độ buồn
  if (earLeft && earRight) {
    earLeft.setAttribute('cy', currentStep.earY);
    earRight.setAttribute('cy', currentStep.earY);
  }

  // 4. Nếu đến lần 3: Nút "Không" biến mất hoàn toàn
  if (refuseCount >= 3) {
    noBtn.style.transition = 'all 0.5s ease';
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0.5)';
    noBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      noBtn.style.display = 'none';
    }, 500);

    // Nút "Đồng ý" phóng to và trở thành tâm điểm duy nhất
    yesBtn.style.transform = 'scale(1.08)';
    yesBtn.style.boxShadow = '0 16px 40px rgba(255, 51, 102, 0.6)';
  } else {
    noBtnText.textContent = currentStep.noText;
  }
}

noBtn.addEventListener('click', handleRefuse);

// =========================================================================
// 5. GIAI ĐOẠN 3: KHI BẤM "ĐỒNG Ý" - BẮN PHÁO HOA & GÕ CHỮ THƯ TAY
// =========================================================================
const letterBodyText = document.getElementById('letterBodyText');

function typeWriterEffect(text, element, speed = 25) {
  element.textContent = '';
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

yesBtn.addEventListener('click', () => {
  playCelebrationChime();
  launchGrandConfetti();

  questionStage.classList.remove('active-stage');
  questionStage.classList.add('hidden-stage');

  successStage.classList.remove('hidden-stage');
  successStage.classList.add('active-stage');

  // Hiệu ứng chữ gõ tay từng chữ lãng mạn
  if (letterBodyText) {
    typeWriterEffect(CONFIG.msg, letterBodyText, 22);
  }
});

// Xem lại từ đầu
document.getElementById('replayBtn').addEventListener('click', () => {
  location.reload();
});
