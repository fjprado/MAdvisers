import { ApontamentosService } from './../apontamentos.service';
import { Component, OnInit } from '@angular/core';
import { RegistroApontamento } from './registro-apontamento.model';

@Component({
  selector: 'madv-registro-apontamento',
  templateUrl: './registro-apontamento.component.html'
})
export class RegistroApontamentoComponent implements OnInit {

  constructor(private apontamentosService: ApontamentosService) { }
  
  ngOnInit() {
  }

  apontamentos(): any[] {
    return this.apontamentosService.apontamentos;
  }

  addItem(apontamento: any){
    this.apontamentosService.addApontamento(apontamento)
  }

  totalDeHoras(): string {
    return this.apontamentosService.totalDeHoras()
  }

}
