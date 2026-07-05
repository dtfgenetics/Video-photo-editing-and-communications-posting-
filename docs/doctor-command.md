# Doctor Command

The doctor command checks the scaffold before deeper code is added.

## Command

```txt
npm run doctor
```

or:

```txt
npm run check
```

## What it checks

- required project files
- required scaffold folders
- JSON schema files can be read
- recipe files can be read
- tool manifest files can be read
- recipe IDs are unique
- tool IDs are unique
- recipe steps point to existing tool manifests

## What it does not do yet

- run FFmpeg
- convert video
- generate thumbnails
- create ZIP packages
- start a dashboard
- connect to social platforms

## Expected result

```txt
Creator Engine Doctor
Result: PASS
```

If something is missing, the command should print the missing file, folder, or tool reference.
