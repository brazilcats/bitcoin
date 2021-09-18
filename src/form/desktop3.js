import React from 'react';
import LabelAndInput from './labelAndInput'
import LabelAndSelect from './labelAndSelect'
import { Link } from "react-router-dom"
import { rootUrl } from '../config/App'

export default class Desktop3 extends React.Component {

    constructor()
    {
        super();
        this.state = {
            brl: 0,
            eur: 0,
            cad: 0,
            atualcurrency: '',
            atualvalue: 0,
            new: 0
          };
    }

    componentDidMount () {

        //let url = process.env.PUBLIC_URL + "storage/json/currencies.json";
        let url = rootUrl + 'api/json';

        fetch(url, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
            }).then(response => response.json()
            ).then(data => { 
                
                    this.setState ({
                        brl : data.BRL,
                        eur : data.EUR,
                        cad : data.CAD,
                        atualcurrency : 'BRL',
                        atualvalue : data.BRL,
                        newvalue: 0
                    });

            }).catch(
            error => console.log('erro' + error)
            );
    }

    handlerChangeValue = (e) => { 

        this.setState ({
            newvalue : e.target.value
        })

    }

    handlerChange = (e) => { 

        var atualcurrency = '';
        var atualvalue = '';

        switch (e.target.value) {
            case 'BRL' : 
            atualcurrency = 'BRL'
            atualvalue = this.state.brl
            break;
            case 'EUR' : 
            atualcurrency = 'EUR'
            atualvalue = this.state.eur
            break;
            case 'CAD' : 
            atualcurrency = 'CAD'
            atualvalue = this.state.cad
            break;
            default:
        }

        this.setState ({
            atualcurrency : atualcurrency,
            atualvalue : atualvalue,
        })

    }

    handlerClick = () => {

        var self = this
        let url = rootUrl + 'api/crypto/btc';

        fetch(url, {
            method: "post",
            headers: {'Content-Type': 'application/json',  Authorization: JSON.stringify(localStorage.getItem('access_token'))},
            body: JSON.stringify({
              currency: self.state.atualcurrency,
              value: self.state.newvalue
            })
          }).then(response => response.json()
          ).then(data => {
            if (data.message !== '') 
                {
                this.setState ({
                    message : data.message,
                    atualvalue: self.state.newvalue
                })
            } 
            }).catch(
            error => console.log('erro' + error)
          );


    }


    render(){
        return(
            <div className="desktop">
                <div className="area">
                
                <div style={{ textAlign : 'left', width : '100%'}}><Link id="btnvoltar" to={`/`}>Voltar</Link></div>

                    <div id="boxlogin">
    
                        <div style={{ color : 'red', padding: '10px' }}>{this.state.message}</div>

                        <LabelAndSelect name="moeda" label="Moeda" onChange={this.handlerChange} classe="form-group"></LabelAndSelect>

                        <div style={{ width : '100%' }}><strong>Valor Atual: </strong>{this.state.atualvalue}</div>

                        <LabelAndInput name="valor" label="Novo valor" onChange={this.handlerChangeValue} classe="form-group"></LabelAndInput>

                        <button id="btnatualizar" onClick={this.handlerClick} className="green">Atualizar</button>

                    </div>


                </div>
            </div>
        );
    }
}