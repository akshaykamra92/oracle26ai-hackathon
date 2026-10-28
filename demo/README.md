# Public planner showcase

[Watch the narrated 74-second MP4](showcase.mp4) · [Open the interactive demo](https://akshaykamra92.github.io/oracle26ai-hackathon/)

This visual walkthrough uses screenshots of the public app and the same synthetic scenarios. It is a presentation of the working planner, not a recording of real employee data or customer outcomes.

## Narration transcript

1. Opening a new location is easy to imagine. Staffing it without weakening the places we already have is the hard part.
2. Can We Staff It turns the opening into a testable plan. Tampa needs eight registered nurses. Seven feasible moves are found, leaving one position open.
3. Transfers are modeled as a chain. A float pool nurse backfills Orlando West before its charge nurse goes to Tampa. Orlando West ends at six, its minimum.
4. Every declined proposal has a reason: a source minimum, a mobility constraint, or a license. The planner does not hide the gap.
5. The same rules handle nonlicensed roles. Orlando's service hub is ready now. Phoenix has six people, but lacks the required senior and lead mix.
6. Career progress may make Phoenix's mix ready at a conditional twenty-four-month checkpoint. Add one more role and the plan stays short. Promotions do not create people.
7. Make the trade-off visible to planners and leaders. This is a synthetic decision-support prototype, with human review required.

The public app and this video use deterministic JavaScript rules. They do not call a runtime AI model or Oracle database. The clinical staffing minima are fictional demo assumptions.
