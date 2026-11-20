# Dimensi Niskala studio contracts

These are stage checklists for human-directed work, not running agents or an automated system. The owner currently operates the [orchestrator](00-orchestrator.md). In a fresh chat, invoke one role with:

`Read agents/<role>.md and execute your stage for episodes/<slug>.`

Use this sequence: **01 Showrunner [per arc] → 02 Audio Producer → 03 Image Generator → 04 Remotion Assembler → 05 QA Auditor [single post-MP4 gate] → Human Publish.** For a complex vehicle episode, the owner may also request an early, read-only QA review of `panels-contact.jpg`; this does not replace the post-MP4 gate. A fresh-context QA reviewer must be independent of the builder.

Copy [pipeline-state.json](../templates/pipeline-state.json) into each episode. Each stage has `status` (`pending`, `ready`, `pass`, or `fail`) and `notes`. `ready` means available for the owning role to inspect, **not approved**; `pass` requires that stage's checks and a recorded handoff. The producer roles update their own stage. QA writes only `audit-report.md`; the human orchestrator records its verdict in `audit` and directs the next action.

On **FAIL**, route each defect only to the owning role with the exact issue and evidence. Reset affected downstream stage statuses to `pending` when their artifacts become stale, then reassemble as needed and run a new independent post-MP4 audit. Human publishing is a distinct step and requires explicit owner authorization; a QA pass alone is not publication approval.

Episode 003 starts with the owner-designated brief `pass` and audio `ready`; its existing 140-word script is a pre-existing exception to the current new-script budget, and the audio still needs listening. Record the exception, review the existing take and do not silently rewrite it.
