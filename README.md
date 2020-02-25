# DiSARM API management dashboard

Tool to help us manage the deployed DiSARM algorithms and functions.

Dashboard itself is deployed on Zeit/Now - which includes both the UI and the backend/API.

## Env vars

### For UI
Stick in `.env.build` file
- `VUE_APP_OPENFAAS_URL`: defaults to https://faas.srv.disarm.io
- `VUE_APP_CORS_PROXY`: defaults to https://cors-anywhere.srv.disarm.io

### For API
Stick in a `.env`
- `OPENFAAS_KEY`: required
- `AIRTABLE_KEY`: required
- `AIRTABLE_URL`: defaults to https://api.airtable.com/v0/appUekRZWqLHK31zF/Algos


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
VUE_APP_API_URL=http://localhost:8080 npm run serve
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

Airtable acts as the data backend, and access is controlled by Airtable. The `deploy` action depends on Airtable containing the required fields.

## Now

Trying out deployment with `now.sh`, need to remember this: the API will get served up on port 3000. Obvs...
