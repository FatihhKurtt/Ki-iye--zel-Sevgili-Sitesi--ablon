// AOS Animasyon Kütüphanesi Başlatma
document.addEventListener("DOMContentLoaded", () => {
  // AOS Animasyon Kütüphanesi
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // LightGallery Kütüphanesi
  lightGallery(document.getElementById("lightgallery"), {
    speed: 500,
    download: false,
  })

  // Swiper Slider Kütüphanesi
  const quotesSwiper = new Swiper(".quotes-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // İlişki Gün Sayacı
  calculateDays()

  // Özel Günler Sayaçları
  startCountdowns()

  // Sayfa yüklendiğinde müziği otomatik başlat
  setTimeout(() => {
    toggleMusic()
  }, 2000)
})

// Müzik Playlist
const musicFiles = [
  "https://cdn.pixabay.com/download/audio/2022/01/20/audio_dc39bbc7aa.mp3", // Romantik piyano müziği
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8a7a18303.mp3", // Romantik gitar müziği
  "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc7d733.mp3", // Romantik orkestra müziği
]
let currentTrack = 0
const musicPlayer = document.getElementById("background-music")

function toggleMusic() {
  if (musicPlayer.paused) {
    musicPlayer.src = musicFiles[currentTrack]
    musicPlayer.play()
    document.querySelector(".music-btn").classList.add("active")
    document.querySelector(".music-playing-indicator").classList.add("active")
  } else {
    musicPlayer.pause()
    document.querySelector(".music-btn").classList.remove("active")
    document.querySelector(".music-playing-indicator").classList.remove("active")
  }
}

musicPlayer.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % musicFiles.length
  musicPlayer.src = musicFiles[currentTrack]
  musicPlayer.play()
})

// Gece Modu
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode")
  const themeBtn = document.querySelector(".theme-btn")
  themeBtn.classList.toggle("active")

  // Tema tercihini localStorage'a kaydet
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
  } else {
    localStorage.setItem("theme", "light")
  }
}
// Sayfa yüklendiğinde tema tercihini kontrol et
;(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode")
    document.querySelector(".theme-btn").classList.add("active")
  }
})()

// İlişki Gün Sayacı
function calculateDays() {
  const startDate = new Date("2022-02-14") // İlişki başlangıç tarihi
  const today = new Date()
  const difference = today - startDate
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  document.getElementById("counter").innerHTML = `Birlikte ${days} gündür aşk yaşıyoruz!`
}

// Özel Günler Sayaçları
function startCountdowns() {
  const currentYear = new Date().getFullYear()

  // Yıl dönümü - 14 Şubat
  updateCountdown(`${currentYear}-02-14`, "anniversary-countdown", `${currentYear + 1}-02-14`)

  // Doğum günü 1 - 5 Mayıs
  updateCountdown(`${currentYear}-05-05`, "birthday1-countdown", `${currentYear + 1}-05-05`)

  // Doğum günü 2 - 10 Ekim
  updateCountdown(`${currentYear}-10-10`, "birthday2-countdown", `${currentYear + 1}-10-10`)

  // Yılbaşı - 31 Aralık
  updateCountdown(`${currentYear}-12-31`, "newyear-countdown", `${currentYear + 1}-12-31`)

  // Her saniye güncelle
  setInterval(() => {
    updateCountdown(`${currentYear}-02-14`, "anniversary-countdown", `${currentYear + 1}-02-14`)

    updateCountdown(`${currentYear}-05-05`, "birthday1-countdown", `${currentYear + 1}-05-05`)

    updateCountdown(`${currentYear}-10-10`, "birthday2-countdown", `${currentYear + 1}-10-10`)

    updateCountdown(`${currentYear}-12-31`, "newyear-countdown", `${currentYear + 1}-12-31`)
  }, 1000)
}

function updateCountdown(dateStr, elementId, nextYearDateStr) {
  const targetDate = new Date(dateStr)
  const now = new Date()

  // Eğer bu yılki tarih geçtiyse, gelecek yılı hedefle
  let finalTargetDate = targetDate
  if (now > targetDate) {
    finalTargetDate = new Date(nextYearDateStr)
  }

  const timeLeft = finalTargetDate - now

  // Gün, saat, dakika hesapla
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  // Sayaç elementlerini güncelle
  const countdownElement = document.getElementById(elementId)
  if (countdownElement) {
    const numbersElements = countdownElement.querySelectorAll(".countdown-number")

    if (numbersElements.length >= 3) {
      numbersElements[0].textContent = days.toString().padStart(2, "0")
      numbersElements[1].textContent = hours.toString().padStart(2, "0")
      numbersElements[2].textContent = minutes.toString().padStart(2, "0")
    }
  }
}

// Video oynatma fonksiyonu
function playVideo(videoSrc, posterSrc) {
  const videoElement = document.querySelector(".video-container video")
  videoElement.src = videoSrc
  videoElement.poster = posterSrc
  videoElement.load()
  videoElement.play()

  // Videoyu görünür alana kaydır
  document.querySelector(".video-container").scrollIntoView({
    behavior: "smooth",
  })
}
