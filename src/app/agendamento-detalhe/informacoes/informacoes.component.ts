import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { AgendamentosService } from 'app/agendamentos/agendamentos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'madv-informacoes',
  templateUrl: './informacoes.component.html'
})
export class InformacoesComponent implements OnInit {
  
  informacoes: Observable<any>
  constructor(private agendamentoService: AgendamentosService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.informacoes = this.agendamentoService.informacoesDaImplantacao(this.route.parent.snapshot.params['id'])
  }

}
