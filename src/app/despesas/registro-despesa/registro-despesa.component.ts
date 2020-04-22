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

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.totalDespesas = this.despesaService.total(this.registrosDespesas)
  }

  removerDespesa(despesa: any){
    console.log(despesa.id)
    this.despesaService.removerDespesa(despesa)
                .subscribe((despesa: Despesa)=>{
                  this.registrosDespesas.filter(despesa => 
                                                !this.registrosDespesas.find(item => despesa.id == item.id))
                  console.log(`${this.registrosDespesas} - registros - init registros` )
                  this.totalDespesas = this.despesaService.total(this.registrosDespesas)
                  console.log(`${this.totalDespesas} - valores - init registros` )
                })
  }
}
