import { expect, type Locator, type Page } from "@playwright/test";

export class TestIOPage {
    readonly page: Page;
    readonly txt_email: Locator;
    readonly txt_password: Locator;
    readonly btn_signIn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.txt_email = page.locator("xpath=//*[@id='user_email']");
        this.txt_password = page.locator("xpath=//*[@id='user_password']");
        this.btn_signIn = page.locator("xpath=//input[@value='Sign In']");
    }

    async testio_login(){
        await this.txt_email.fill("")
        await this.txt_password.fill("")
        await this.btn_signIn.click()
    }
}