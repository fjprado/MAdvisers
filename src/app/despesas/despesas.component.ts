import { RegistroDespesaComponent } from './registro-despesa/registro-despesa.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DespesaService } from './despesa.service';
import { Despesa } from './despesa.model';
import { Observable } from 'rxjs';
import { reduce, map } from 'rxjs/operators'

@Component({
  selector: 'madv-despesas',
  templateUrl: './despesas.component.html'
})
export class DespesasComponent implements OnInit {

  constructor(private despesaService: DespesaService, private formBuilder: FormBuilder) { }
  registrosDespesas: Despesa[]
  despesaForm: FormGroup
  totalDespesas: number

  ngOnInit() {
    this.despesaForm = new FormGroup({
      dataDespesa: new FormControl('', [Validators.required]),
      tipoDespesa: new FormControl('', [Validators.required]),
      valorDespesa: new FormControl('', [Validators.required])
    })
    this.despesaService.despesas()
                          .subscribe((despesas: Despesa[]) => {
                            this.registrosDespesas = despesas})
    this.totalDespesas = this.despesaService.total(this.registrosDespesas)
  }

  limparDespesa() {
    this.despesaForm = new FormGroup({
      dataDespesa: new FormControl('', [Validators.required]),
      tipoDespesa: new FormControl('', [Validators.required]),
      valorDespesa: new FormControl('', [Validators.required])
    })
  }

  salvarDespesa(despesa: Despesa){
    return this.despesaService.salvarDespesa(despesa)
                              .subscribe((despesa: Despesa) => {
                                  this.registrosDespesas.push(despesa)
                                  this.totalDespesas = this.despesaService.total(this.registrosDespesas)
                                  this.limparDespesa()
                              })
  }

  // total(){
  //   this.totalDespesas = this.registrosDespesas.map(despesas => this.totalDespesas = despesas.valorDespesa)
  //                                              .reduce((prev, value) => prev + value, 0)
  //   console.log(`${this.totalDespesas} - metodo total` )
  // }

}
