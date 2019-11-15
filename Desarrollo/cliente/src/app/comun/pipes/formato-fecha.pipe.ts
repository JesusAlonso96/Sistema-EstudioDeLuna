import { Pipe, PipeTransform } from '@angular/core';
import * as momento from 'moment';

@Pipe({
    name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform{

    transform(valor: string): string{
        return momento(valor).format('Y/MM/DD');
    }
}