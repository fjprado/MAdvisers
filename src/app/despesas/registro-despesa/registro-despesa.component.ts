import { DespesasComponent } from './../despesas.component';
import { Despesa } from './../despesa.model';
import { reduce, map, tap } from 'rxjs/operators';
import { DespesaService } from './../despesa.service';
import { Component, OnInit, Input, Pipe } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'madv-registro-despesa',
  templateUrl: './registro-despesa.component.html'
})
export class RegistroDespesaComponent implements OnInit {

  @Input('registros-despesas') registrosDespesas: Despesa[]
  @Input('total-despesas') totalDespesas: number
  despesaEncontrada: Despesa

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.registrosDespesas = []
  }

  removerDespesa(despesaRemovida: any){
    this.despesaService.removerDespesa(despesaRemovida)
                .subscribe(despesa =>{
                  this.registrosDespesas.splice(this.registrosDespesas
                                                .indexOf(this.registrosDespesas
                                                          .find(item => despesaRemovida.id === item.id)),1)
                  this.totalDespesas = this.despesaService.total(this.registrosDespesas)
                })
  }
}
