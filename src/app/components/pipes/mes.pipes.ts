import { PipeTransform, Pipe} from '@angular/core'

@Pipe({
    name: 'mes'
})
export class Mes implements PipeTransform{
    transform(mes: number ): string{
        if(mes === 1){
            return "Janeiro"
        }
        if(mes === 2){
            return "Fevereiro"
        }
        if(mes === 3){
            return "Março"
        }
        if(mes === 4){
            return "Abril"
        }
        if(mes === 5){
            return "Maio"
        }
        if(mes === 6){
            return "Junho"
        }
        if(mes === 7){
            return "Julho"
        }
        if(mes === 8){
            return "Agosto"
        }
        if(mes === 9){
            return "Setembro"
        }
        if(mes === 10){
            return "Outubro"
        }
        if(mes === 11){
            return "Novembro"
        }
        if(mes === 12){
            return "Dezembro"
        }
    }
}