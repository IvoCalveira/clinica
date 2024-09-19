export class Disponibilidad {
    public id_medico?:number=0;
    public id_usuario?:number=0;
    public nombre:string='';
    public apellido:string='';
    public especialidad?:string='';
    public fecha: Date | string = new Date(); // Puede ser Date o string
    public hora:number=0;
    public aceptado?: string;
    public diagnostico?: string;
    public val_pac?: number;
    public val_med?: number;
}
