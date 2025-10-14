const { defineConfig, devices } = require('@playwright/test')
const path = require('path')
const { compute_run_folder, ensure_subdirs } = require('./utils/path_tools')

// Diretórios onde ficam os artefatos
const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts') // nome pasta raiz
const runDir = compute_run_folder(ARTIFACTS_ROOT)
const { resultsDir, screenshotsDir } = ensure_subdirs(runDir)

// Expõe caminhos de diretórios como variaveis de ambiente
process.env.RUN_DIR         = runDir
process.env.SCREENSHOTS_DIR = screenshotsDir

module.exports = defineConfig({
    testDir: '.tests',   // nossos testes estão na pasta tests
    timeout: 30000,      // 30_000 = 30 segundos
    fullyParallel: true, // execução em paralelo / multi thread
    outputDir: resultsDir,
    testDir: './tests', 
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false, // false - exibe o browser e true oculta
        // Politicas globais de artefatos automaticos
        screenshot: 'only-on-failure',   // apenas quando der erro
        video:      'retain-on-failure', // salva o vídeo, se houver erro
        trace:      'retain-on-failure', // salva o trace, se houver erro

        // outros tipos de timeout
        actionTimeout: 15000, // timeout se nada estiver acontecendo em 15s
        navigationTimeout: 20000, // timeout se parar o navegador

        launchOptions: {
            slowMo: 0    // espere 1 segundo entre cada ação
        }
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome']}
        }
    ]


})