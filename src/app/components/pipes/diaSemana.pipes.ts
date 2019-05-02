import { PipeTransform, Pipe} from '@angular/core';

@Pipe({
    name: 'diaSemana'
})
export class DiaSemana implements PipeTransform{
    transform(texto: string ): string {
        if (texto === 'SEGUNDA') {
            return 'Segunda-feira';
        }
        if (texto === 'TERCA') {
            return 'Terça-feira';
        }
        if (texto === 'QUARTA') {
            return 'Quarta-feira';
        }
        if (texto === 'QUINTA') {
            return 'Quinta-feira';
        }
        if (texto === 'SEXTA') {
            return 'Sexta-feira';
        }
        if (texto === 'SABADO') {
            return 'Sábado';
        }
        return texto;
    }
}
