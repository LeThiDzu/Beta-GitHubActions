import { expect, test } from "../PageObjects/pageFixtures";


test('Example test', async ({ loginPage, inventoryPage }) => {
  await loginPage.open('/')
  console.log(`LINK: ${process.env.TEST_RUN_LINK}`)
  await loginPage.login(`${process.env.USERNAME}`, `${process.env.PASSWORD}`);
  await inventoryPage.add_first_product_to_cart()
  expect(await inventoryPage.cart_added_product_number.textContent()).toBe('1')
})
