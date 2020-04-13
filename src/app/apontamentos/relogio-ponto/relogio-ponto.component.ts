import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Apontamento } from './apontamento.model';

@Component({
  selector: 'madv-relogio-ponto',
  templateUrl: './relogio-ponto.component.html'
})
export class RelogioPontoComponent implements OnInit {

  registroId: number = 1
  horaAtual: Date
  horaDoPonto: Date
  @Output() add = new EventEmitter()

  constructor() { 
    this.horaDoPonto = new Date
  }

  horaPonto(): Date{
    return this.horaDoPonto
  }

  ngOnInit() {
  }

  emitAddEvent(){
    this.horaAtual = new Date
    this.horaDoPonto = this.horaAtual
    let apontamento: Apontamento = new Apontamento(this.registroId,this.horaAtual)
    this.registroId++
    this.add.emit(apontamento)
  }

}
