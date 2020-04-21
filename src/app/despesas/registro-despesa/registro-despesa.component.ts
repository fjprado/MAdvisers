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

  @Input('registros-despesas') registrosDespesas: Observable<any>
  totalDespesas: number
  valores: number[]
  despesas: Despesa[] = []

  constructor(private despesaService: DespesaService) { }

  ngOnInit() {
    this.registrosDespesas = this.despesaService.despesas()
    this.total()
  }

  carregarDados(){
    this.registrosDespesas = this.despesaService.despesas()
    this.total()
  }

  removerDespesa(despesa: any){
    this.despesaService.removerDespesa(despesa)
                .subscribe((data)=>{
                  this.carregarDados()
                })
  }

  todasDespesas(): Despesa[]{
    this.registrosDespesas.subscribe(despesas => this.despesas = despesas)
    console.log(this.despesas)
    return this.despesas
  }

  total(){
    this.valores = this.todasDespesas().map(despesas => this.totalDespesas = despesas.valorDespesa)
    this.totalDespesas = this.valores.reduce((prev, value) => prev + value, 0)
  }


}
