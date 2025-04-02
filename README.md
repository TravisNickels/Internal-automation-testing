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

### Azure web jobs service bus

- Create `AzureWebJobsServiceBus` environment variable from the Azure Service Bus connection string.

  - Settings -> Shared access policies -> RootManageSharedAccessKey -> Primary connection string

    ```text
    Endpoint=sb://***.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=**************************
    ```

- Create `REPOSITORYSTANDARDSSTORAGEACCOUNTURI` environment variable from the Azure Storage account connection string.

  - Security + networking -> Access keys -> key 1 -> Connection string

    ```text
    DefaultEndpointsProtocol=https;AccountName=internalautomationblob;AccountKey=************************;EndpointSuffix=core.windows.net
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

- Then create the tunnel from the smee public URL to your local development path. The default port that Azure functions uses in Visual Studio 2022 is 7071

  ```console
  smee -u https://smee.io/{random generation} --path /api/{FunctionName} --port 7071
  ```

  ```console
  smee -u https://smee.io/I71ZrIdKZUXzP3uA --path /api/StatusUpdateReminder --port 7071
  ```

### GitHub App

#### Working with GitHub project V2 boards

Project V2 events are specifically organization-level events and are scoped to the organization that owns the project. This means that in order to do local testing on a project V2 board, you must have an app installed on a GitHub organization and not a personal account. Organizations can be created for free and can be owned by a personal account.

#### [Generate the App's private key](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps#generating-a-private-key)

- Settings -> Developer settings -> GitHub Apps -> {your app}
- General -> Private keys -> `generate a private key`
  - This will download a PEM file with the private key.
- Open the file and copy the key to the `GITHUB_APPPRIVATEKEY` variable in the `local.settings.json` file.

## Errors

### There is no functions runtime available that matches the version specified in the project

> Tools -> Options -> Projects & Solutions -> Azure functions and click on the "Check for updates" button.

StackOverflow reference: <https://stackoverflow.com/questions/75146087/running-azure-functions-locally-gives-no-runtime-error-after-net7-upgrade>
