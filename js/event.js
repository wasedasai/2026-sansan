
const searchClient = algoliasearch(
  '732PN87HX5', 
  '4645d549b664c3a9d54a378cef7a3385' 
);

const search = instantsearch({
  indexName: '早稲田祭参参サイト検索', 
  searchClient,
});
search.addWidgets([
  instantsearch.widgets.refinementList({
    container: '#facet-kikakuwaku',
    attribute: '企画',
    transformItems(items) {
      const allOptions = ['参加団体・参加者企画', '運営スタッフ企画']; 
      return allOptions.map(option => {
        const found = items.find(item => item.value === option);
        return found ? found : { label: option, value: option, count: 0, isRefined: false, highlighted: option };
      });
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#facet-date',
    attribute: '日時',
    transformItems(items) {
      const allOptions = ['祭当日以前', '7日', '8日', '両日'];
      
      // ▼ SVGの代わりにHTMLタグの構成を定義
      const customTexts = {
        '7日': `<p class="custom-date-text"><span class="date-num">11</span><span class="date-unit">月</span><span class="date-num">7</span><span class="date-unit">日</span><span class="normal-text">のみ</span></p>`,
        '8日': `<p class="custom-date-text"><span class="date-num">11</span><span class="date-unit">月</span><span class="date-num">8</span><span class="date-unit">日</span><span class="normal-text">のみ</span></p>`,
      };

      return allOptions.map(option => {
        const found = items.find(item => item.value === option);
        let finalItem = found ? { ...found } : { label: option, value: option, count: 0, isRefined: false };
        
        // ▼ テキスト構造を適用
        if (customTexts[finalItem.value]) {
          finalItem.customSvg = customTexts[finalItem.value];
        } else {
          finalItem.customSvg = `<span class="custom-date-normal">${finalItem.label}</span>`; 
        }
        
        return finalItem;
      });
    },

    templates: {
      item: `
        <label class="ais-RefinementList-label">
          <input class="ais-RefinementList-checkbox" type="checkbox" value="{{value}}" {{#isRefined}}checked{{/isRefined}}>
          <span class="ais-RefinementList-labelText" style="display: flex; align-items: center; gap: 6px;">
            {{{customSvg}}}
          </span>
        </label>
      `
    }
  }),

  instantsearch.widgets.refinementList({
    container: '#facet-boshu',
    attribute: '募集',
    transformItems(items) {
      const allOptions = ['あり', 'なし'];
      return allOptions.map(option => {
        const found = items.find(item => item.value === option);
        return found ? found : { label: option, value: option, count: 0, isRefined: false, highlighted: option };
      });
    },
  }),

  instantsearch.widgets.refinementList({
    container: '#facet-kojin',
    attribute: '個人参加',
    transformItems(items) {
      const allOptions = ['可', '不可'];
      return allOptions.map(option => {
        const found = items.find(item => item.value === option);
        return found ? found : { label: option, value: option, count: 0, isRefined: false, highlighted: option };
      });
    },
  }),
  instantsearch.widgets.stats({
    container: '#stats-container',
    templates: {
      text(data) {
        if (data.nbHits === 20) {
          return ''; 
        }
        return `${data.nbHits}件の検索結果`;
      },
    },
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
    templates: {
      resetLabel: '全ての条件をクリア',
    },
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <a href="{{pages}}" class="hit-card">
          <img src="{{img}}" alt="{{title}}" class="hit-image" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
          
          <div class="hit-content">
          <div class="hit-tags">
              <span class="hit-tag">{{企画}}</span>
              <span class="hit-tag date-{{日時}}">
                <span class="custom-date custom-7">11<span class="small-text">月</span>7<span class="small-text">日</span></span>
                <span class="custom-date custom-8">11<span class="small-text">月</span>8<span class="small-text">日</span></span>
                <span class="custom-date normal-date">{{日時}}</span>
              </span>
              <span class="hit-tag tag-{{募集}}">募集{{募集}}</span>
              <span class="hit-tag tag-{{個人参加}}">個人参加{{個人参加}}</span>
            </div>
            <h3 class="hit-title">
              {{title}}
            </h3>
          </div>
        </a>
      `,
      empty: `
      <div class="empty-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#cccccc"/>
        </svg>
        <h3>条件に一致する企画が見つかりませんでした</h3>
        <p>選択しているフィルターを解除して、別の条件でお試しください。</p>
      </div>
    `
    },
  })
]);

search.start();