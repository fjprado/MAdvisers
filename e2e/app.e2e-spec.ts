import { CimpPage } from './app.po';

describe('cimp App', function() {
  let page: CimpPage;

  beforeEach(() => {
    page = new CimpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('cimp works!');
  });
});
