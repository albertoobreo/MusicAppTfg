import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {

  usuario!: UsuarioModel;

  constructor(private servicioRegister: AuthService, private miRouter:Router) {}

  ngOnInit() {
    this.usuario =  new UsuarioModel()
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //alerta del registro

    Swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      title: 'Espere por favor...',
    });
    Swal.showLoading();

    this.servicioRegister.registerNewUser(this.usuario).subscribe(
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
