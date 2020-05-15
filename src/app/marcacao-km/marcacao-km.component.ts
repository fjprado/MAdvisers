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

  static edicao = false;
  static fechar = false;
  static validadorKm(group: AbstractControl): { [key: string]: boolean } {
    const dataInicio = group.get("dataInicio");
    const kmInicio = group.get("kmInicio");
    const dataFinal = group.get("dataFinal");
    const kmFinal = group.get("kmFinal");
    if (
      (!dataInicio || !kmInicio) &&
      (dataInicio.touched ||
        kmInicio.touched ||
        dataInicio.dirty ||
        kmInicio.dirty)
    ) {
      return { kmEdicao: false };
    }
    if (
      ((dataInicio.value !== null && kmInicio !== null) ||
        (dataFinal.value !== null && kmFinal !== null)) &&
      MarcacaoKmComponent.edicao
    ) {
      return { kmEdicao: true };
    }
    return undefined;
  }

  constructor(private fb: FormBuilder, private kmService: MarcacaoKmService) {}

  ngOnInit() {
    this.kmForm = new FormGroup(
      {
        dataInicio: new FormControl("", [Validators.required]),
        kmInicio: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
        ]),
        dataFinal: new FormControl(""),
        kmFinal: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      },
      { validators: MarcacaoKmComponent.validadorKm }
    );
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
    this.kmForm = new FormGroup(
      {
        dataInicio: new FormControl(dataInicio, [Validators.required]),
        kmInicio: new FormControl(kmInicio, [Validators.required]),
        dataFinal: new FormControl(dataFinal),
        kmFinal: new FormControl(kmFinal),
        distancia: new FormControl(distancia),
        situacao: new FormControl(situacao),
      },
      { validators: MarcacaoKmComponent.validadorKm }
    );
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
    MarcacaoKmComponent.edicao = true;
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
        console.log(`${this.registrosKm} - salvar km - registros`);
        this.totalKm = this.kmService.total(this.registrosKm);
        console.log(`${this.totalKm} - salvar km - total`);
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
      console.log(`${this.registrosKm} - salvar edicao - registros`);
      this.totalKm = this.kmService.total(this.registrosKm);
      console.log(`${this.totalKm} - salvar edicao - total`);
      this.carregarDados();
      this.limparKm();
    });
    MarcacaoKmComponent.edicao = false;
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
    MarcacaoKmComponent.fechar = true;
  }

  reabrirKm(marcacaoKm: MarcacaoKm) {
    // Irá limpar os dados preenchidos no fechamento e voltar para edição
    this.kmService
      .editarKm(marcacaoKm.id)
      .subscribe((marcacaoKm) => (marcacaoKm = marcacaoKm));
    marcacaoKm.dataFinal = null;
    marcacaoKm.kmFinal = 0;
    marcacaoKm.distancia = 0;
    marcacaoKm.situacao = "Aberto";
    this.setarKm(
      marcacaoKm.id,
      marcacaoKm.dataInicio,
      marcacaoKm.kmInicio,
      marcacaoKm.dataFinal,
      marcacaoKm.kmFinal,
      marcacaoKm.distancia,
      marcacaoKm.situacao
    );
    this.salvarEdicao(marcacaoKm);
  }
}
