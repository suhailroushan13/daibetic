import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage, responsive layout and biological modes',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('h1')).toContainText('Diabetes, explained');
 await page.getByRole('button',{name:'Type 1',exact:true}).click();await expect(page.locator('.diagram-explanation')).toContainText('autoimmune',{ignoreCase:true});
 await page.getByRole('button',{name:'Type 2',exact:true}).click();await expect(page.locator('.diagram-explanation')).toContainText('less effectively');
 await page.getByRole('button',{name:'Healthy',exact:true}).click();await page.getByRole('button',{name:'Liver',exact:true}).click();await expect(page.locator('.diagram-explanation')).toContainText('glycogen');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBeTruthy();expect(errors).toEqual([]);
});
test('search palette returns real Pagefind matches and supports keyboard selection',async({page})=>{
 await page.goto('/');await page.keyboard.press('Control+k');const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await page.locator('#palette-query').fill('insulin resistance');await expect(page.locator('#palette-results .search-result').first()).toBeVisible();
 await expect(page.locator('#palette-results mark').first()).toBeVisible();await page.keyboard.press('ArrowDown');await expect(page.locator('#palette-results .search-result').first()).toBeFocused();await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
});
test('dedicated search and no-result state',async({page})=>{
 await page.goto('/search?q=remission');await expect(page.locator('#full-results .search-result').first()).toBeVisible();await page.locator('#full-query').fill('zzqxunfindabletopic');await expect(page.locator('#full-status')).toContainText('No matching');
});
test('article citations, static prose and pathway controls',async({page})=>{
 await page.goto('/type-1/overview');await expect(page.locator('.prose')).toContainText('autoantibodies');
 await page.locator('.prose .citation').first().click();await expect(page).toHaveURL(/#source-staging$/);await expect(page.locator('#source-staging')).toBeVisible();
 await page.locator('.step-buttons button').nth(2).click();await expect(page.locator('.step-detail')).toContainText('Stage 1');
});
test('source filters and research filters return matching records',async({page})=>{
 await page.goto('/sources');await page.selectOption('#source-year','2026');for(const card of await page.locator('.bibliography .source-card:visible').all())await expect(card).toHaveAttribute('data-source-year','2026');
 await page.goto('/research');await page.selectOption('#index-category','future');await expect(page.locator('.index-card:visible')).toHaveCount(10);await page.getByRole('button',{name:'Most read',exact:true}).click();await expect(page.locator('#no-popularity')).toBeVisible();await expect(page.locator('.index-card:visible')).toHaveCount(0);
});
test('theme persists and mobile navigation works',async({page,isMobile})=>{
 await page.goto('/');const before=await page.locator('html').getAttribute('data-theme');await page.locator('#theme-toggle').click();const after=await page.locator('html').getAttribute('data-theme');expect(after).not.toBe(before);await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme',after!);
 if(isMobile){await page.locator('#menu-toggle').click();await expect(page.locator('#menu-toggle')).toHaveAttribute('aria-expanded','true');await page.locator('#library-navigation a[href="/learn"]').click();await expect(page).toHaveURL(/\/learn$/);}
});
test('risk explorer has no invented score and charts show actual values',async({page})=>{
 await page.goto('/prediction/personal-dashboard');await page.getByRole('checkbox',{name:'Family history',exact:true}).check();await expect(page.locator('.risk-explorer article')).toContainText('first-degree relative');await expect(page.locator('.risk-explorer')).toContainText('no probability');
 await page.goto('/perspectives/global');await page.getByRole('button',{name:'Show data table'}).click();await expect(page.locator('.research-chart table')).toBeVisible();await expect(page.locator('.research-chart table')).toContainText('1990');
});
test('content remains available without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/type-2/prediabetes');await expect(page.locator('h1')).toContainText('Prediabetes');await expect(page.locator('.prose table')).toContainText('100–125');await page.locator('.pathway-figure summary').click();await expect(page.locator('.pathway-figure ol')).toBeVisible();await context.close();
});
test('accessibility on home, article, search and dark theme',async({page})=>{
 for(const route of ['/','/type-2/remission','/search']){await page.goto(route);const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
 await page.locator('#theme-toggle').click();const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations.map(v=>v.id)).toEqual([]);
});
