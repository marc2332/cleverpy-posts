import { test, expect } from '@playwright/test'

test('Should open a post', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  // Click on the card
  await page.click('text=Sunt aut')

  await expect(page).toHaveURL('http://localhost:3000/post/1')

  await expect(page.locator('h2')).toContainText('Sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
})

test('Should save an edited post', async ({ page }) => {
  await page.goto('http://localhost:3000/post/1')

  // Enable edit mode
  await page.locator("button").nth(2).click();

  // Edit the post
  await page.locator("textarea").fill("Hello World");

  // Save the post
  await page.click('text=Save')

  // Go to home
  await page.click('text=Posts')
  
  await expect(page.locator('p').nth(0)).toHaveText('Hello World')
})