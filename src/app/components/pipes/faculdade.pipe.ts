import { Faculdade } from 'src/app/shared';
import { FaculdadeService } from './../../services/faculdade.service';
import { PipeTransform, Pipe} from '@angular/core';
import { take } from 'rxjs/operators';

@Pipe({
    name: 'faculdade'
})
export class FaculdadeSigla implements PipeTransform {

    private faculdade;

    constructor(private faculdadeService: FaculdadeService) {}

    transform(key: string ): string {

      this.faculdadeService.getObject(key).valueChanges().pipe(take(1))
        .subscribe((faculdade) => {
        this.faculdade = faculdade;
      });
      return this.faculdade.sigla;
    }
}
