// snapshot = print --> queremos quando falha e quando passa
// 1 print ou N por execução? N
// Criar uma pasta chamada Snapshots e colocar todos os prints dentro
// Organize as datas no formato universal

// Bibliotecas
const fs = require('fs') // File System / biblioteca do Sistema Operacional
const path = require('path') // biblioteca de caminhos de pastas/arquivos

// Formatar números com zero na frente, se precisar
function pad2(num) { return String(num).padStart(2, '0')
}

// Função para definir data e hora baseado no momento da execução
function compute_run_folder(baseDir){
    // Cria o carimbo de data via CI (Integração Continua)
    if (process.env.RUN_TAG){ // == true
        const tag = process.env.RUN_TAG.replace(/[^\w-:.]/g, '_') // CI
        const runDir = path.join(baseDir, tag)
        fs.mkdirSync(runDir, {recursive: true})
        return runDir
    }

    // Verifica data e hora
    const now = new Date()  // perguntar para o computador que dia e horas são
    const yyyy = now.getFullYear()      // Ano com 4 dígitos
    const MM = pad2(now.getMonth())     // Mês com 2 digitos
    const dd = pad2(now.getDate())      // Dia com 2 digitos
    const HH = pad2(now.getHours())     // Hora com 2 digitos
    const mm = pad2(now.getMinutes())   // Minutos com 2 digitos
    const ss = pad2(now.getSeconds())   // Segundos com 2 digitos

    // const Mes = String(now.getMonth()).padStart(2, '0')    
    // const Dia = String(now.getDate()).padStart(2, '0')   

    // Criar as pastas
    const runDir = path.join(baseDir, `${yyyy}`, `${MM}`, `${dd}`, `${HH}-${mm}-${ss}`)
    fs.mkdirSync(runDir, {recursive: true})
    return runDir
   
}

// Cria subpastas dentro da estrutura de datas e horas
function ensure_subdirs(runDir){
    const dirs = {
        runDir,
        resultsDir:     path.join(runDir, 'test-results'),
        screenshotsDir: path.join(runDir, 'screenshots')
    }

    Object.values(dirs).forEach(d => { // d = diretorio (subdiretorio)
        if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true})
    })
    return dirs
}

module.exports = { compute_run_folder, ensure_subdirs }