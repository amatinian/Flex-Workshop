exports.handler = function(context, event, callback) {

    const accountSid = context.ACCOUNT_SID;
    const authtoken = context.AUTH_TOKEN;
    const client = require('twilio')(accountSid, authtoken);
    
    const taskSid = event.TaskSid;
    const conferenceSid = event.ConferenceSid;
    const workerCallSid = event.CallSid;
    const sequenceNumber = event.SequenceNumber;
    const destinationNumber = "{destination number}";
    const callerID = event.callerId;
    const workspaceSid = context.TWILIO_WORKSPACE_SID;

    if(sequenceNumber == 1)
    {
        console.log("Sequence number " + sequenceNumber +".Updating task with attribues");

        console.log("Destionation number:" + destinationNumber);

        client.conferences(conferenceSid)
        .participants
        .create({from: callerID, to: destinationNumber, endConferenceOnExit: true})
        .then(participant => 
            {
                const customerCallSid = participant.callSid;

                const attributesForTaskUpdate = {};

                attributesForTaskUpdate.conference = {};

                attributesForTaskUpdate.conference.sid = conferenceSid;
                attributesForTaskUpdate.conference.participants = {worker: workerCallSid, customer: customerCallSid};

                client.taskrouter.workspaces(workspaceSid)
                .tasks(taskSid)
                .update({attributes: JSON.stringify(attributesForTaskUpdate)})
                .then( updatedTask =>
                    {
                        console.log("Task successully updated");
                        let response = new Twilio.Response();
                        
                        // Build list of headers
                        let headers = {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Content-Type": "application/json"
                        };
        

                        // Set headers in response
                        response.setHeaders(headers);
                        //////////////////////////

                        response.setBody({'task_status': "success"});
    
                        callback(null, response);
                    }

                ).done()

                console.log(participant.callSid);})
        .done();

    }
    
    else{
    
        console.log("sequence number " + sequenceNumber + ". Task will not updated");
    }

}