import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page, responsive layout and body diagram modes', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Diabetes, explained');
  await page.getByRole('button', { name: 'Type 1', exact: true }).click();
  await expect(page.locator('.diagram-explanation')).toContainText('insulin', { ignoreCase: true });
  await page.getByRole('button', { name: 'Type 2', exact: true }).click();
  await expect(page.locator('.diagram-explanation')).toContainText('listens less');
  await page.getByRole('button', { name: 'Liver', exact: true }).click();
  await expect(page.locator('.diagram-explanation')).toContainText('pantry');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  expect(errors).toEqual([]);
});

test('search palette finds real matches and supports keyboard selection', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await page.locator('#palette-query').fill('insulin resistance');
  await expect(page.locator('a.search-result').first()).toBeVisible();
  await expect(page.locator('a.search-result mark').first()).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('a.search-result').first()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('search page and empty state', async ({ page }) => {
  await page.goto('/search?q=remission');
  await expect(page.locator('a.search-result').first()).toBeVisible();
  await page.locator('#full-query').fill('zzqxunfindabletopic');
  await expect(page.getByRole('status').filter({ hasText: 'No matching' })).toBeVisible();
});

test('article has simple explainer with examples, numbered citations and pathway controls', async ({ page }) => {
  await page.goto('/type-1/overview');
  await expect(page.locator('#simple-heading')).toBeVisible();
  expect(await page.getByText('For example:').count()).toBeGreaterThan(2);
  await expect(page.locator('.article-prose')).toContainText('autoantibodies');
  await page.locator('.article-prose .citation').first().click();
  await expect(page).toHaveURL(/#source-staging$/);
  await page.locator('.pathway-figure ol[aria-label="Steps"] button').nth(2).click();
  await expect(page.locator('.step-detail')).toContainText('Stage 1');
});

test('step-by-step guide remembers progress', async ({ page }) => {
  await page.goto('/learn');
  await expect(page.locator('.learning-step')).toHaveCount(19);
  await page.locator('.learning-step').first().click();
  await expect(page).toHaveURL(/fundamentals\/mental-model$/);
  await page.getByRole('button', { name: /Mark done and continue/ }).click();
  await expect(page).toHaveURL(/fundamentals\/glucose$/);
  await page.goto('/learn');
  await expect(page.getByText('1 of 19 steps finished').first()).toBeVisible();
});

test('source and article filters return matching records', async ({ page }) => {
  await page.goto('/sources');
  await page.selectOption('#source-year', '2026');
  for (const card of await page.locator('[data-source-card]:visible').all()) await expect(card).toHaveAttribute('data-source-year', '2026');
  await page.goto('/research');
  await page.selectOption('#index-category', 'future');
  await expect(page.locator('[data-article-card]')).toHaveCount(10);
  await page.fill('#index-query', 'zzzz-nothing');
  await expect(page.locator('#index-empty')).toBeVisible();
});

test('glossary filter shows examples', async ({ page }) => {
  await page.goto('/glossary');
  await page.fill('#glossary-filter', 'C-peptide');
  await expect(page.locator('[data-term]')).toHaveCount(1);
  await expect(page.locator('[data-term]')).toContainText('For example:');
});

test('theme persists and mobile navigation works', async ({ page, isMobile }) => {
  await page.goto('/');
  const before = await page.locator('html').getAttribute('data-theme');
  await page.locator('#theme-toggle').click();
  const after = await page.locator('html').getAttribute('data-theme');
  expect(after).not.toBe(before);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', after!);
  if (isMobile) {
    await page.locator('#menu-toggle').click();
    await page.locator('#library-navigation a[href="/learn"]').click();
    await expect(page).toHaveURL(/\/learn$/);
  }
});

test('risk explorer gives no invented score and charts show real values', async ({ page }) => {
  await page.goto('/prediction/personal-dashboard');
  await page.getByRole('checkbox', { name: 'Family history', exact: true }).check();
  await expect(page.locator('.risk-explorer article')).toContainText('first-degree relative');
  await expect(page.locator('.risk-explorer')).toContainText('no probability');
  await page.goto('/perspectives/global');
  await page.getByRole('button', { name: 'Show data table' }).click();
  await expect(page.locator('.research-chart table')).toContainText('1990');
});

test('article content is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/type-2/prediabetes');
  await expect(page.locator('h1')).toContainText('Prediabetes');
  await expect(page.locator('.article-prose table').first()).toContainText('100–125');
  await context.close();
});

test('accessibility on home, article, glossary, search and dark theme', async ({ page }) => {
  for (const route of ['/', '/type-2/remission', '/glossary', '/learn', '/search']) {
    await page.goto(route);
    await page.waitForTimeout(1200); // let entrance animations finish so contrast is measured on final colours
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual([]);
  }
  await page.locator('#theme-toggle').click();
  await page.waitForTimeout(400);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
