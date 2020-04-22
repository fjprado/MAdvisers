import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OcorrenciaDetalhe } from '../ocorrencia-detalhe.model';
import { OcorrenciaService } from '../ocorrencia.service';
import { Observable, timer } from 'rxjs';
import { OcorrenciasComponent } from '../ocorrencias.component';

@Component({
  selector: 'madv-registro-ocorrencia',
  templateUrl: './registro-ocorrencia.component.html'
})
export class RegistroOcorrenciaComponent implements OnInit {
  @Input('registros-ocorrencias') registrosOcorrencias: OcorrenciaDetalhe[]

  constructor(private ocorrenciaService: OcorrenciaService, private ocorrenciaComponent: OcorrenciasComponent) { }

  ngOnInit() {
  }

  carregarDados(){
    this.ocorrenciaService.ocorrencias().subscribe(ocorrencias => this.registrosOcorrencias = ocorrencias)
  }

  editarRascunho(ocorrencia: any){
      this.ocorrenciaComponent.editarRascunho(ocorrencia)
  }

  removerRascunho(ocorrencia: any){
    this.ocorrenciaService.removerRascunho(ocorrencia)
                .subscribe((data)=>{
                  this.carregarDados()
                })
  }

}

