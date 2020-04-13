import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AgendamentosService } from '../agendamentos/agendamentos.service'
import { Agendamento } from '../agendamentos/agendamento/agendamento.model'

@Component({
  selector: 'madv-agendamento-detalhe',
  templateUrl: './agendamento-detalhe.component.html'
})
export class AgendamentoDetalheComponent implements OnInit {

  agendamento: Agendamento

  constructor(private agendamentoService: AgendamentosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.agendamentoService.agendamentosPorId(this.route.snapshot.params['id'])
    //this.route.snapshot.params['id']) 
    //--> captura a imagem do item que foi selecionado e registra-o apenas pela sua chave Id
      .subscribe(agendamento => this.agendamento = agendamento)
    //realiza o subscribe do método, monitora as mudanças e captura o resultado e adiciona ao atributo do component
  }
}
