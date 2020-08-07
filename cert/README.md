# SSL certificate on Mac OS X
### Step 1: Verify that you have openssl installed

``` bash
# which openssl
which openssl

# Install openssl
brew install openssl

```

### Step 2: Generate a certificate
``` bash
bash generate.sh
```

### Step 3: Install the certificate
- Double click on the certificate (server.crt)
- Select your desired keychain (login should suffice)
- Add the certificate
- Open Keychain Access if it isn’t already open
- Select the keychain you chose earlier
- You should see the certificate localhost
- Double click on the certificate
- Expand Trust
- Select the option Always Trust in When using this certificate
- Close the certificate window

## Further help
https://medium.com/@rubenvermeulen/running-angular-cli-over-https-with-a-trusted-certificate-4a0d5f92747a
