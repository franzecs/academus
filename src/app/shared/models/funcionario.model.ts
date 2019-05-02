import { User } from './user.model';

export class Funcionario extends User {
    public $key: string;
    public identificador: string;
    public celular: string;
    public endereco: string;
    public photo: string;
    public setor: string;

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
