export class Endereco {
    constructor(
       public cep: String,
       public logradouro: String,
       public complemento: String,
       public bairro: String,
       public cidade: String,
       public estado: String,
       public numero: String
    ) {}
}
