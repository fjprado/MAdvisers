export class MarcacaoKm{
    constructor(public id: number, public dataInicio: Date, public kmInicio: number, public distancia: number = 0){}
    public dataFinal: Date
    public kmFinal: number
    public situacao: string

    public getValor(): number{
        // return this.kmFinal !== undefined ? (this.kmFinal - this.kmInicio) : 0
        return this.kmInicio
    }

}