import { expect, test } from '@playwright/test'

test('the brief has fifteen slides and one snap marker per pinned step', async ({ page, isMobile }) => {
  test.skip(isMobile, 'pinning is a desktop interaction')
  await page.goto('/')
  await expect(page.locator('section[data-slide]')).toHaveCount(15)
  const pins = await page.locator('section[data-slide][style*="--steps"]').evaluateAll((elements) =>
    elements.map((element) => ({
      steps: Number((element as HTMLElement).style.getPropertyValue('--steps')),
      markers: element.querySelectorAll(':scope > i[aria-hidden="true"]').length,
    })),
  )
  expect(pins.length).toBeGreaterThan(0)
  for (const pin of pins) expect(pin.markers).toBe(pin.steps)
})

test('scrolling reveals the task graph and the morning total', async ({ page, isMobile }) => {
  test.skip(isMobile, 'pinning is a desktop interaction')
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.querySelector<HTMLElement>('#flow')!.offsetTop))
  await expect(page.locator('#flow svg g')).toHaveCount(2)
  await page.evaluate(() => {
    const flow = document.querySelector<HTMLElement>('#flow')!
    window.scrollTo(0, flow.offsetTop + flow.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#flow svg g')).toHaveCount(10)
  await page.evaluate(() => {
    const morning = document.querySelector<HTMLElement>('#bus')!
    window.scrollTo(0, morning.offsetTop + morning.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#bus')).toContainText('Seven interruptions. One needed you.')
})

test('small screens and reduced motion show the final story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('#flow svg g')).toHaveCount(10)
  await expect(page.getByRole('list', { name: 'Task 418, step by step' }).locator('li')).toHaveCount(10)
  const sticky = await page.locator('#flow > div').evaluate((element) => getComputedStyle(element).position === 'sticky')
  expect(sticky).toBe(false)
})
