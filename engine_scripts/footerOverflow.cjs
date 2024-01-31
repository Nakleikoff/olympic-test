const baseScript = require('./onReady.cjs');
module.exports = async (page, scenario, vp) => {
  await baseScript(page, scenario, vp);
  await page.evaluate(() => {
    const navItem = document.querySelector('.footer-navigation-item');
    if (navItem) {
      const copy = navItem.cloneNode(true);
      document.querySelector('.footer-navigation').appendChild(copy);
      const el = document.querySelector('.footer-navigation-topic h2')
      el.textContent = 'Компания яхт-клуба и главные разделы нашего сайта';
    }
  })
}
