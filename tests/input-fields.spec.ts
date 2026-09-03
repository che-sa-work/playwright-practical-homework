import { test, expect } from '@playwright/test';
import { NavigationPage } from '../Page-Object/nav-page';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Updating pet Types', async ({page}) => {
  const navigationPage = new NavigationPage(page)
  await navigationPage.petTypesPage();

  // validdate that the Pet Types page is opened
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()

  const tableRowByPetType = page.getByRole('row').filter({has: page.getByRole('cell', {name: 'cat'})})
  await tableRowByPetType.locator('.btn-default').filter({hasText: 'Edit'}).first().click() 

  // asssertion of the edit type page is displayed
  await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()

  const petTypeInput = page.locator('.form-group').locator('#name')
  await petTypeInput.click()
  await petTypeInput.selectText()
  await petTypeInput.fill('rabbit')
  await page.locator('.form-group').getByRole('button', {name: 'Update'}).click()

  await page.waitForResponse('**/pettypes/**')
  // Assertion that the first pet type in the list has value "rabbit"
  await expect(page.getByRole('row').locator('.form-control').first()).toHaveValue('rabbit');

  const UpdatedPetTypeTable = page.getByRole('row').filter({has: page.getByRole('cell', {name: 'rabbit'})})
  await UpdatedPetTypeTable.locator('.btn-default').filter({hasText: 'Edit'}).first().click() 

  await petTypeInput.click()
  await petTypeInput.selectText()
  await petTypeInput.fill('cat')
  await page.locator('.form-group').getByRole('button', {name: 'Update'}).click()

  await page.waitForResponse('**/pettypes/**')
    // Assertion that the first pet type was reverted back to 'cat
  await expect(page.getByRole('row').locator('.form-control').first()).toHaveValue('cat');

});