import { test as base } from '@playwright/test';
import LoginPage from './pages/login.page';
import InventoryPage from './pages/inventory.page';

export type PageObjects = {
    loginPage: LoginPage
    inventoryPage: InventoryPage
}

export const test = base.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    }
});

export { expect, type Page, type Locator, type Response } from '@playwright/test'