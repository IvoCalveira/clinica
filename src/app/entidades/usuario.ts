export interface Usuario {
    id_usuario?: number;
    nombre:string;
    apellido:string;
    password:string;
    user:string;
    nacimiento:Date;
    tipo_usuario:number;
    mail:string;
    dias_habiles?:boolean[];
    especialidad?:string;
    horario_desde?:number;
    horario_hasta?:number;
    foto_perfil?:string | ArrayBuffer | null;
    foto_especialidad?:string | ArrayBuffer | null;
    autorizado:boolean;

}
