export interface Tarea{
    id?: number,
    descripcion: string,
    dificultad: string,
    horas_estimadas: number,
    horas_actuales: number,
    porcentaje: number,
    completo: number,
    id_usuario: number
}