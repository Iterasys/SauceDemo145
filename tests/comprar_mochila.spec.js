// 1 - Referência e bibliotecas
// Declara um objeto chamado test vindo da biblioteca Playwrigth
const { test, expect } = require('@playwright/test')

// 2 - Classe ou Funções ou Métódos
// Um script pode executar de forma:
// - Sincrona: Simultâneo. Ex.: ligação de voz
// - Assincrona: Separados. Ex.: mensagem de texto no WhatsApp
test('Realizar o fluxo de compra da mochila', async ({page}) => {
  
    await page.goto('/') // abre o browser no site alvo
    await expect(page).toHaveURL('/')            // verifica se está na página raiz
    const botao_login = page.locator('#login-button')
    await expect(botao_login).toHaveText('Login') // verifica elemento escrito Login
    
    // Página Inicial Realizar o login
    // Preencher o campo cujo localizador é name com o valor standard_user
    await page.fill('[name="user-name"]', 'standard_user')
    // Preencher o campo cujo localizador é cssSelector com o valor secret_sauce
    await page.fill('[placeholder="Password"]', 'secret_sauce')
    // Clicar no botão Login
    await botao_login.click()

    // Página de Inventário / Produtos
    // Verificar se está na página certa
    await expect(page).toHaveURL(/.*inventory/)
    // Se precisar mudar de valor 2 ou mais vezes
    // Trocar de const (constante) para let (variável)
    const tituloSecao = '.title' //cssSelector
    await expect(page.locator(tituloSecao)).toHaveText('Products') 

    // Adicionar a mochila ao carrinho de compras
    const btnAdicionar = 'xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button'
    await page.locator(btnAdicionar).click()

    // Verificar se exibe o nº 1 no carrinho de compras
    const icoQuantCart = 'span.shopping_cart_badge' //cssSelector
    // const icoQuantCart = '#shopping_cart_container > a' //Selector
    await expect(page.locator(icoQuantCart)).toHaveText('1')

    // Clicar no icone do carrinho (nº 1)
    await page.locator(icoQuantCart).click()
    
    // Verificar se está na página certa - Cart
    await expect(page).toHaveURL(/.*cart/)
    // tituloSecao permanece igual ao da página Inventory
    await expect(page.locator(tituloSecao)).toHaveText('Your Cart') 

    // Verificar dados funcionais
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')

    // Espera de 1 segundo
    await page.waitForTimeout(1000) // mal visto // alfinete // temporária

}) // final do teste