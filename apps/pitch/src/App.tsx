import { Brief } from './pages/brief/Brief'
import { NotFound } from './pages/not-found/NotFound'
import { Research } from './pages/research/Research'
import { BRIEF, RESEARCH } from './meta'
import { pageForPath } from './paths'

export function App({ pathname }: { pathname: string }) {
  const page = pageForPath(pathname)
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {page === BRIEF ? <Brief /> : page === RESEARCH ? <Research /> : <NotFound />}
    </>
  )
}
