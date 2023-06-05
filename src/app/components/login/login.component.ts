import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private loginService: AuthService,private miRouter:Router) {}

  ngOnInit(): void {}

  login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }
    //alerta de login
    Swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      title: 'Espere por favor...',
    });
    Swal.showLoading();

    this.loginService.logIn(this.usuario).subscribe(
      (respuesta) => {
        console.log(respuesta);
        Swal.close();
        this.miRouter.navigateByUrl('/home')
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    );
  }
}
