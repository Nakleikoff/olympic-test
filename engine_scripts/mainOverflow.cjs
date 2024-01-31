const baseScript = require('./onReady.cjs');
module.exports = async (page, scenario, vp) => {
  await baseScript(page, scenario, vp);
  await page.evaluate(() => {
    const el = document.querySelector('.hero h1');
    if (el) {
      el.textContent = 'Приключение и открытия и многое другое в мире яхт';
    }
  })
}
