import React from 'react'
import Routes from './routes'
import './index.css'

export default class App extends React.Component{

    constructor()
    {
        super();
        this.state = {
          };
    }
    
    render(){
        return(
            <div>
                <Routes/>
            </div>
        );
    }
}