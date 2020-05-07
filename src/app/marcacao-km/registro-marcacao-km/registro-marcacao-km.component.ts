import { MarcacaoKmComponent } from './../marcacao-km.component';
import { MarcacaoKmService } from './../marcacao-km.service';
import { MarcacaoKm } from './../marcacao-km.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'madv-registro-marcacao-km',
  templateUrl: './registro-marcacao-km.component.html'
})
export class RegistroMarcacaoKmComponent implements OnInit {

  @Input('registros-km')registrosKm: MarcacaoKm[]
  @Input('total-km')totalKm: number

  constructor(private kmService: MarcacaoKmService, private kmComponent: MarcacaoKmComponent) { }

  ngOnInit() {
    console.log(this.registrosKm)
  }

  removerKm(kmRemovido: any){
    this.kmService.removerKm(kmRemovido)
                .subscribe(despesa =>{
                  this.registrosKm.splice(this.registrosKm
                                                .indexOf(this.registrosKm
                                                          .find(item => kmRemovido.id === item.id)),1)
                  this.totalKm = this.kmService.total(this.registrosKm)
                })
  }

  editarKm(kmSelecionado: any){
    this.kmComponent.editarKm(kmSelecionado)
  }

  fecharKm(kmSelecionado: any){
    this.kmComponent.fecharKm(kmSelecionado)
  }

  reabrirKm(kmSelecionado: any){
    this.kmComponent.reabrirKm(kmSelecionado)
  }

}
