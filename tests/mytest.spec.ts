import { test, expect } from '@playwright/test';

// Тест 1: Зөв нэр, нууц үгээр амжилттай нэвтрэх эсэхийг шалгана
test('1. Амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Нэвтэрсний дараа Products хуудас гарч байгааг шалгана
  await expect(page.getByText('Products')).toBeVisible();
});

// Тест 2: Буруу нууц үгээр нэвтрэхэд алдааны мессеж гарч байгааг шалгана
test('2. Буруу нууц үгээр нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Epic sadface: Username and password do not match')
  ).toBeVisible();
});

// Тест 3: Нэвтэрсний дараа бараа сагсанд нэмэх эсэхийг шалгана
test('3. Бараа сагсанд нэмэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Products')).toBeVisible();

  // Эхний барааг сагслана
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Сагсны badge дээр тоо "1" болсныг шалгана (getByTestId ашиглав, CSS selector биш)
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
});