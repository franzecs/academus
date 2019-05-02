import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'upperCasePipe'})
export class MyPipe implements PipeTransform {
    transform(value: number, exponent: string): number {
        
        return value;
    }
}