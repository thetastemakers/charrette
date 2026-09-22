import s from '../Research.module.css'

export function EventLoop() {
  return (
    <>
      <section className={s.s} id="s3">
        <p className={s.sN}>3 · Attention</p>
        <h2>The developer is still the human event loop.</h2>
        <div className={s.prose}>
          <p>
            Take a routine task. An implementation agent makes a change. A reviewer should inspect the diff. If review finds a defect, an
            executor should repair it, and the repair should be reviewed again. A tester should run the relevant checks. A visual change may
            need browser verification. A high-risk result may need a second reviewer. None of this requires a developer to copy a summary
            from one window to another, yet that is how it’s done.
          </p>
        </div>
        <figure className={s.ex}>
          <figcaption className={s.exH}>
            <b>Today</b> One routine task, five hand-offs, all carried by the developer
          </figcaption>
          <ol className={s.loop5}>
            <li>
              <span>1</span>Brief an implementation agent, then wait.
            </li>
            <li>
              <span>2</span>Notice it finished, gather the diff, restate the task to a reviewer.
            </li>
            <li>
              <span>3</span>Interpret the findings and hand them to an executor.
            </li>
            <li>
              <span>4</span>Start the tests, and decide what a failure means.
            </li>
            <li>
              <span>5</span>Reconstruct the state, request another review, and finally accept.
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
