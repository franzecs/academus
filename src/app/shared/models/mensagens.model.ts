export const MENSAGENS: Mensagem[] = [
    {
        msgUsa: 'The password is invalid or the user does not have a password.',
        msgBr: 'A senha é inválida ou o usuário não possui uma senha.'
    },
    {
        msgUsa: 'The email address is badly formatted.',
        msgBr: 'O endereço de email está mal formatado.'
    },
    {
        msgUsa: 'There is no user record corresponding to this identifier. The user may have been deleted.',
        msgBr: 'Não há registro de usuário correspondente a esse identificador. O usuário pode ter sido excluído.'
    },
    {
        msgUsa: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
        msgBr: 'Ocorreu um erro de rede (como tempo limite, conexão interrompida ou host inacessível).'
    }
];

export class Mensagem {
    constructor(public msgUsa: string, public msgBr: string) { }
}
