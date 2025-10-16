import { test, expect } from '../utils/logger.js'
import { snap } from '../utils/snap.js'

// Funções de apoio
async function login_step(page, testInfo){
    await page.goto('/')

    await expect(page).toHaveURL('/') // Verificação clássica
    await expect(page.locator('[data-test="login-button"]')).toHaveText('Login')
    
    await snap(page, testInfo, 'TC001-Passo01-Home')
}

async function success_login_step(page, testInfo) {
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
    await snap(page, testInfo, 'TC001-Passo02A-Login_Preenchido')
    await page.locator('[data-test="login-button"]').click()

    await expect(page).toHaveURL(/inventory\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText('Products')
    
    await snap(page, testInfo, 'TC001-Passo02B-Inventory')
}

test.describe('SauceDemo - fluxo principal de compra', () => {
    test('Comprar Mochila Direto', 
        async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)
        
        // Inicio do Passo 1
        await test.step('Acessar SauceDemo.com', async () => {
            await login_step(page, testInfo)            
        }) // fim do passo 1

        // Inicio do passo 2
        await test.step('Login com Sucesso', async () => {
            success_login_step(page, testInfo)
        }) // fim do passo 2

        // Inicio do passo 3
        await test.step('Adicionar mochila no carrinho', async () => {
            const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/ })
            await seletor_mochila.getByRole('button', { name: /Add to cart/ }).click()

            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada')
        }) // fim do passo 3

        await test.step('Ir para o carrinho', async () => {
            await page.locator('[data-test="shopping-cart-link"]').click()
            await expect(page).toHaveURL(/cart\.html/)
            await expect(page.locator('[data-test="title"]')).toHaveText("Your Cart")
            // await expect(page.locator('[data-test="title"]')).toContainText("Cart")
            await expect(page.locator('[data-test="item-quantity"]')).toHaveText("1")
            await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack")
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99")
            await snap(page, testInfo, 'TC001-Passo4-Carrinho-Conferido')
        })

    }) // fim do test 1
    test('Comprar Mochila Detalhes', 
        async({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)
        
        // Inicio do Passo 1
        await test.step('Acessar SauceDemo.com', async () => {
            await login_step(page, testInfo)            
        }) // fim do passo 1

        // Inicio do passo 2
        await test.step('Login com Sucesso', async () => {
            success_login_step(page, testInfo)
        }) // fim do passo 2

        // Inicio do passo 3
        await test.step('Adicionar mochila no carrinho', async () => {
            const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/ })
            await seletor_mochila.getByRole('button', { name: /Add to cart/ }).click()

            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            await snap(page, testInfo, 'TC001-Passo03-Mochila-Adicionada')
        }) // fim do passo 3
        

    }) // fim do test 2
}) // fim do describe