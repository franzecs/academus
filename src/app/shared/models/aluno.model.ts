import { User } from './user.model';

export class Aluno extends User {

    public $key: string;
    public identificador: string;
    public photo: string;
    public endereco: string;
    public fixo: string;
    public celular: string;
    public outro: string;
    public email2: string;
    public semestre: string;
    public cursoId: string;
    public status: string;

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
