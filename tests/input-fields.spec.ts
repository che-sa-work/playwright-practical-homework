import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Updating pet Types', async ({page}) => {
  await page.getByRole('link', { name: 'Pet Types' }).click()

  // validdate that the Pet Types page is opened
  await expect(page.getByRole('heading')).toHaveText('Pet Types')

  await page.getByRole('row', { name: 'cat' }).getByRole('button', { name: 'Edit' }).click()

  // asssertion of the edit type page is displayed
  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type')

  const petTypeNameInputField = page.getByRole('textbox')
  await expect(petTypeNameInputField).toHaveValue('cat')
  await petTypeNameInputField.fill('rabbit')
  await page.getByRole('button', { name: 'Update' }).click()

  // Assertion that the first pet type in the list has value "rabbit"
  await expect(page.getByRole('row').locator('.form-control').first()).toHaveValue('rabbit');

  await page.getByRole('row', { name: 'rabbit' }).getByRole('button', { name: 'Edit' }).click()
  await expect(petTypeNameInputField).toHaveValue('rabbit')
  await petTypeNameInputField.fill('cat')
  await page.getByRole('button', { name: 'Update' }).click()

  // Assertion that the first pet type was reverted back to 'cat
  await expect(page.getByRole('row').locator('.form-control').first()).toHaveValue('cat');

});