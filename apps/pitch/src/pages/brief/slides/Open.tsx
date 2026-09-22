import { Slide } from '../Slide'
import ui from '../ui.module.css'
import s from './Open.module.css'

export function Open() {
  return (
    <Slide tone="light" name="Why open" className={s.open}>
      <div className={ui.wrap}>
        <p className={ui.kicker}>Why open source</p>
        <h2>A lead choosing where project knowledge lives is choosing for years.</h2>
        <div className={s.points}>
          <div>
            <b>Own the memory</b>
            <p>Plain files in an open format, on your disk or your servers. Leave any time and take all of it.</p>
          </div>
          <div>
            <b>Own the version</b>
            <p>Self-host, pin or fork. The tool that runs your engineering doesn’t change under you mid-quarter.</p>
          </div>
          <div>
            <b>No training incentive</b>
            <p>We don’t sell models or compute. Your project is nobody’s training data.</p>
          </div>
          <div>
            <b>Frontier models, subscription prices</b>
            <p>Charrette runs the official agent tools a team already pays for. No token markup.</p>
          </div>
          <div className={s.wide}>
            <b>Independent review</b>
            <p>
              Having a different lab’s model check the work is one of the strongest quality controls there is. No lab will sell you an
              independent reviewer of its own model.
            </p>
          </div>
        </div>
      </div>
    </Slide>
  )
}
