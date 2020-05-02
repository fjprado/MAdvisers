export class MarcacaoKm{
    constructor(public id: number, public dataInicio: Date, public kmInicio: number){}
    public dataFinal: Date
    public kmFinal: number

    public getValor(): number{
        return this.kmFinal !== undefined ? (this.kmFinal - this.kmInicio) : 0
    }

}