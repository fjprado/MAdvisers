export class OcorrenciaDetalhe{
    constructor(
        public id: number,
        public dataOcorrencia: Date,
        public textoOcorrencia: string,
        public responsavel: string,
        public tipo: string
    ){}
}