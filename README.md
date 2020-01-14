# disarm-api-dashboard

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

Optionally prefix to set API_URL

```
VUE_APP_API_URL=http://localhost:5000/api.json npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Features

Provides visibility and control over deployed functions. Expands the existing dashboard functionality.

A user can:
- view a list of deployed functions (see deployed image/version, whether live on OF + AT or only one)
- view the recent logs for any function
- run a standard test against each function
- trigger deployment/removal (depending on status of AT data)

Access to the dashboard is open. Data comes from Airtable and the OpenFaaS API, via a Google Cloud Function acting as an authenticated API.

## Actions

Airtable acts as the data backend, and access is controlled by Airtable. The following dashboard capabilities depend on the state of the Airtable data. Changing the Airtable data alone will not trigger any actions.

1. `Deploy`: for a function which is not currently running on OF, but is included in Airtable
2. `Test`: for a function running on OF and with an entry in its `test_req.json` field.
3. `View logs`: for a function running on OF
4. `Remove`: for a function which has a `hide_from_deployment` flag set to true in Airtable.

## Analytics

Leveraging the Prometheus backend and logging from Traefik, we are able to determine which users are using which functions, and how long each function is running for.

The analytics are calculated over a specific time-frame. (Editable?)
