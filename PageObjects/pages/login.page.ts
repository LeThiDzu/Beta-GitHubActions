import { BasePage } from '../base.page';
import dotenv from 'dotenv';
dotenv.config();

export default class LoginPage extends BasePage {
    readonly txt_username = this.page.locator('#user-name')
    readonly txt_password = this.page.locator('#password')
    readonly btn_signIn = this.page.locator('#login-button')

    async login(username: string, password: string) {
        this.fill_text(this.txt_username, username)
        this.fill_text(this.txt_password, password)
        this.click_selector(this.btn_signIn)
    }
}