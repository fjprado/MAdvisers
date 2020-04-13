import {Apontamento} from '../relogio-ponto/apontamento.model'

export class RegistroApontamento {
  constructor(public apontamento: Apontamento){}

  getData(): string{
    return `${this.apontamento.dataHora.getDate()}/${this.apontamento.dataHora.getUTCMonth()+1}/${this.apontamento.dataHora.getFullYear()}`
  }

  getHora(): string{
    return `${this.apontamento.dataHora.getHours()}:${this.apontamento.dataHora.getMinutes()}`
  }

  getHoraTime(): number{
    return Math.trunc(this.apontamento.dataHora.getTime()/60000)
  }
}
