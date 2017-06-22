import { WhenDoesItAirPage } from './app.po';

describe('when-does-it-air App', () => {
  let page: WhenDoesItAirPage;

  beforeEach(() => {
    page = new WhenDoesItAirPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
