// 目標日時を設定する
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

// --- 目標日時等のコードはそのまま ---

// ===== 横スクロール（参加団体・参加者企画） =====
const setupScroll1 = () => {
  const section = document.querySelector('.sansanplan');
  const stickyWrapper = document.querySelector('.sticky-wrapper');
  const scrollContent = document.querySelector('.scroll-content');

  if (!section || !stickyWrapper || !scrollContent) return;

  // 1. 横に動かす中身の「本当の幅」を取得
  const contentWidth = scrollContent.scrollWidth;
  // 2. 画面の幅を取得
  const windowWidth = window.innerWidth;
  // 3. 【重要】親セクションの高さを、「横に動かす距離 ＋ 画面の高さ」に設定
  // こうすることで、横スクロールが終わるのと同時に縦セクションも終わります。
  section.style.height = `${(contentWidth - windowWidth) + window.innerHeight}px`;

  // スクロールイベント
  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const stickyHeight = stickyWrapper.offsetHeight;
    
    // 【修正点】固定位置をスマホかPCかで分ける
    const stickyOffset = windowWidth <= 768 ? 200 : 500;

    const totalScrollDistance = rect.height - window.innerHeight; // 高さを合わせているので計算が変わります
    const currentScrollProgress = -rect.top + stickyOffset;

    if (currentScrollProgress >= 0 && currentScrollProgress <= totalScrollDistance) {
      scrollContent.style.transform = `translateX(-${currentScrollProgress}px)`; // 比率ではなくそのままpxで動かす
    } else if (currentScrollProgress < 0) {
      scrollContent.style.transform = 'translateX(0px)';
    } else if (currentScrollProgress > totalScrollDistance) {
      scrollContent.style.transform = `translateX(-${totalScrollDistance}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll);
};

// ===== 横スクロール（運営スタッフ企画） =====
// ※ 上記と全く同じ構造で、クラス名だけ2用のものに変えます
const setupScroll2 = () => {
  const section = document.querySelector('.staffplan');
  const stickyWrapper = document.querySelector('.sticky-wrapper2');
  const scrollContent = document.querySelector('.scroll-content2');

  if (!section || !stickyWrapper || !scrollContent) return;

  const contentWidth = scrollContent.scrollWidth;
  const windowWidth = window.innerWidth;
  section.style.height = `${(contentWidth - windowWidth) + window.innerHeight}px`;

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    
    const stickyOffset = windowWidth <= 768 ? 400 : 500;

    const totalScrollDistance = rect.height - window.innerHeight; 
    const currentScrollProgress = -rect.top + stickyOffset;

    if (currentScrollProgress >= 0 && currentScrollProgress <= totalScrollDistance) {
      scrollContent.style.transform = `translateX(-${currentScrollProgress}px)`;
    } else if (currentScrollProgress < 0) {
      scrollContent.style.transform = 'translateX(0px)';
    } else if (currentScrollProgress > totalScrollDistance) {
      scrollContent.style.transform = `translateX(-${totalScrollDistance}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll);
};

// 実行
setupScroll1();
setupScroll2();

// 画面サイズが変わった時に高さを再計算する
window.addEventListener('resize', () => {
    setupScroll1();
    setupScroll2();
});

window.scrollTo(0, 0);

// ===== 初回のみ表示するローディング画面の処理 =====
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');

    if (!loadingScreen) return; // ローディング画面がないページでのエラー防止

    const isFirstVisit = !sessionStorage.getItem('visited_top_page');

    if (isFirstVisit) {
        sessionStorage.setItem('visited_top_page', 'true');

        if (loadingVideo) {
            // ローディング画面を消す処理を関数化
            const hideLoading = () => {
                loadingScreen.classList.add('is-hidden');
                setTimeout(() => {
                    if (loadingScreen.parentNode) { // エラー防止
                        loadingScreen.remove();
                    }
                }, 500);
            };

            // パターン1：動画が正常に最後まで再生されたら消す（元の処理）
            loadingVideo.addEventListener('ended', hideLoading);

            // パターン2：動画のパス間違い等でエラーになったらすぐ消す
            loadingVideo.addEventListener('error', hideLoading);

            // パターン3：【重要】強制終了のタイマー（フェイルセーフ）
            // 動画の自動再生がブロックされた場合に備え、〇秒後には強制的にローディングを消す
            // ※動画の秒数＋1〜2秒くらいに設定してください。（例: 6000 = 6秒）
            setTimeout(hideLoading, 6000);

        } else {
            // ビデオ要素自体がない場合はすぐ消す
            loadingScreen.remove();
        }
    } else {
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
    }
});
// 1. 全体を包む親の箱（.flow-box）を取得
const flowBox = document.querySelector('.flow-box');

// 親の箱が存在するときだけ動かす（エラー防止）
if (flowBox) {
  // 2. 画面に入ったときに実行する設定を作る
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // .flow-box が画面の中に入ったら...
      if (entry.isIntersecting) {
        // 親の箱に 'is-visible' というクラスを追加する
        entry.target.classList.add('is-visible');
        
        // 一度発動したら監視を解除する
        observer.unobserve(entry.target);
      }
    });
  }, {
    // 3. オプション設定：箱の上部が「20%」見えたら発動する
    threshold: 0.2
  });

  // 4. 監視システムをスタート！
  observer.observe(flowBox);
}
