import { BasePage } from "../base.page";

export default class InventoryPage extends BasePage {

    readonly btn_add_to_cart = this.page.locator('//*[text()="ADD TO CART"]')
    readonly cart_added_product_number = this.page.locator('//*[@id="shopping_cart_container"]//*[contains(@class, "shopping_cart_badge")]')

    async add_first_product_to_cart() {
        // await this.btn_add_to_cart.first().waitFor({ state: 'visible' })
        await this.wait_selector(this.btn_add_to_cart.first(), 'visible', 5000, 5)
        await this.btn_add_to_cart.first().click()
    }

    async add_product_to_cart(productName: string) {
        let btn_add_to_cart = this.page.locator(`(//*[@class="inventory_item_name" and text()="${productName}"]/following::button)[1]`)
        await btn_add_to_cart.waitFor({ state: 'visible' })
        await btn_add_to_cart.click()
    }
}