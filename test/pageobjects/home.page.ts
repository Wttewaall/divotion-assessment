import { $ } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  public get productsList() {
    return $('data-testid="products-list"');
  }

  public get firstProductCard() {
    return this.productsList.$('> *:nth-child(1)');
  }

  public get firstProductFavoriteButton() {
    return this.firstProductCard.$('aria/favorite button');
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  public open() {
    return super.open('/');
  }

  public getProductsList() {
    return this.productsList;
  }

  public getFirstProductFavoriteButton() {
    return this.firstProductFavoriteButton;
  }

  public async hasToggledButton() {
    // svg has a red fill
    return this.firstProductFavoriteButton.$('svg[fill="#ff4000"]') !== undefined;
  }
}

export default new HomePage();
