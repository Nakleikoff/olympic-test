const baseScript = require('./onReady.cjs');
module.exports = async (page, scenario, vp) => {
  await baseScript(page, scenario, vp);
  await page.evaluate(() => {
    const navItem = document.querySelector('.site-navigation-item');
    if (navItem) {
      const copy = navItem.cloneNode(true);
      document.querySelector('.site-navigation').appendChild(copy);
    }
  })
}
