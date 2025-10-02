const fs = require('fs')
const path = require('path')

// constante para armazenar o local onde ficarão gravados os snapshops
const SHOTS_DIR = process.env.SCREENSHOTS_DIR

// garantir que o nome do arquivo seja compátivel
function safe_name(name){
    return String(name).replace(/[^\w\d-_.]+/g, '_').slice(0, 120)
}
/** 
 * salvar o screenshot quando solicitado, com nome amigável
 * @param { import('@playwright/test').Page} page
 * @param { import('@playwright/test').TestInfo} test_info
 * @param { string } label
*/
async function snap(page, test_info, label){
    const file = `${safe_name(test_info.title)}__${safe_name(label)}.png`
    const dest = path.join(SHOTS_DIR, file)

    fs.mkdirSync(SHOTS_DIR, { recursive: true })
    await page.screenshot({ path: dest, fullPage: true}) // tira o print
    return dest
}

module.exports = { snap }