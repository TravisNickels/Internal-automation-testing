# create-reminder-action
## Github Actions
- install node.js from website
- install @vercel/ncc
	- From powershell terminal 
    ```
    > npm i -g @vercel/ncc
    ```
- Compile node.js module into a single file with all the dependencies
    ``` 
    > npm install 
    ```
    or 
    ```
    > ncc build index.js -o dist --license licenses.txt
    ```

## InternalAutomation
- Create `AzureWebJobsServiceBus` environment variable from the Azure Service Bus connection string.
     - Settings -> Shared access policies -> RootManageSharedAccessKey -> Primary connection string
        ```
        Endpoint=sb://***.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=********************************************
        ```

- Connect to smee.io
    - Go to smee.io to generate the url for the tunnel 
    - In GitHub go to: 
        - Settings -> Developer settings -> GitHub Apps -> {your app}
        - General -> Webhook
            - Enter the Webhook URL that was generated from smee.io
                ```
                https://smee.io/{random generation}
                ```
    - From a terminal install the the smee client
        ```
        > npm install --global smee-client
        ```
    
    - Then create the tunnel from the smee public URL to your local development path.  The default port that Azure functions uses in Visual Studio 2022 is 7071
        ```    
        > smee -u https://smee.io/{random generation} --path /api/{FunctionName} --port 7071



        > smee -u https://smee.io/I71ZrIdKZUXzP3uA --path /api/StatusUpdateReminder --port 7071
        ```
- [Generate the App's private key](https://docs.github.com/en/developers/apps/building-github-apps/authenticating-with-github-apps#generating-a-private-key)
    - In GitHub go to: 
        - Settings -> Developer settings -> GitHub Apps -> {your app}
        - General -> Private keys -> `generate a private key`
            - This will download a PEM file with the private key.
        - Open the file and copy the key to the `GITHUB_APPPRIVATEKEY` variable in the `local.settings.json` file.
        
