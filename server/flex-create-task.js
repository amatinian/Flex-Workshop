exports.handler = function(context, event, callback) {
	
    const accountSid = context.ACCOUNT_SID;
    const authtoken = context.AUTH_TOKEN;
    

    const clientName = event.clientName;
    const workerSid = event.workerSid;
    const workspaceSid = context.TWILIO_WORKSPACE_SID;
    const workflowSid = context.TWILIO_WORKFLOW_SID;
    const taskChannelName = "voice";
    
    const taskAttributes = {}

    taskAttributes.workerId = clientName;
    taskAttributes.type = "inbound";
    taskAttributes.direction = "outbound";

    const client = require('twilio')(accountSid, authtoken);

    client.taskrouter.workspaces(workspaceSid)
                 .tasks
                 .create({attributes: JSON.stringify(taskAttributes), workflowSid: workflowSid, taskChannel: taskChannelName})
                 .then( 
                     
                   
                    task => {
                    console.log("Task created");
                        //Handle CORS event, allow all origins to make cross domain request
	                    ///////////////////////////
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

                        response.setBody({'sid': task.sid});
    
                        callback(null, response);
                        
                        
                        console.log(task.sid);})
                 .done();

};