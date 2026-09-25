import { expect, test } from '@playwright/test'

test('the brief has fourteen slides and one snap marker per pinned step', async ({ page, isMobile }) => {
  test.skip(isMobile, 'pinning is a desktop interaction')
  await page.goto('/')
  await expect(page.locator('section[data-slide]')).toHaveCount(14)
  const pins = await page.locator('section[data-slide][style*="--steps"]').evaluateAll((elements) =>
    elements.map((element) => ({
      steps: Number((element as HTMLElement).style.getPropertyValue('--steps')),
      markers: element.querySelectorAll(':scope > i[aria-hidden="true"]').length,
    })),
  )
  expect(pins.length).toBeGreaterThan(0)
  for (const pin of pins) expect(pin.markers).toBe(pin.steps)
})

test('scrolling reveals the task graph, project memory, the morning total, the frontier year by year and the board view', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'pinning is a desktop interaction')
  await page.goto('/')
  await page.evaluate(() => window.scrollTo(0, document.querySelector<HTMLElement>('#flow')!.offsetTop))
  await expect(page.locator('#flow [data-node]')).toHaveCount(1)
  await page.evaluate(() => {
    const flow = document.querySelector<HTMLElement>('#flow')!
    window.scrollTo(0, flow.offsetTop + flow.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#flow [data-node]')).toHaveCount(9)
  await expect(page.locator('#flow [data-phase]')).toHaveAttribute('data-phase', 'memory')
  await expect(page.locator('#flow [data-fact]')).toHaveCount(13)
  await page.evaluate(() => {
    const morning = document.querySelector<HTMLElement>('#bus')!
    window.scrollTo(0, morning.offsetTop + morning.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#bus')).toContainText('Merged at 11:40.')
  await page.evaluate(() => window.scrollTo(0, document.querySelector<HTMLElement>('#models')!.offsetTop))
  await expect(page.locator('#models li[class*="next"]')).toHaveCount(3)
  await page.evaluate(() => {
    const models = document.querySelector<HTMLElement>('#models')!
    window.scrollTo(0, models.offsetTop + models.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#models li[class*="next"]')).toHaveCount(0)
  await page.evaluate(() => window.scrollTo(0, document.querySelector<HTMLElement>('#team')!.offsetTop))
  await expect(page.locator('#team [data-step]')).toHaveAttribute('data-step', '0')
  await page.evaluate(() => {
    const team = document.querySelector<HTMLElement>('#team')!
    window.scrollTo(0, team.offsetTop + team.offsetHeight - window.innerHeight)
  })
  await expect(page.locator('#team [data-step]')).toHaveAttribute('data-step', '1')
})

test('small screens and reduced motion show the final story', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('#flow [data-node]')).toHaveCount(9)
  await expect(page.locator('#flow [data-phase]')).toHaveAttribute('data-phase', 'task')
  await expect(page.getByRole('list', { name: 'Task 418, step by step' }).locator('li')).toHaveCount(9)
  const sticky = await page
    .locator('#flow > div')
    .first()
    .evaluate((element) => getComputedStyle(element).position === 'sticky')
  expect(sticky).toBe(false)
})
