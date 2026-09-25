import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', heading: 'Agents come and go. The project stays.' },
  { path: '/research/', heading: 'The missing project layer.' },
  { path: '/404.html', heading: 'Nothing here.' },
] as const

function watchErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

for (const { path, heading } of pages) {
  test.describe(path, () => {
    test('serves and hydrates the complete page', async ({ page }) => {
      const errors = watchErrors(page)
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
      await expect(page.locator('#main')).toHaveCount(1)
      await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveCount(1)
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
      expect(errors).toEqual([])
    })

    test('has no automated accessibility violations', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
    })

    test('has a working skip link', async ({ page }) => {
      await page.goto(path)
      await page.keyboard.press('Tab')
      await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.locator('#main')).toBeFocused()
    })

    test('is readable without JavaScript', async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false })
      try {
        const page = await context.newPage()
        await page.goto(path)
        await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible()
        await expect(page.locator('#main')).toHaveCount(1)
        if (path === '/') await expect(page.getByRole('list', { name: 'Task 418, step by step' }).locator('li')).toHaveCount(9)
        if (path === '/research/') await expect(page.locator('aside[aria-label="Contents"] li')).toHaveCount(13)
      } finally {
        await context.close()
      }
    })
  })
}

test('readers can move between the brief and research note', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Pages' }).getByRole('link', { name: 'Research note' }).click()
  await expect(page).toHaveURL(/\/research\/$/)
  await expect(page.getByRole('heading', { name: 'The missing project layer.' })).toBeVisible()
  await page.getByRole('navigation', { name: 'Pages' }).getByRole('link', { name: 'Brief' }).click()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { name: 'Agents come and go. The project stays.' })).toBeVisible()
})

for (const path of ['/', '/research/']) {
  test(`${path} fits narrow and wide screens`, async ({ page }) => {
    for (const width of [360, 820, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
      expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0)
    }
  })
}

test('the built resources and 404 document are served', async ({ request }) => {
  for (const path of ['/robots.txt', '/site.webmanifest', '/favicon.svg', '/favicon.ico', '/og.png']) {
    expect((await request.get(path)).status(), path).toBe(200)
  }
  const notFound = await request.get('/404.html')
  expect(notFound.status()).toBe(200)
  expect(await notFound.text()).toContain('Nothing here.')
})
