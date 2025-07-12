// Kalp Animasyonu
const hearts = []
const colors = ["#ff6b6b", "#ff9ff3", "#ffeaa7", "#ff7675", "#fab1a0"]

function createHeart() {
  const heart = document.createElement("div")
  heart.className = "floating-heart"

  // Rastgele boyut (15px - 30px)
  const size = Math.random() * 15 + 15
  heart.style.width = `${size}px`
  heart.style.height = `${size}px`

  // Rastgele pozisyon
  heart.style.left = Math.random() * 100 + "vw"

  // Rastgele renk
  const color = colors[Math.floor(Math.random() * colors.length)]
  heart.style.backgroundColor = color

  // Rastgele animasyon süresi (3s - 6s)
  heart.style.animationDuration = Math.random() * 3 + 3 + "s"

  // Rastgele gecikme (0s - 2s)
  heart.style.animationDelay = Math.random() * 2 + "s"

  document.body.appendChild(heart)
  hearts.push(heart)

  // 6 saniye sonra kaldır
  setTimeout(() => {
    heart.remove()
    hearts.splice(hearts.indexOf(heart), 1)
  }, 6000)
}

// Her 300ms'de bir kalp oluştur
setInterval(createHeart, 300)

// Kalp stillerini ekle
const style = document.createElement("style")
style.innerHTML = `
.floating-heart {
  width: 20px;
  height: 20px;
  background: #ff6b6b;
  position: fixed;
  top: -20px;
  transform: rotate(45deg);
  animation: heartfall linear forwards;
  z-index: 9999;
}

.floating-heart::before, 
.floating-heart::after {
  content: '';
  width: 100%;
  height: 100%;
  background: inherit;
  position: absolute;
  border-radius: 50%;
}

.floating-heart::before {
  top: -50%;
  left: 0;
}

.floating-heart::after {
  left: -50%;
  top: 0;
}

@keyframes heartfall {
  0% {
    transform: translateY(0) rotate(45deg) scale(1);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(45deg) scale(0.5);
    opacity: 0;
  }
}
`

document.head.appendChild(style)
