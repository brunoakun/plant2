import { DatosService } from './datos.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {

  constructor(public srvDatos: DatosService) { }

  public textos = [
    {
      esp: {
        navidad: 'navidad',
        dudas: '¿dudas?',
        valida: 'valida',
        yUnJamon: 'Y UN JAMÓN'
      },
      cat: {
        navidad: 'nadal',
        dudas: 'dubtes?',
        valida: 'valida',
        yUnJamon: 'I UN PERNIL'
      }
    }
  ]

}
