// script.js (このファイルには <script> タグは不要です)

document.addEventListener('DOMContentLoaded', () => {
    const dropTags = document.querySelectorAll('.drop-tag');

    dropTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            const parentItem = tag.closest('.nav-item');
            
            // 他の開いているメニューを閉じる（1つだけ開く仕様にする場合）
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