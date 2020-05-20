import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MarcacaoKm } from "./marcacao-km.model";
import { MarcacaoKmService } from "./marcacao-km.service";

@Component({
  selector: "madv-marcacao-km",
  templateUrl: "./marcacao-km.component.html",
})
export class MarcacaoKmComponent implements OnInit {
  idMarcacaoKm: number;
  registrosKm: MarcacaoKm[] = [];
  totalKm: number;
  kmForm: FormGroup;
  situacao: string = "Novo";

  // static validarDatas(group: AbstractControl): { [key: string]: boolean } {
  //   const dataInicio = group.get("dataInicio");
  //   const dataFinal = group.get("dataFinal");
  //   if (dataInicio <= dataFinal) {
  //     return { data: true };
  //   } else {
  //     return { data: false };
  //   }
  // }

  constructor(private fb: FormBuilder, private kmService: MarcacaoKmService) {}

  ngOnInit() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl("", [Validators.required]),
      kmInicio: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
      ]),
      dataFinal: new FormControl(""),
      kmFinal: new FormControl("", [Validators.pattern("^[0-9]*$")]),
    });
    this.kmService.marcacoesKm().subscribe((marcacoesKm: MarcacaoKm[]) => {
      this.registrosKm = marcacoesKm;
      this.totalKm = this.kmService.total(marcacoesKm);
    });
  }

  carregarDados() {
    this.kmService
      .marcacoesKm()
      .subscribe((marcacoesKm) => (this.registrosKm = marcacoesKm));
  }

  limparKm() {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl("", [Validators.required]),
      kmInicio: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.min(1),
      ]),
      dataFinal: new FormControl(""),
      kmFinal: new FormControl("", [Validators.pattern("^[0-9]*$")]),
    });
  }

  setarKm(
    id: number,
    dataInicio: Date,
    kmInicio: number,
    dataFinal: Date,
    kmFinal: number,
    distancia: number,
    situacao: string
  ) {
    this.kmForm = new FormGroup({
      dataInicio: new FormControl(dataInicio),
      kmInicio: new FormControl(kmInicio, [
        Validators.required,
        Validators.min(1),
        Validators.pattern("^[0-9]*$"),
      ]),
      dataFinal: new FormControl(dataFinal), // validar dias
      kmFinal: new FormControl(kmFinal, [
        Validators.min(kmInicio + 1),
        Validators.pattern("^[0-9]*$"),
      ]),
      distancia: new FormControl(distancia),
      situacao: new FormControl(situacao),
    });
    this.idMarcacaoKm = id;
  }

  editarKm(marcacaoKm: MarcacaoKm) {
    //Irá liberar apenas o ultimo movimento da MarcaçãoKm para edição
    this.kmService
      .editarKm(marcacaoKm.id)
      .subscribe((marcacaoKm) => (marcacaoKm = marcacaoKm));
    this.setarKm(
      marcacaoKm.id,
      marcacaoKm.dataInicio,
      marcacaoKm.kmInicio,
      marcacaoKm.dataFinal,
      marcacaoKm.kmFinal,
      marcacaoKm.distancia,
      marcacaoKm.situacao
    );
    this.situacao = marcacaoKm.situacao;
  }

  salvarKm(marcacaoKm: MarcacaoKm) {
    marcacaoKm.distancia =
      marcacaoKm.kmFinal > 0 ? marcacaoKm.kmFinal - marcacaoKm.kmInicio : 0;
    marcacaoKm.situacao = marcacaoKm.kmFinal > 0 ? "Fechado" : "Aberto";
    return this.kmService
      .salvarKm(marcacaoKm)
      .subscribe((marcacaoKm: MarcacaoKm) => {
        this.registrosKm.push(marcacaoKm);
        console.log(this.registrosKm);
        this.totalKm = this.kmService.total(this.registrosKm);
        this.limparKm();
      });
  }

  salvarEdicao(marcacaoKm: MarcacaoKm) {
    marcacaoKm.distancia =
      marcacaoKm.kmFinal > 0 ? marcacaoKm.kmFinal - marcacaoKm.kmInicio : 0;
    marcacaoKm.situacao = marcacaoKm.kmFinal > 0 ? "Fechado" : "Aberto";
    marcacaoKm.id = this.idMarcacaoKm;
    this.kmService.salvarEdicaoKm(marcacaoKm).subscribe((sucess) => {
      this.registrosKm = this.registrosKm.filter(
        (registrosKm) => registrosKm.id !== this.idMarcacaoKm
      );
      this.registrosKm.push(marcacaoKm);
      this.totalKm = this.kmService.total(this.registrosKm);
      this.carregarDados();
      this.limparKm();
    });
    this.situacao = "Novo";
  }

  fecharKm(marcacaoKm: MarcacaoKm) {
    // Irá liberar apenas os campos dataFinal e kmFinal para edição
    this.kmService
      .editarKm(marcacaoKm.id)
      .subscribe((marcacaoKm) => (marcacaoKm = marcacaoKm));
    this.setarKm(
      marcacaoKm.id,
      marcacaoKm.dataInicio,
      marcacaoKm.kmInicio,
      marcacaoKm.dataFinal,
      marcacaoKm.kmFinal,
      marcacaoKm.distancia,
      marcacaoKm.situacao
    );
    this.situacao = "Fechado";
  }

  reabrirKm(marcacaoKm: MarcacaoKm) {
    // Irá limpar os dados preenchidos no fechamento e voltar para edição
    this.kmService
      .editarKm(marcacaoKm.id)
      .subscribe((marcacaoKm) => (marcacaoKm = marcacaoKm));
    marcacaoKm.dataFinal = undefined;
    marcacaoKm.kmFinal = undefined;
    marcacaoKm.distancia = 0;
    marcacaoKm.situacao = "Aberto";
    this.salvarEdicao(marcacaoKm);
  }
}
