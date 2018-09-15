import React from 'react';

class CallButton extends React.Component
{
    state = {}
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }    
    handleClick()
    {   
        ///////////////////////////////////////////////////////////////////////////
        //                                                                      ///
        // make a request to Flex_Create_task passing                          ////
        // clientName: the workerClient.name value (essntialy worker name)     ////
        // workerSid: the worker sod (workerClient.sid)                        ////
        // workspaceSid: the workspace sid                                     ////
        ///////////////////////////////////////////////////////////////////////////

        const queryString = "?clientName=" + this.props.taskProps.clientName + 
        "&workerSid=" + this.props.taskProps.workerSid + 
        "&workspaceSid=" + this.props.taskProps.workspaceSid + 
        "&callerId=" + this.props.taskProps.callerId

        fetch('{replace with Runtime domain}/flex_create_task?' + queryString)
          .then(response => response.json())
          .then(jsondata => console.log(jsondata));
    }
    render(){
        return (
            <div>
            <button onClick={this.handleClick}>Click To Call</button>
            </div>
        )
    }
}
export default CallButton;