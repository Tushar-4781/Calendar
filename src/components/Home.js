import React from "react";
import {config} from "../App" 
import {message} from "antd"
import { withRouter } from "react-router-dom";

import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {Inject,ScheduleComponent,Day,Week,WorkWeek, Month, Agenda} from "@syncfusion/ej2-react-schedule"
class Home extends React.Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.actionComplete = this.actionComplete.bind(this);
        this.state = {
            loading: false,
            allEvents: [],
        };
    
    }

    validateResponse = (errored,response) => {
        console.log(response)
        if(errored){
            
            message.error(
                "Could not fetch events. Check that the backend is running, reachable and returns valid JSON."
              );
              return false;
        }
        
        return true;
    }
    performAPICall = async () => {
        let response = {};
        let errored = false;

        this.setState({
            loading: true
        })
        let token = localStorage.getItem("token");
        try{
            response = await ( await fetch(`${config.endpoint}/events`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${token}`
                },
            })).json();
        }
        catch(e){
            errored = true;
            
        }
        this.setState({
            loading: false
        })
        
        if(this.validateResponse(errored,response)){
            return response;
        }
    }
      
    getEvents = async ()=>{
        const response = await this.performAPICall();
        if(response){
            this.setState({
                allEvents: [...response.events]
            });
        }
    }

    addEvent = async (data) => {
        let response = {};
        let errored = false;
        this.setState({
          loading: true,
        });
        try {
          let token = localStorage.getItem("token");
          response = await (
            await fetch(`${config.endpoint}/events`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            
              },
              body: JSON.stringify({
                eventInfo: data
              }),
            })
          ).json();
        } catch (e) {
          errored = true;
        }
        this.setState({
          loading: false,
        });
        if (this.validateResponse(errored, response)) {
          return response;
        }
    
    };
    
    updateEvent = async (URL,datax) => {
        console.log(URL,datax)
        let response = {};
        let errored = false;

        this.setState({
            loading: true
        })
        let token = localStorage.getItem("token");
        try{
            console.log(URL)
            response = await ( await fetch(URL,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    data: datax
                })
            })).json();
        }
        catch(e){
            errored = true;
            
        }
        this.setState({
            loading: false
        })
        console.log(response)
        if(this.validateResponse(errored,response)){
            
            return response;
            
        }
    }

    logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        this.props.history.push("/login");
    };
    
    actionComplete = (e)=>{
        if(e.requestType==="eventCreated"){
            this.addEvent(e.data[0]);
        }
        else if(e.requestType==="eventChanged"){
             this.updateEvent(`${config.endpoint}/events/update`,e);
        }
        else if(e.requestType==="eventRemoved"){            
              this.updateEvent(`${config.endpoint}/events/delete`,e);
        }
    }
    
    componentDidMount(){
        this.getEvents();
    }
    
    render(){
        
        return(
            <div>
            <ButtonComponent id='add' title='Add' onClick={this.logout}>Log Out</ButtonComponent>
            <ScheduleComponent currentView = "Month"
                    ref = {this.myRef}
                    actionComplete={(e)=>{this.actionComplete(e)}}
                    eventSettings={{ dataSource: this.state.allEvents }}                                
                    >
                <Inject services={[Day,Week,WorkWeek, Month, Agenda]}/>
            </ScheduleComponent>
            </div>
        )
    }
}

export default withRouter(Home);