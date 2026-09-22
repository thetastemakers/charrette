import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'

import { App } from './App'

export { PAGES } from './meta'

/** The page at `url` (including the base path), as HTML for the prerender. */
export async function render(url: string): Promise<string> {
  return renderToString(
    <StrictMode>
      <App pathname={url} />
    </StrictMode>,
  )
}
