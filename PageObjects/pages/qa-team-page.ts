import { expect, type Locator, type Page } from "@playwright/test";

export class QATeamPage {
    readonly page: Page;
    readonly btn_signInWithTestIO: Locator;
    readonly btn_continue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.btn_signInWithTestIO = page.locator("xpath=//div[text()='Sign in with TEST IO']");
        this.btn_continue = page.locator("xpath=//button[@type='submit']");
    }

    async goto_qa_team() {
        await this.page.goto("https://qa.team/")
    }

    async goto_test_io_login() {
        await this.btn_signInWithTestIO.click()
    }

    async continue_to_qaTeam() {
        await this.btn_continue.click()
    }
}