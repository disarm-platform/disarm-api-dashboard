# disarm-api-dashboard

## Env vars

### For UI
Stick in `.env.build` file
- `VUE_APP_API_URL`: optional, defaults to `/api` (i.e. same host as UI)
- `VUE_APP_OPENFAAS_URL`: optional, defaults to https://faas.srv.disarm.io
- `VUE_APP_CORS_PROXY: optional, defaults to https://cors-anywhere.srv.disarm.io

### For API
Stick in a `.env`
- `OPENFAAS_KEY`: required
- `AIRTABLE_KEY`: required
- `AIRTABLE_URL`: optional, defaults to https://api.airtable.com/v0/appUekRZWqLHK31zF/Algos


## Combined UI and API deployment on Now/Zeit

Trying out deployment with `now.sh`

- Run with `now dev`
- No matter what ports it says, it really seems to run on port `3000`
- Open the UI on `http://localhost:3000`
- The API is being served on `http://localhost:3000/api`


### Secrets

- For local dev, you need two files: `.env` and `.env.build`:
  - `.env.build` contains the properties required for UI (see list above)
  - `.env` contains the properties required for API (see list above)

You can create secrets for remote deployment use `now secret create ...` - *remember* that they must be in lowercase for some reason. Check the `now.json` file for mapping of secrets to env vars.

## Original Vue-cli project setup instructions

With the Now deployment, these are still relevant, but not so straightforward.

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

