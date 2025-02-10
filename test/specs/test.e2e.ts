import { expect } from '@wdio/globals';
import HomePage from '../pageobjects/home.page';

describe('My Home page', () => {
  // let $favoriteButton: WebdriverIO.Element;

  // beforeEach(async () => {
  //   await HomePage.open();
  //   $favoriteButton = (await $('button')) as unknown as WebdriverIO.Element;
  // });

  it('should show multiple product cards', async () => {
    await HomePage.open();
    const productsList = HomePage.getProductsList();
    await expect(productsList).toHaveChildren();
    await expect(productsList).toBeDisplayed();
  });

  it('should toggle the favorite button on the first product card', async () => {
    await HomePage.open();
    const button = $('data-testid="products-list" > * button'); //HomePage.getFirstProductFavoriteButton();
    await expect(button).toBeDisplayed();
    let svg = button.$('svg');
    await expect(svg.$('[fill="#ff4000"]')).toBeDisplayed();
    await button.click();
    svg = button.$('svg');
    await expect(svg).toHaveAttribute('fill', '#ff4000');
    await expect(svg).not.toHaveAttribute('fill', '#ff4000');

    // const state1 = await HomePage.hasToggledButton();
    // await HomePage.toggleFirstProductFavorite();
    // const state2 = await HomePage.hasToggledButton();
    // console.log(state1, state2);
    // expect(state1 !== state2).toBeTruthy();
  });
});
