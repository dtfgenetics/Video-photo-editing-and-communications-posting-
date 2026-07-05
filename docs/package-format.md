# Package Format

A package is the user-facing output created by a recipe.

## Clean posting package output

The first package format should contain:

```txt
package/
  exports/
    video_vertical.mp4
    video_square.mp4
    video_portrait.mp4
    video_landscape.mp4
  thumbnails/
    thumbnail.jpg
  captions/
    caption_instagram.txt
    caption_facebook.txt
    caption_youtube.txt
    caption_discord.txt
    hashtags.txt
    posting_notes.txt
  package_manifest.json
```

## Manifest purpose

`package_manifest.json` records what was created, which recipe created it, what source media was used, and whether checks or warnings were produced.

## Package rules

- Original media is not modified.
- Clean exports are default.
- Branding is optional and must be a recipe step.
- The package must be usable for manual posting even without any connector enabled.
- Package ZIP output should be downloadable and shareable.

## Future package types

```txt
short-form package
thumbnail-only package
caption package
branded optional package
campaign package
client delivery package
project archive package
```
