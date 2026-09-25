import s from '../Research.module.css'

export function EventLoop() {
  return (
    <>
      <section className={s.s} id="s3">
        <p className={s.sN}>3 · Attention</p>
        <h2>The developer is still the human event loop.</h2>
        <div className={s.prose}>
          <p>
            Take a routine task. It should be triaged into acceptance criteria. An implementation agent makes the change. If the change
            touches a sensitive path, it needs a security audit. A reviewer from another lab should inspect the diff; if review finds a
            defect, an executor should repair it, and the repair should be reviewed again. A user-facing change should be tested against the
            original criteria. None of this requires a developer to copy a summary from one window to another, yet that is how it’s done,
            and a step the developer forgets simply doesn’t happen.
          </p>
        </div>
        <figure className={s.ex}>
          <figcaption className={s.exH}>
            <b>Today</b> One routine task, six hand-offs, all carried by the developer
          </figcaption>
          <ol className={s.loop5}>
            <li>
              <span>1</span>Triage with one agent, and keep the acceptance criteria somewhere you’ll find them.
            </li>
            <li>
              <span>2</span>Brief an implementation agent, then wait.
            </li>
            <li>
              <span>3</span>Notice it finished, gather the diff, restate the task to a reviewer, and remember whether it needs an audit.
            </li>
            <li>
              <span>4</span>Interpret the findings and hand them, all of them, to an executor.
            </li>
            <li>
              <span>5</span>Request another review, and check that a newer run hasn’t invalidated it.
            </li>
            <li>
              <span>6</span>Dig out the original criteria and test against them, if you remember to.
            </li>
          </ol>
        </figure>
        <div className={s.prose}>
          <p>
            The developer is needed at the start, at the end, and at moments of ambiguity, risk or real trade-off. In between, they act as
            message bus and scheduler. This destroys real parallelism. Several agents can run at once, but each one creates an obligation to
            return, work out the next transition, prepare the next packet of context, and check that a newer run hasn’t invalidated an older
            review. The work is computationally parallel and cognitively serial.
          </p>
          <p>
            A dashboard of running terminals makes the queues visible, but somebody still has to operate them. The missing abstraction is an
            execution graph that owns routine transitions and escalates only what needs a person. The aim isn’t maximum autonomy. It’s
            minimum unnecessary interruption: settle ambiguity up front, automate the middle, and bring human attention back where judgment
            changes the outcome.
          </p>
        </div>
      </section>
    </>
  )
}
