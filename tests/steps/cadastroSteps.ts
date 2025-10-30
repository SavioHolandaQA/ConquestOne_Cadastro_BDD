import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { CadastroPage } from '../pages/CadastroPage';
import '../support/envSetup';

setDefaultTimeout(60 * 1000);

let browser: Browser;
let page: Page;
let cadastroPage: CadastroPage;

Given('que estou na página de cadastro', async () => {
  browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true',
  });
  const context = await browser.newContext();
  page = await context.newPage();
  cadastroPage = new CadastroPage(page);

  await cadastroPage.acessarPagina();
});

When('eu preencho o formulário de cadastro', async () => {
  await cadastroPage.preencherFormulario();
  await cadastroPage.submeterFormulario();
});

Then('o cadastro deve ser realizado corretamente', async () => {
  await cadastroPage.validarMensagemSucesso();
  await page.waitForTimeout(3000);
 // await browser.close();
});
