import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css'],
})

//con activatedRouter no ayude a buscar una ruta activa
export class ArtistaComponent {
  artista: any = {};
  topTracksArray: any[] = [];
  banderaLoading: boolean | undefined;
  constructor(
    private routerArtista: ActivatedRoute,
    private artistaService: SpotifyService
  ) {
    this.banderaLoading = true;
    this.routerArtista.params.subscribe((params) => {
      this.getArtista(params['id']);
      this.getTopTrucks(params['id']);
    });
  }

  // esta funcion recibe el valor del servicio que le manda la peticion a la api
  getArtista(id: string) {
    this.banderaLoading = true;
    this.artistaService.getArtista(id).subscribe((artistaRetorno) => {
      console.log(artistaRetorno);
      this.artista = artistaRetorno;
      this.banderaLoading = false;
    });
  }

  getTopTrucks(id: string) {
    this.artistaService.getTopTracks(id).subscribe((topTruckRetorno) => {
      this.topTracksArray = topTruckRetorno;
    });
  }
}
