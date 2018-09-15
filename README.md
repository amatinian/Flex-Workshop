# Twilio Flex UI with outbound calls capability

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Instructions

1. Install all dependencies by running:
```
npm install
```
2. Copy appConfig.sample.js in public/assets folder and configure accordingly to use your Twilio account
```
cp public/assets/appConfig.sample.js public/assets/appConfig.js
```
3. Start Flex UI by running:
```
npm start
```
## Please note

This example will work only with the locally hosted quickstart at the moment, support for hosted Flex is coming soon.

## Setting up

This example is built with Twilio Flex Quickstart, hence in order to get started, create a new project in the Twilio dashboard and go to -> https://www.twilio.com/console/flex/quickstart, run the quickstart and let it deploy.

After you have the quickstart up and running download the ui samples, should be at step 3 - "Download Flex UI and Flex Webchat".

When the download is complete, open the zip archive. Copy over the content of the git to flex-ui-sample folder, replacing the app.js

The server part of this example can run serverless on Twilio Functions, however it can also run locally on Node.js. To run it on Twilio Functions Create the following functions (https://www.twilio.com/console/runtime/functions/manage) with the following paths:

* Flex update call task -- `/flex_task_update`
* Flex task for outbound call -- `/flex_create_task`

And copy the code from the corespoding files body in the /server folder to the functions metioned above.

Edit `/src/app.js` and change the value: 

```
const callerId = xxxx 
```
With either your Twilio verified number or one of the Twilio numbers that you have in your inventory.

 
 For `const url = "{TwiMLbin URL}"` - go to TwiMLbins in Runtime in the Twilio console (https://www.twilio.com/console/runtime/twiml-bins) and create a new TwiML bin with the following TwiML:
 
```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial><Conference statusCallback='https://{replace with your Runtime Domain}/flex_task_update?TaskSid={{TaskSid}}&amp;WorkerSid={{WorkerSid}}&amp;destinationNumber={{destinationNumber}}&amp;callerId={{callerId}}' statusCallbackEvent='join' endConferenceOnExit='true'>{{TaskSid}}</Conference></Dial>
</Response>  
```

Replace the `{replace with your Runtime Domain}` with your Runtime Domain url. 

Save the TwiMlbin and assign the url generated in the TwiMlbin to the `url` constant and save the App.js file. 

Next, edit `/server/flex-create-task.js` and assign the destination number value you want to call:

```
const destinationNumber = "{destination number}";
```

Looks like you are all set! :)

Happy hacking!
