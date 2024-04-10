# Android configuration

## Steps 

* `npm install @capacitor/core @capacitor/cli`
* `npx cap init`
* Configure `capacitor.config.ts` , add `webDir: 'dist/snake/browser'` where index.html file is there.
* `npx cap add android`
* `npx cap copy`
* In local.properties file add path to the android sdk

* Setup

```bash 
sdk.dir=path/to/sdk
```

# Needed
* `java version =/usr/lib/jvm/java-17-openjdk-amd64`
* `export ANDROID_HOME="$HOME/Android/Sdk"`