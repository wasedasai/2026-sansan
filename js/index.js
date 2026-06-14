// ===== 1. 目標日時を設定する（カウントダウン） =====
const targetDate = new Date("2026-06-30T23:59:59").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // 締め切りを過ぎた場合の処理
  if (distance < 0) {
    document.getElementById("days").innerText = "0";
    // 必要に応じてテキスト全体を変更する処理を追加
    return;
  }

  // 残りミリ秒を日数に変換し、端数を切り上げる
  const days = Math.ceil(distance / (1000 * 60 * 60 * 24));

  // HTMLの数値を書き換える
  document.getElementById("days").innerText = days;
};

setInterval(updateCountdown, 1000);
updateCountdown();


// ===== 2. 横スクロール（参加団体・運営スタッフ企画 統合版） =====
const setupScroll = (sectionSelector, wrapperSelector, contentSelector, pcOffset, spOffset) => {
  const section = document.querySelector(sectionSelector);
  const stickyWrapper = document.querySelector(wrapperSelector);
  const scrollContent = document.querySelector(contentSelector);

  if (!section || !stickyWrapper || !scrollContent) return;

  // 高さを計算・設定する処理（リサイズ時にもこれだけを呼び出す）
  const updateLayout = () => {
    const contentWidth = scrollContent.scrollWidth;
    const windowWidth = window.innerWidth;
    section.style.height = `${(contentWidth - windowWidth) + window.innerHeight}px`;
  };

  // 初回レイアウト計算
  updateLayout();

  // スクロール処理（requestAnimationFrameでカクつき防止）
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowWidth = window.innerWidth;
        const stickyOffset = windowWidth <= 768 ? spOffset : pcOffset;
        
        const rect = section.getBoundingClientRect();
        const totalScrollDistance = scrollContent.scrollWidth - windowWidth; // 移動できる最大の横幅
        
        // オフセットを考慮して進行度を計算
        const currentScrollProgress = -rect.top + stickyOffset;

        // 範囲内に収める処理
        const translateX = Math.max(0, Math.min(currentScrollProgress, totalScrollDistance));
        scrollContent.style.transform = `translateX(-${translateX}px)`;

        ticking = false;
      });
      ticking = true;
    }
  };

  // イベント登録は初回のみ！
  window.addEventListener('scroll', handleScroll);
  // リサイズ時は「高さの再計算」だけを行う
  window.addEventListener('resize', updateLayout);
};

// 実行
setupScroll('.sansanplan', '.sticky-wrapper', '.scroll-content', 500, 200);
setupScroll('.staffplan', '.sticky-wrapper2', '.scroll-content2', 500, 400);


// ===== 3. 初回のみ表示するローディング画面の処理（Safari完全攻略版） =====
(() => {
  const initLoading = () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');

    if (!loadingScreen) return;

    // 画面を消す関数
    const hideLoading = () => {
      if (!loadingScreen.classList.contains('is-hidden')) {
        loadingScreen.classList.add('is-hidden');
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }
    };

    // 2回目以降のアクセスかチェック
    const isFirstVisit = !sessionStorage.getItem('visited_top_page');

    if (isFirstVisit) {
      sessionStorage.setItem('visited_top_page', 'true');

      if (loadingVideo) {
        // Safariに自動再生を「これなら安全」と認めさせるための最強設定一括念押し
        loadingVideo.muted = true;
        loadingVideo.playsInline = true;
        loadingVideo.setAttribute('muted', '');
        loadingVideo.setAttribute('playsinline', '');

        // Safariの再生ボタンを消し去るための強制play命令
        loadingVideo.play().catch((err) => {
          console.log("Safariが自動再生を拒否しました。裏で強制続行します:", err);
        });
      }

      // 【超重要】Safariの気まぐれに左右されない独立したタイマー
      setTimeout(() => {
        hideLoading();
      }, 3500); 

    } else {
      // 2回目以降は一瞬も見せずに即座に完全消去
      loadingScreen.style.display = 'none';
      loadingScreen.remove();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoading);
  } else {
    initLoading();
  }
})();


// ===== 4. スクロール連動のフェードイン演出（Intersection Observer） =====

// --- flow-box の表示 ---
const flowBox = document.querySelector('.flow-box');

if (flowBox) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(flowBox);
}

// --- 代表挨拶セクションの背景色変更＆文字浮かび上がり演出 ---
const greetingText = document.querySelector('.greeting-text');
const greetSection = document.querySelector('.represent-greet');

if (greetingText && greetSection) {
  const greetingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        greetSection.classList.add('is-active');
        greetingText.classList.add('is-visible');
      } else {
        greetSection.classList.remove('is-active');
        greetingText.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.3
  });

  greetingObserver.observe(greetingText);
}

// --- FAQの順番フェードイン ---
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.faq-item');

  const observer = new IntersectionObserver((entries) => {
    let delayCount = 0; 

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delayCount * 180); 
        
        delayCount++; 
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px', 
    threshold: 0
  });

  faqItems.forEach(item => {
    observer.observe(item);
  });
});