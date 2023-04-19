import { Component } from "react";
import Swal from "sweetalert2";

type props = {
    tema: string
}

export default class FormularioCadastroCliente extends Component<props> {

    private nome
    private nomeSocial
    private cpf
    private email
    private telefone
    private genero

    constructor(props: props | Readonly<props>) {
        super(props);

        this.onClickNome = this.onClickNome.bind(this)
        this.onClickCpf = this.onClickCpf.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onClickEmail = this.onClickEmail.bind(this)
    }

    componentDidMount(): void {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }

    async cadastro(): Promise<boolean> {
        let retorno = false
        let mapeado = {
            nome: this.nome,
            cpf: this.cpf,
            email: this.email
        }
        await fetch("http://localhost:3001/cliente/cadastrar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mapeado)
        }).then(r => {
            retorno = r.status === 200
        })
        return retorno
    }

    async onSubmit() {
        if (
            !this.nome || this.nome === "" ||
            !this.email || this.email === "" ||
            !this.cpf || this.cpf === ""
        ) {
            Swal.fire("Erro!", "Preencha todos os campos.", "error");
            return;
        }

        if ((this.cpf + "").length < 11) {
            Swal.fire({
                icon: "error",
                title: "CPF inválido.",
            });
            return;
        }

        if (!this.email.includes("@") || !this.email.includes(".com")) {
            Swal.fire({
                icon: "error",
                title: "E-mail inválido",
                text: "E-mail deve conter '@' e '.com'",
            });
            return;
        }

        let resposta = await this.cadastro()
        if (resposta) {
            Swal.fire(
                'Sucesso!',
                'Cliente cadastrado com sucesso.',
                'success'
            ).then(result => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.reload()
            })
        } else {
            Swal.fire(
                'Erro!',
                'Não foi possível cadastrar.',
                'error'
            ).then(result => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.location.reload()
            })
        }
    }

    onClickNome(event) {
        this.nome = event.target.value
    }

    onClickCpf(event) {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }
        this.cpf = event.target.value
    }

    onClickEmail(event) {
        this.email = event.target.value
    }

    render() {
        return (
            <>
                <div className="modal-content">
                    <h5>Cadastro de Cliente</h5>
                    <div className="row">
                        <form className="col s12">
                            <div id="modalLine" className="row">
                                <div className="input-field col s12">
                                    <input id="nome" type="text" onChange={this.onClickNome} />
                                    <label htmlFor="nome">Nome</label>
                                </div>
                            </div>
                            <div id="modalLine" className="row">
                                <div className="input-field col s6">
                                    <input id="cpf" type="number" maxLength={11} onChange={this.onClickCpf} />
                                    <label htmlFor="cpf">CPF</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="email" type="email" onChange={this.onClickEmail} />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                        </form>
                    </div >
                </div>
                <div className="modal-footer">
                    <button id="cancelButtonContainer" className="modal-close waves-effect waves-light btn-flat">
                        <a href="#!"><i id="cancelButton" className="material-icons right">cancel</i></a>Cancelar
                    </button>
                    <button id="cadastrarButtonContainer" onClick={this.onSubmit} type="submit" name="action" className="waves-effect waves-light btn-flat">
                        <a href="#!"><i id="sendButton" className="material-icons right">send</i></a>Cadastrar
                    </button>
                </div>
            </>
        )
    }
}