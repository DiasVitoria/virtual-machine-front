export default class Cliente{
    public nome: string
    public cpf: string
    public email: string
    public id!: number
    public createdAt!: Date
    public updatedAt!: Date

    constructor(nome: string, cpf: string, email: string){
        this.cpf = cpf
        this.nome = nome
        this.email = email
    }
}