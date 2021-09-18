import React from 'react'
import LabelAndInput from './labelAndInput'
import { Link } from "react-router-dom"
import { rootUrl } from '../config/App'

export default class Desktop1 extends React.Component {

    constructor()
    {
        super();
        this.state = {
            usd: 0,
            brl: 0,
            eur: 0,
            cad: 0,
            btc: 1,
            message: ''
          };

        this.usd = 0;
        this.brl = 0;
        this.eur = 0;
        this.cad = 0;
    }

    castValue = (value) => {
        return value.toFixed(2); 
    }

    handlerChange = (e) => { 

            this.setState ({
                btc : e.target.value,
                usd : this.usd * e.target.value,
                brl : this.brl * e.target.value,
                eur : this.eur * e.target.value,
                cad : this.cad * e.target.value
            })

    }

    componentDidMount () {

        let url = rootUrl + 'api/crypto/btc';

        fetch(url, {
            method: "get",
            }).then(response => response.json()
            ).then(data => { 

                if (data.bpi !== '') 
                {

                    this.usd = data.bpi.USD.rate_float;
                    this.brl = data.bpi.BRL.rate_float;
                    this.eur = data.bpi.EUR.rate_float;
                    this.cad = data.bpi.CAD.rate_float;

                    this.setState ({
                        usd : this.usd,
                        brl : this.brl,
                        eur : this.eur,
                        cad : this.cad
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
                    <div style={{ color : 'red', padding: '10px' }}>{this.state.message}</div>

                    <Link id="btnatualizar" className="gray" to={`/config`}>Atualizar valor monetário</Link>

                    <LabelAndInput name="btc" label="BTC" onChange={this.handlerChange} value={this.state.btc} classe="form-group-btc"></LabelAndInput>

                    <div id="inputs">

                        <LabelAndInput name="usd" label="USD" value={this.castValue(this.state.usd)} readOnly classe="form-group"></LabelAndInput>
                        <LabelAndInput name="brl" label="BRL" value={this.castValue(this.state.brl)} readOnly classe="form-group"></LabelAndInput>
                        <LabelAndInput name="eur" label="EUR" value={this.castValue(this.state.eur)} readOnly classe="form-group"></LabelAndInput>
                        <LabelAndInput name="cad" label="CAD" value={this.castValue(this.state.cad)} readOnly classe="form-group"></LabelAndInput>

                    </div>

                </div>
            </div>
        );
    }
}