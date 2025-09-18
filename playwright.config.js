const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false, // false - exibe o browser e true oculta
        launchOptions: {
            slowMo: 500    // espere 1 segundo entre cada ação
        }
    }
})