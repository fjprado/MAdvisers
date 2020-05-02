import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MarcacaoKm } from './marcacao-km.model';
import { MarcacaoKmService } from './marcacao-km.service';

@Component({
  selector: 'madv-marcacao-km',
  templateUrl: './marcacao-km.component.html'
})
export class MarcacaoKmComponent implements OnInit {

  constructor(private fb: FormBuilder, private kmService: MarcacaoKmService) { }

  registrosKm: MarcacaoKm[] = []
  totalKm: number
  kmForm: FormGroup

  ngOnInit() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl('', [Validators.required]),
      kmInicio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      dataFinal: new FormControl(''),
      kmFinal: new FormControl('', [Validators.pattern("^[0-9]*$")])
    })
    this.kmService.marcacoesKm()
                                .subscribe((marcacoesKm: MarcacaoKm[]) => {
                                  this.registrosKm = marcacoesKm
                                  this.totalKm = this.kmService.total(marcacoesKm)})
  }

  limparKm() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl('', [Validators.required]),
      kmInicio: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      dataFinal: new FormControl(''),
      kmFinal: new FormControl('', [Validators.pattern("^[0-9]*$")])
    })
  }

  salvarKm(marcacaoKm: MarcacaoKm){
    return this.kmService.salvarKm(marcacaoKm)
                              .subscribe((marcacaoKm: MarcacaoKm) => {
                                  this.registrosKm.push(marcacaoKm)
                                  this.totalKm = this.kmService.total(this.registrosKm)
                                  this.limparKm()
                              })
  }

}
