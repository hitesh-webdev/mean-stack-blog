import { BlogPocPage } from './app.po';

describe('blog-poc App', () => {
  let page: BlogPocPage;

  beforeEach(() => {
    page = new BlogPocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
