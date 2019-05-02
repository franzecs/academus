export class Faculdade {

    public $key: string;

    constructor(
        public nome: string,
        public sigla: string,
        public mantenedora: string,
        public portaria: string,
        public url_logo: string,
    ) { }
}
