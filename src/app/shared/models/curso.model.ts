export class Curso {

    public $key: string;
    public faculdadeId: string;
    public faculdade: string;
    public segunda: string;
    public terca: string;
    public quarta: string;
    public quinta: string;
    public sexta: string;

    constructor(
        public nome: string,
        public coordenador: string,
        public portaria: string,
        public duracao: string,
        public sobre: string,
        public atividades: string,
        public mercado: string,
        public url_logo: string,
    ) { }
}
