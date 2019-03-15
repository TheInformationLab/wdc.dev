# wdc.dev
[The Information Lab Web Data Connector Gallery](https://wdc.dev)

## Authorise WDCs on Tableau Server
First login to the tsm cli:
`tsm login`

Then whitelist the appropriate Web Data Connectors:
**EU Poll of Polls** - `tsm data-access web-data-connectors add --name "EU Poll of Polls" --url "https://eupollofpolls.wdc.dev:443/" --secondary "https://eupollofpolls.wdc.dev/(.*)"`
**Eventrbrite** - `tsm data-access web-data-connectors add --name "Eventbrite" --url "https://eventbrite.wdc.dev:443/" --secondary "https://eventbrite.wdc.dev/(.*)"`
**Kissflow** - `tsm data-access web-data-connectors add --name "Kissflow" --url "https://kissflow.wdc.dev:443/" --secondary "https://kissflow.wdc.dev/(.*)"`
**Meetup** - `tsm data-access web-data-connectors add --name "Meetup" --url "https://meetup.wdc.dev:443/" --secondary "https://meetup.wdc.dev/(.*)"`
**Spotify** - `tsm data-access web-data-connectors add --name "Spotify" --url "https://spotify.wdc.dev:443/" --secondary "https://spotify.wdc.dev/(.*)"`

Finally apply pending changes (requires restart of Tableau Server):
`tsm pending-changes apply`
