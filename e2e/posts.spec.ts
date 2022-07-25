import { expect, Page, test } from "@playwright/test";

const USER_ID = "Marc";

test("Should open a post", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const titles = await page.locator("h4");

  const randomPost = Math.floor(Math.random() * (await titles.count()));

  // Find a Card title
  const postTitle = titles.nth(randomPost);

  const title = await postTitle.innerText();

  // Open the post
  await postTitle.click();

  await expect(page.locator("h2")).toContainText(title);
});

async function logIn(page: Page) {
  // Enable edit mode
  await page.locator("text=Login").click();

  // Edit the post
  await page.locator("input").nth(0).fill(USER_ID);

  // Save the post
  await page.click("text=Log in");
}

test("Should log in", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await logIn(page);

  // The avatar contains the first character therefore it's part of the text
  await expect(page.locator("button").nth(0)).toHaveText(
    `${USER_ID.charAt(0)}${USER_ID}`
  );
});

test("Should save an edited post", async ({ page }) => {
  await page.goto("http://localhost:3000/post/1");

  await logIn(page);

  // Enable edit mode
  await page.locator("button").nth(4).click();

  // Edit the post content
  await page.locator("textarea").nth(1).fill("Hello World");

  // Save the post
  await page.click("text=Save");

  // Go to home
  await page.click("text=Posts");

  await expect(page.locator("p").nth(0)).toHaveText("Hello World");
});

test("Should display a liked post", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await logIn(page);

  const titles = await page.locator("h4");

  const randomPost = Math.floor(Math.random() * (await titles.count()));

  // Find a Card title
  const postTitle = titles.nth(randomPost);

  const title = await postTitle.innerText();

  // Open the post
  await postTitle.click();

  await page.waitForNavigation();

  // Like the post
  await page.locator("button").nth(0).click();

  // Open the account dropdown
  await page.locator("button").nth(2).click();

  await page.waitForTimeout(100);

  // Open the liked post route
  await page.locator("text=Liked Posts").click();

  await page.waitForNavigation();

  await expect(page.url()).toBe("http://localhost:3000/likedPosts");

  await expect(page.locator("h4").nth(0)).toHaveText(title);
});
