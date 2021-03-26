import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have all elemets in the page', () => {
    page.navigateTo();
    const pageElements = [
      page.getInputEmail(),
      page.getInputPass(),
      page.geButtonSubmit(),
      page.getAvatar(),
      page.getReminderToogle(),
      page.getIconPerson(),
      page.getIconLock()
    ];
    pageElements.forEach((pageElement) => {
      expect(pageElement).toBeDefined();
    })
    expect(page.getParagraphText()).toContain('Prueba técnica');
  });

  it('OK Scenario - should not show errors if is filled correcly', async () => {
    await page.navigateTo();
    const inputEmail = page.getInputEmail();
    const inputPass = page.getInputPass();
    const submitButton = page.geButtonSubmit();
    await inputEmail.sendKeys('correct@email.com');
    await inputPass.sendKeys('okoko');
    await submitButton.click();
    const errors = page.getErrorElements();
    expect((await errors).length).toBe(0)
  });

  it('KO Scenario - should show errors if is filled with erros', async () => {
    await page.navigateTo();
    const inputEmail = page.getInputEmail();
    const inputPass = page.getInputPass();
    const submitButton = page.geButtonSubmit();
    await inputEmail.sendKeys('incorrect email');
    await inputPass.sendKeys('ko');
    await submitButton.click();
    const errors = await  page.getErrorElements();
    expect(errors.length).toBe(2)
  });
});
