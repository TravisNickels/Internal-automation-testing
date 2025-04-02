# Internal Automation

## Github Actions

- install node.js from website
- install @vercel/ncc

  - From powershell terminal

    ```console
    npm i -g @vercel/ncc
    ```

- Compile node.js module into a single file with all the dependencies

  ```console
  npm install
  ```

  or

  ```console
  ncc build index.js -o dist --license licenses.txt
  ```

## [Running locally](https://github.com/Particular/InternalAutomation#running-locally)

```xml
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "IS_RUNNING_LOCALLY":  true,
    "REPOSITORYSTANDARDSSTORAGEACCOUNTURI": "{StorageConnectionString}",
    "AzureWebJobsStorage": "{StorageConnectionString}",
    "AzureWebJobsServiceBus": "{AzureServiceBusConnectionString}",
    "DbConnectionString": "{DbConnectionString}",
    "GITHUB_TOKEN": "{GitHubToken}",
    "GITHUB_WEBHOOK_SECRETKEY":  "{GitHubWebhookSecretKey}",
    "PAGERDUTY_TOKEN": "{PagerDutyToken}",
    "APPSETTING_SLACK_OAUTH_BEARER_TOKEN": "{SlackToken}"
    "GITHUB_APPID": "{GitHubAppId}",
    "GITHUB_INSTALLATIONID": "{GitHubInstallationId}"
    "GITHUB_APPPRIVATEKEY": "{GitHubAppPrivateKey}"
  }
}
```

### Settings

#### "REPOSITORYSTANDARDSSTORAGEACCOUNTURI"

A connection string to an Azure Storage account.

- Create `REPOSITORYSTANDARDSSTORAGEACCOUNTURI` environment variable from the Azure Storage account connection string.

  - Security + networking -> Access keys -> key 1 -> Connection string

    ```text
    DefaultEndpointsProtocol=https;AccountName=internalautomationblob;AccountKey=************************;EndpointSuffix=core.windows.net
    ```

#### AzureWebJobsServiceBus

A connection string to an Azure Storage account.

- Create `AzureWebJobsServiceBus` environment variable from the Azure Service Bus connection string.

  - Settings -> Shared access policies -> RootManageSharedAccessKey -> Primary connection string

    ```text
    Endpoint=sb://***.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=**************************
    ```

#### GITHUB_INSTALLATIONID

- Settings -> Developer Settings => GitHub Apps => `Edit` {your app} => Install App
- Click the sprocket icon on the installed account
- In the URL is the number that you want to use for the `GITHUB_INSTALLATIONID` environment variable
  - `https://github.com/organizations/ParticularTesting/settings/installations/{installationId}`

### GitHub App

#### Working with GitHub project V2 boards

Project V2 events are specifically organization-level events and are scoped to the organization that owns the project. This means that in order to do local testing on a project V2 board, you must have an app installed on a GitHub organization and not a personal account.
Organizations can be created for free and can be owned by a personal account.

#### Permissions & events

- Settings -> Developer settings -> GitHub Apps -> {your app} -> Permissions & events

##### Permissions

- Repository permissions
  - Issues - `Read and write`
  - Metadata - `Mandatory`
- Organization permissions
  - Events - `Read-only`
  - Projects - `Read and write`

##### Events

- Issues
- Label
- Project v2
- Project v2 item
- Project v2 status update

#### Generate a client secret

- Settings -> Developer settings -> GitHub Apps -> {your app}
- General -> Generate a client secret

#### [Generate the App's private key](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps#generating-a-private-key)

- Settings -> Developer settings -> GitHub Apps -> {your app}
- General -> Private keys -> `generate a private key`
  - This will download a PEM file with the private key.
- Open the file and copy the key to the `GITHUB_APPPRIVATEKEY` variable in the `local.settings.json` file.

### Run Azurite

Navigate to the [Azurite executable file location](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio%2Cblob-storage#azurite-executable-file-location) and run the executable file:

```console
cd C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\IDE\Extensions\Microsoft\Azure Storage Emulator
```

```console
Azurite.exe
```

```text
Azurite Blob service is starting at http://127.0.0.1:10000
Azurite Blob service is successfully listening at http://127.0.0.1:10000
Azurite Queue service is starting at http://127.0.0.1:10001
Azurite Queue service is successfully listening at http://127.0.0.1:10001
Azurite Table service is starting at http://127.0.0.1:10002
Azurite Table service is successfully listening at http://127.0.0.1:10002
```

### Smee.io

- Go to [smee.io](https://smee.io/) to generate the url for the tunnel
- In GitHub go to:

  - Settings -> Developer settings -> GitHub Apps -> {your app}
  - General -> Webhook

    - Enter the Webhook URL that was generated from smee.io

      ```text
      https://smee.io/{random generation}
      ```

- From a terminal install the the smee client

  ```console
  npm install --global smee-client
  ```

- Then create the tunnel from the smee public URL to your local development path. The default port that Azure functions uses in Visual Studio 2022 is 7071 or 7290

  ```console
  smee -u https://smee.io/{random generation} --path /api/{FunctionName} --port 7290
  ```

  ```console
  smee -u https://smee.io/I71ZrIdKZUXzP3uA --path /api/StatusUpdateReminder --port 7290
  ```

## Errors

### There is no functions runtime available that matches the version specified in the project

> Tools -> Options -> Projects & Solutions -> Azure functions and click on the "Check for updates" button.

StackOverflow reference: <https://stackoverflow.com/questions/75146087/running-azure-functions-locally-gives-no-runtime-error-after-net7-upgrade>
