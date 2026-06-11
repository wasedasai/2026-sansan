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

window.addEventListener('scroll', () => {
  const section = document.querySelector('.sansanplan');
  const stickyWrapper = document.querySelector('.sticky-wrapper');
  const scrollContent = document.querySelector('.scroll-content');

  if (!section || !stickyWrapper || !scrollContent) return;

  // 1. セクション全体の大きさと画面上の位置をブラウザから直接取得
  const rect = section.getBoundingClientRect();
  
  // 2. 固定中の要素（sticky-wrapper）の高さ
  const stickyHeight = stickyWrapper.offsetHeight;
  
  // 3. 【重要】実際に「画面に固定されて横スクロールしている期間」の全体の長さを計算
  const totalScrollDistance = rect.height - stickyHeight;

  const buffer = 150;
  // 4. 【重要】現在の固定期間のスクロール量（固定が始まった瞬間を0とする）
  // 画面上部の固定位置（top: 220px）を基準に、どれだけセクションが上に通り過ぎたか
  const currentScrollProgress = -rect.top + 500;

  // 横に動かせる最大幅
  const contentWidth = scrollContent.scrollWidth - window.innerWidth;

  if (currentScrollProgress >= 0 && currentScrollProgress <= totalScrollDistance) {
    // 完全に固定期間中のとき：スクロールの比率（0〜1）を正確に計算
    const scrollRatio = currentScrollProgress / totalScrollDistance;
    const moveX = scrollRatio * contentWidth;
    
    scrollContent.style.transform = `translateX(-${moveX}px)`;
  } else if (currentScrollProgress < 0) {
    // まだ固定位置に達していない、または上に戻りきったとき
    scrollContent.style.transform = 'translateX(0px)';
  } else if (currentScrollProgress > totalScrollDistance) {
    // 固定期間が終わり、下に通り過ぎたとき
    scrollContent.style.transform = `translateX(-${contentWidth}px)`;
  }
});

window.addEventListener('scroll', () => {
  const section = document.querySelector('.staffplan');
  const stickyWrapper = document.querySelector('.sticky-wrapper2');
  const scrollContent = document.querySelector('.scroll-content2');

  if (!section || !stickyWrapper || !scrollContent) return;

  // 1. セクション全体の大きさと画面上の位置をブラウザから直接取得
  const rect = section.getBoundingClientRect();
  
  // 2. 固定中の要素（sticky-wrapper）の高さ
  const stickyHeight = stickyWrapper.offsetHeight;
  
  // 3. 【重要】実際に「画面に固定されて横スクロールしている期間」の全体の長さを計算
  const totalScrollDistance = rect.height - stickyHeight;

  const buffer = 150;
  // 4. 【重要】現在の固定期間のスクロール量（固定が始まった瞬間を0とする）
  // 画面上部の固定位置（top: 220px）を基準に、どれだけセクションが上に通り過ぎたか
  const currentScrollProgress = -rect.top + 500;

  // 横に動かせる最大幅
  const contentWidth = scrollContent.scrollWidth - window.innerWidth;

  if (currentScrollProgress >= 0 && currentScrollProgress <= totalScrollDistance) {
    // 完全に固定期間中のとき：スクロールの比率（0〜1）を正確に計算
    const scrollRatio = currentScrollProgress / totalScrollDistance;
    const moveX = scrollRatio * contentWidth;
    
    scrollContent.style.transform = `translateX(-${moveX}px)`;
  } else if (currentScrollProgress < 0) {
    // まだ固定位置に達していない、または上に戻りきったとき
    scrollContent.style.transform = 'translateX(0px)';
  } else if (currentScrollProgress > totalScrollDistance) {
    // 固定期間が終わり、下に通り過ぎたとき
    scrollContent.style.transform = `translateX(-${contentWidth}px)`;
  }
});