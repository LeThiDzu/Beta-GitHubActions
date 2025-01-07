import test, { Locator, type Page } from '@playwright/test'

export abstract class BasePage {

    constructor(readonly page: Page) {}

    public url = process.env.URL

    async open(path: string) {
        await this.page.goto(this.url + path)
    }

    async click_selector(selector: Locator) {
        await selector.waitFor({ state: 'visible' })
        await selector.click()
    }

    async fill_text(selector: Locator, text: string) {
        await selector.waitFor({ state: 'visible' })
        await selector.fill(text)
    }

    async close() {
        await this.page.close()
    }
}