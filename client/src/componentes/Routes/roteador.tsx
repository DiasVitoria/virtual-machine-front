import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "../Lista/listaCliente";

type state = {
    tela: string
}

export default class Roteador extends Component<{}, state> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#4db6ac teal lighten-2" botoes={['Clientes']} />
        if (this.state.tela === "Clientes") {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="#4db6ac teal lighten-2" />
                </>
            )
        } 
    }
}