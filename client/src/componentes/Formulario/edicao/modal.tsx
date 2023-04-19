import { Component, ReactNode } from "react";
import Cliente from "../../../Models/cliente";
import FormularioEdicaoCliente from "./formularioEdicaoCliente";


type props = {
    id: string
    class: string
    cliente: Cliente
}

export default class ModalTeste extends Component<props>{

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: props | Readonly<props>) {
        super(props);
    }

    render(): ReactNode {
        return (
            <>
                <div id={this.props.id} className={this.props.class}>
                    <FormularioEdicaoCliente cliente={this.props.cliente} />
                </div>
            </>
        )
    }
}