import { User } from 'src/app/shared/models/user.model';

export class Professor extends User {

    public $key: string;
    public identificador: string;
    public photo: string;
    public endereco: string;
    public fixo: string;
    public celular: string;
    public outro: string;
    public email2: string;
    public cpf: string;
    public rg: string;
    public graduacao: string;
    public titulacao: string;
    public area: string;
    public lattes: string;

    constructor(
        public name: string,
        public username: string,
        public email: string,
        public tipo: string,
        public auth: number[],

    ) {
        super(name, username, email, tipo, auth);
    }
}
