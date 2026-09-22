import s from '../Research.module.css'

export function Falsifiers() {
  return (
    <>
      <section className={s.s} id="s12">
        <p className={s.sN}>12 · Open questions</p>
        <h2>What would falsify or change the thesis?</h2>
        <ol className={s.qs}>
          <li>
            Will the leading proprietary environments solve project memory and graph execution so well that an independent layer has no
            room?
          </li>
          <li>Can a coordinator reliably decide when to review, retry, repair or escalate without adding more ceremony than it removes?</li>
          <li>
            Can a typed decision model make those transitions cheaply and quickly while keeping false acceptance and missed escalation
            within defensible bounds?
          </li>
          <li>What is the minimum portable event and artifact model that doesn’t collapse to the weakest provider?</li>
          <li>How much project knowledge can be made durable without filling the system with stale instructions and false certainty?</li>
          <li>Is the project the right top-level primitive, or must organisation-level knowledge be first-class from the start?</li>
          <li>What evidence will developers and enterprises need before allowing unattended execution against valuable repositories?</li>
        </ol>
        <div className={s.signalBox}>
          <b>The leading indicator we’ll track:</b> distinct agents per project. If most projects only ever connect one agent, the
          portability argument is weaker than we believe. If projects routinely use two or three and keep their memory through a switch, the
          thesis holds.{' '}
        </div>
      </section>
    </>
  )
}
