export class FileUpload{
    id: string
    name: string
    url: string
    tipo: string
    file: File

    constructor(file: File){
        this.file = file
    }
}