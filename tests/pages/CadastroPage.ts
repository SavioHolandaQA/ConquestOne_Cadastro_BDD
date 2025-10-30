import { Page } from '@playwright/test';

export class CadastroPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

    // Define timeout padrão para todos os comandos da página
    this.page.setDefaultTimeout(60000); // 120 segundos
  }

  async acessarPagina() {

    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.goto(process.env.BASE_URL!);
  }

  async preencherFormulario() {
    await this.page.fill('#vFIRSTNAME', process.env.USER_FIRSTNAME!);
    await this.page.fill('#vLASTNAME', process.env.USER_LASTNAME!);

    // E-mail aleatório
   
    const email = `qa_${Date.now()}@teste.com`;
    await this.page.waitForSelector('#vEMAIL', { timeout: 60000 });
    await this.page.fill('#vEMAIL', email);

   
    await this.page.fill('#vPASSWORD', process.env.USER_PASSWORD!);

    await this.page.locator('#vPASSWORDCONF').scrollIntoViewIfNeeded();
    await this.page.fill('#vPASSWORDCONF', process.env.USER_PASSWORD!);
  }

  async submeterFormulario() {
    await this.page.click('#BTNENTER');
  }

  async validarMensagemSucesso() {
    const mensagem = await this.page.locator('text=Para continuar, clique no link enviado para o seu e-mail.').textContent();
    if (!mensagem?.includes('Para continuar, clique no link enviado para o seu e-mail.')) {
      throw new Error('Mensagem de sucesso não encontrada!');
    }
  }
}


