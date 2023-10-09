import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
})
export class CuttextPipe implements PipeTransform {

  transform(text:string): unknown {
    return text.split(" ",3).join(" ");
  }

}
