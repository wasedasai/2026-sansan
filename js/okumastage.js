document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.hero-section');
  const overlayBlue = document.querySelector('.hero-overlay-blue');
  const overlayOrange = document.querySelector('.hero-overlay-orange');
  
  if (heroSection) {
    // 1. まずは背景画像を即座にフェードイン
    setTimeout(() => {
      heroSection.classList.add('is-active');
    }, 100);

    // 2. 0.7秒後（背景がしっかり出た頃）に、青とオレンジをなめらかに登場させる
    setTimeout(() => {
      if (overlayBlue) overlayBlue.classList.add('is-animated');
      if (overlayOrange) overlayOrange.classList.add('is-animated');
    }, 800);
  }
});