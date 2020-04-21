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

  dadosRegistros: RegistroDespesaComponent
  registrosDespesas: Observable<Despesa[]>
  despesaForm: FormGroup

  ngOnInit() {
    this.despesaForm = new FormGroup({
      dataDespesa: new FormControl('', [Validators.required]),
      tipoDespesa: new FormControl('', [Validators.required]),
      valorDespesa: new FormControl('', [Validators.required])
    })
    this.carregarDados()
  }

  carregarDados() {
    this.registrosDespesas = this.despesaService.despesas()
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
                              .subscribe((despesaId: number) => {
                                  this.carregarDados()
                                  this.limparDespesa()
                                  this.dadosRegistros.total()
                              })
  }

}
