# Connector System

Connectors are optional modules that let Creator Engine communicate with outside systems.

## Connector rule

The core engine must work without any connector enabled.

## Connector examples

- folder watch
- Discord
- WordPress
- YouTube
- cloud storage
- future social APIs
- future automation systems

## Connector manifest

Every connector must declare:

- connector ID
- name
- version
- auth type
- inputs
- outputs
- permissions
- settings
- handled events
- emitted events

## First connector target

The first practical connector should be local folder watch or Discord webhook after the clean package engine works.
