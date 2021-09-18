import React from 'react';
import LabelAndInput from './labelAndInput'
import { rootUrl } from '../config/App'

export default class Desktop2 extends React.Component {

    constructor()
    {
        super();
        this.state = {
            email : '',
            password : '',
            message: ''
          };
    }

    handlerEmail = (e) => { 
        this.setState ({
            email : e.target.value
        })
    }

    handlerPassword = (e) => { 
        this.setState ({
            password : e.target.value
        })
    }

    handlerEntrar = (e) => {

        let url = rootUrl + 'api/login';

        fetch(url, {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
          }).then(response => response.json()
          ).then(data => { 
            if (data.message !== '') 
                {
                this.setState ({
                    message : data.message
                })
            } 
            if (data.token) 
                {
                    localStorage.setItem('access_token', JSON.stringify(data.token))
                    this.props.history.push('/');
                } 
            }).catch(
            error => console.log('erro' + error)
          );
    }

    render(){
        return(
            <div className="desktop">
                <div className="area">

                    <div id="boxlogin">
                        <div style={{ color : 'red', padding: '10px' }}>{this.state.message}</div>

                        <LabelAndInput name="Email" label="Email" onChange={this.handlerEmail} classe="form-group"></LabelAndInput>
                        <LabelAndInput name="Senha" label="Senha" onChange={this.handlerPassword} classe="form-group"></LabelAndInput>

                        <button id="btnentrar" onClick={this.handlerEntrar} className="green">Entrar</button>

                    </div>


                </div>
            </div>
        );
    }
}