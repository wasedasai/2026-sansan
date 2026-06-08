// ① ドロップダウンメニューの処理（HTMLの読み込み完了時に実行）
document.addEventListener('DOMContentLoaded', () => {
    const dropTags = document.querySelectorAll('.drop-tag');

    dropTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            const parentItem = tag.closest('.nav-item');
            
            // 他の開いているメニューを閉じる
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('is-open');
                }
            });

            // クリックしたメニューの開閉を切り替え
            parentItem.classList.toggle('is-open');
        });
    });

    // メニューの外側をクリックしたら全て閉じる
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item.dropdown')) {
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('is-open');
            });
        }
    });
});

// ② 文字色変更アニメーションの処理（ページ全体の読み込み完了時に実行）
window.addEventListener('load', function() {
    // 効果をわかりやすくするため、少しだけ遅延（0.5秒）させてアニメーションを開始
    setTimeout(function() {
        const targets = document.querySelectorAll('.color-wipe');
        targets.forEach(function(target) {
            target.classList.add('is-active');
        });
    }, 500); 
});