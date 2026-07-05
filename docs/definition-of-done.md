# Definition of Done

A task is not complete just because a file was added.

## Required before marking any task done

- File is in the correct folder.
- File follows the repo structure map.
- Related schema or doc exists.
- No secrets are committed.
- No generated media is committed.
- Naming follows the project conventions.
- Acceptance criteria are met.
- Verification is recorded when relevant.

## Required for future code tasks

- Code runs locally.
- Expected success case is tested.
- Expected failure case is tested.
- Error handling is clear.
- Logs are useful.
- Original media is preserved when media processing is involved.
- Documentation is updated.

## Required for future connector tasks

- Connector is optional.
- Connector has a manifest.
- Required settings are documented.
- Secrets are not logged or exported.
- Failure behavior is documented.
- Core app works without the connector enabled.

## Required for future release tasks

- Version is updated.
- Release notes are written.
- Generated installers are not committed unless intentionally released.
- Checksums are produced when release files are generated.
