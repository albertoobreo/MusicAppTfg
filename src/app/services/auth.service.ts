import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlGeneral = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apyKey = 'AIzaSyAzsM0AG3KoldJQ925TOc_61U2Fkodo9Ko';
  userToken!: string | null;

  //Url para crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Url para loging de usuarios
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private httpServicioLog: HttpClient) {
    this.leerToken();
  }

  logOut() {
    localStorage.removeItem('token')
  }

  logIn(usuarioLogin: UsuarioModel) {
    const authDataLogin = {
      email: usuarioLogin.email,
      password: usuarioLogin.password,
      returnSecureToken: true,
    };

    return this.httpServicioLog.post(
      `${this.urlGeneral}signInWithPassword?key=${this.apyKey}`,
      authDataLogin
    ).pipe(
      map( respuesta => {
        //this.guardarToken(respuesta['idToken']);
        return respuesta;
      })
     
    );
  }

  //Registro del usuario a la base de datos de firebase
  registerNewUser(usuarioRegister: UsuarioModel) {
    const authData = {
      email: usuarioRegister.email,
      password: usuarioRegister.password,
      returnSecureToken: true,
    };
    return this.httpServicioLog.post(
      `${this.urlGeneral}signUp?key=${this.apyKey}`,
      authData
    ).pipe(
      map( respuesta => {
        //this.guardarToken(respuesta['idToken']);
        return respuesta;
      })
     
    );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoyFecha = new Date();
    hoyFecha.setSeconds(3600);

    localStorage.setItem('expiracion',hoyFecha.getTime().toString())
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(){
    //if(this.userToken?.length < 2){
     // return false;
   //}
    const expira = Number(localStorage.getItem('expiracion'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate>new Date()) {
      return true;
      
    }else{
      return false;
    }
  }
}
