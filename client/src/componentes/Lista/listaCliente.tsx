import { Component } from "react";

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import '../Style/myStyle.css'
import FormularioCadastroCliente from "../Formulario/formularioCadastroCliente";
import FormularioEdicaoCliente from "../Formulario/edicao/formularioEdicaoCliente";
import Cliente from "../../Models/cliente";
import Swal from "sweetalert2";

type prop = {
  tema: string;
};

type state = {
  clientes: Array<any>
  clienteSelected: Cliente | undefined
}

export default class ListaCliente extends Component<prop, state> {

  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      clienteSelected: undefined
    }
    this.onClickDelete = this.onClickDelete.bind(this)
    this.onClickEdit = this.onClickEdit.bind(this)
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

    var elemsModal = document.querySelectorAll('.modal');
    M.Modal.init(elemsModal);

    fetch("http://localhost:3001/cliente", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).then(r => {
      this.setState({
        clientes: r
      })
    });
  }

  onClickEdit(event) {
    let id = event.target.id
    let idNumber = new Number(id).valueOf()
    let cliente = this.state.clientes.find(item => item.id == idNumber);
    this.setState({
      clienteSelected: cliente
    })
  }

  componentDidUpdate(prevProps: Readonly<prop>, prevState: Readonly<state>, snapshot?: any): void {
    if (prevState.clienteSelected != this.state.clienteSelected) {
      var elemsModal = document.querySelectorAll('.modal');
      M.Modal.init(elemsModal);
    }
  }

  async deletarCliente(id): Promise<boolean> {
    let retorno = false
    await fetch("http://localhost:3001/cliente/deletar/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      retorno = response.status === 200
    })
    return retorno
  }

  onClickDelete(event) {
    let id = event.target.id
    Swal.fire({
      title: 'Deletar cliente',
      text: "Essa ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let deleted = await this.deletarCliente(id)
        if (deleted) {
          Swal.fire(
            'Deletado!',
            'Cliente deletado com sucesso.',
            'success'
          ).then(result => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.reload()
          })
        } else {
          Swal.fire(
            'Erro!',
            'Um erro ocorreu.',
            'error'
          ).then(result => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.reload()
          })
        }
      }
    })
  }

  render() {
    return (
      <div id="backgroundClientContainer">
        <div id="titleContainer">
          <h4 id="Title">Clientes cadastrados</h4>
        </div>
        <div id="collapsibleContainer">
          <ul className="collapsible">
            {this.state.clientes.map(item => {
              let cliente = new Cliente(item.nome, item.cpf, item.email)
              cliente.id = item.id
              let dataCadastro = new Date(item.createdAt)
              return (
                <li key={cliente.nome}>
                  <div id="collapsibleHeader" className="collapsible-header">
                    {cliente.nome}
                  </div>
                  <div id="collapsibleBody" className="collapsible-body">
                    <span>Email: {cliente.email}</span><br />
                    <span>CPF: {cliente.cpf}</span><br />
                    <span>Cadastrado em: {dataCadastro.toLocaleString()}</span>
                    <br />
                    <div id="editDeleteButtonContainer">
                      <button id="editDeleteButton" data-target="modalEdit" className="btn-floating btn-medium  teal lighten-2 pulse modal-trigger"><i id={item.id} onClick={this.onClickEdit} className="small material-icons">create</i></button>
                      <button id="editDeleteButton" className="btn-floating btn-medium  teal lighten-2 pulse"><i id={item.id} onClick={this.onClickDelete} className="small material-icons">delete</i></button>
                     </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div id="addButtonContainer">
          <a href="#modalCadastro" className="btn-floating btn-large  teal lighten-2 pulse modal-trigger"><i className="large material-icons">add</i></a>
        </div>

        {/* ----------------------------------------------------------------MODAL---------------------------------------------------------------- */}

        <div id="modalCadastro" className="modal modal-fixed-footer">
          <FormularioCadastroCliente tema="#ff4081  teal lighten-2" />
        </div>
        <div id="modalEdit" className="modal modal-fixed-footer">
          {this.state.clienteSelected?.id && <FormularioEdicaoCliente cliente={this.state.clienteSelected} />}
        </div>
      </div >
    );
  }
}