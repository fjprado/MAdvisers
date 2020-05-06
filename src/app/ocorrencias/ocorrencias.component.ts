import { Component, OnInit } from '@angular/core';
import { OcorrenciaService } from './ocorrencia.service';
import { OcorrenciaDetalhe } from './ocorrencia-detalhe.model';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'madv-ocorrencias',
  templateUrl: './ocorrencias.component.html'
})
export class OcorrenciasComponent implements OnInit {

  static edicao = false
  static OcorrenciaEditada(group: AbstractControl): {[key: string]: boolean} {
    const dataOcorrencia = group.get('dataOcorrencia')
    const textoOcorrencia = group.get('textoOcorrencia')
    if ((!dataOcorrencia || !textoOcorrencia) && 
        (dataOcorrencia.touched || textoOcorrencia.touched || dataOcorrencia.dirty || textoOcorrencia.dirty)) {
      return {ocorrenciaEdicao: false}
    }
    if ((dataOcorrencia.value !== null && textoOcorrencia !== null) && OcorrenciasComponent.edicao) {
      return {ocorrenciaEdicao: true}
    }
    return undefined
  }
  
  ocorrenciaForm: FormGroup
  registrosOcorrencias: OcorrenciaDetalhe[]
  idOcorrenciaRascunho: number

  constructor(private ocorrenciaService: OcorrenciaService, private router: Router, 
              private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ocorrenciaForm = new FormGroup({
      dataOcorrencia: new FormControl('', [Validators.required]),
      textoOcorrencia: new FormControl('', {validators: [Validators.required, Validators.minLength(5)]}),
      responsavel: new FormControl('')
    }, {validators: OcorrenciasComponent.OcorrenciaEditada})
    this.carregarDados()
    this.limparOcorrencia()
  }

  carregarDados() {
    this.ocorrenciaService.ocorrencias().subscribe(ocorrencias => this.registrosOcorrencias = ocorrencias)
  }

  limparOcorrencia() {
    this.ocorrenciaForm = this.formBuilder.group({
      dataOcorrencia: this.formBuilder.control('', [Validators.required]),
      textoOcorrencia: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      responsavel: this.formBuilder.control('')
    })
  }

  setarOcorrencia(id: number, dataOcorrencia: Date, textoOcorrencia: string, responsavel: string) {
    this.ocorrenciaForm = new FormGroup({
      dataOcorrencia: new FormControl(dataOcorrencia, [Validators.required]),
      textoOcorrencia: new FormControl(textoOcorrencia, {validators: [Validators.required, Validators.minLength(5)]}),
      responsavel: new FormControl(responsavel)
    }, {validators: OcorrenciasComponent.OcorrenciaEditada})
    this.idOcorrenciaRascunho = id;
  }

  editarRascunho(ocorrencia: any) {
    this.ocorrenciaService.editarRascunho(ocorrencia.id)
                          .subscribe(ocorrencia => ocorrencia = ocorrencia)
    this.setarOcorrencia(ocorrencia.id, ocorrencia.dataOcorrencia, ocorrencia.textoOcorrencia, ocorrencia.responsavel)
    OcorrenciasComponent.edicao = true
  }


  salvarRascunho(ocorrencia: OcorrenciaDetalhe) {
    ocorrencia.tipo = 'rascunho'
    this.ocorrenciaService.salvarRascunho(ocorrencia)
              .subscribe((ocorrenciaId: number) => {
                this.carregarDados()
                this.limparOcorrencia()
              })
  }

  salvarEdicao(ocorrencia: OcorrenciaDetalhe) {
    ocorrencia.tipo = 'rascunho'
    ocorrencia.id = this.idOcorrenciaRascunho
    this.ocorrenciaService.salvarEdicao(ocorrencia)
              .subscribe(sucess => {
                this.carregarDados()
                this.limparOcorrencia()
              })
    OcorrenciasComponent.edicao = false
  }

  fecharOcorrencia(ocorrencia: OcorrenciaDetalhe) {
    ocorrencia.tipo = 'ocorrencia'
    ocorrencia.id = this.idOcorrenciaRascunho
    this.ocorrenciaService.salvarEdicao(ocorrencia)
              .subscribe(sucess => {
                this.carregarDados()
                this.limparOcorrencia()
              })

  }
}
