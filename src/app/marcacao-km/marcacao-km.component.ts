import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MarcacaoKm } from './marcacao-km.model';
import { MarcacaoKmService } from './marcacao-km.service';

@Component({
  selector: 'madv-marcacao-km',
  templateUrl: './marcacao-km.component.html',
  styleUrls: ['./marcacao-km.component.css']
})
export class MarcacaoKmComponent implements OnInit {

  constructor(private fb: FormBuilder, private kmService: MarcacaoKmService) { }

  numberPattern = `/^[0-9]*$/`

  registrosKm: MarcacaoKm[] = []
  totalKm: number
  kmForm: FormGroup

  ngOnInit() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl('', [Validators.required]),
      KmInicio: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      dataFinal: new FormControl(''),
      KmFinal: new FormControl('', [Validators.pattern(this.numberPattern)])
    })
  }

  limparKm() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl('', [Validators.required]),
      KmInicio: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      dataFinal: new FormControl(''),
      KmFinal: new FormControl('', [Validators.pattern(this.numberPattern)])
    })
  }

  salvarKm(marcacaoKm: MarcacaoKm){
    return this.kmService.salvarDespesa(marcacaoKm)
                              .subscribe((marcacaoKm: MarcacaoKm) => {
                                  this.registrosKm.push(marcacaoKm)
                                  this.totalKm = this.kmService.total(this.registrosKm)
                                  this.limparKm()
                              })
  }

}
