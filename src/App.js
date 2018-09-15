import React from 'react';
import * as Flex from '@twilio/flex-ui';
import CallButton from './callbutton.js';

class App extends React.Component {

  state = {};

  constructor(props) {
    super(props);

    
    const { configuration } = props;
    Flex.Manager.create(configuration)
      .then(manager => {

        const workspaceSid = manager.workerClient.workspaceSid
        const clientName = manager.workerClient.name
        const workerSid = manager.workerClient.sid
         /// replace with your caller id and twimlbin url  /////
        const callerId = "{your twilio number as a string}"
        const callButtonProps = {}

        callButtonProps.clientName = clientName;
        callButtonProps.workspaceSid = workspaceSid;
        callButtonProps.workerSid = workerSid;
        callButtonProps.callerId = callerId;

        Flex.MainHeader.Content.add(<CallButton taskProps={callButtonProps}/>)

        manager.workerClient.on("reservationCreated", res =>
        {
          this.replaceActionFunction(callerId)
          Flex.Actions.invokeAction("AcceptTask", {task: res.task})
        })

        this.setState({manager})

      })
      .catch(error => this.setState({ error }));
  }

  replaceActionFunction(callerid)
  {
    Flex.Actions.replaceAction("AcceptTask", (payload, original) => {
      return new Promise((resolve, reject) => {
        const reservation = Flex.StateHelper.getReservation(payload.task.sid)
        if (payload.task.taskChannelUniqueName === "voice") {
          var workerSid = reservation._worker.sid
          if (reservation.task.attributes.direction === "outbound") {

            const url = "{TwiMLbin URL}"
            
            reservation.call(callerid,
            url + "?TaskSid=" + payload.task.sid + "&WorkerSid=" + workerSid + "&CallerId=" + callerId,
                {accept: true})
          } else {
            reservation.conference({
              //conferenceStatusCallbackEvent: "leave",
              //conferenceStatusCallback: "https://example.com?"+payload.task.attributes.call_sid,
            });
          }
        } else {
          original(payload)
        }
        resolve();
      })
    })
  }

  render() {
    const { manager, error } = this.state;
    if (manager) {
      return (
        <Flex.ContextProvider manager={manager}>
          <Flex.RootContainer />
        </Flex.ContextProvider>
      );
    }

    if (error) {
      console.error("Failed to initialize Flex", error);
    }

    return null;
  }
}

export default App;
