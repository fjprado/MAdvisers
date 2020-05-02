import { MarcacaoKm } from './../marcacao-km.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'madv-registro-marcacao-km',
  templateUrl: './registro-marcacao-km.component.html'
})
export class RegistroMarcacaoKmComponent implements OnInit {

  @Input('registros-km')registrosKm: MarcacaoKm[]
  @Input('total-km')totalKm: number

  constructor() { }

  ngOnInit() {
    console.log(this.registrosKm)
  }

}
