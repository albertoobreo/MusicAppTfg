import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  //con esta funcion creamos una peticion unica con entradas tipo query

  getQuery(entradaQuery: string) {
    const url = `https://api.spotify.com/v1/${entradaQuery}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCxRYSej3b4ucngQoHpZ4C2z0bEG3xRdJZBJkaEeG-DdtdQvYt_njpk2YtQlGl8kUM8iKxiC7FiqdJawPZvHM4sS9Rf7mFI3rGn5QB4Zg_2xucI4ws',
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases').pipe(
      map((data: any) => data['albums'].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data: any) => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe(
    //map((data: any) => data['artists'].items)
    //);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?market=es`).pipe(
      map((data: any) => data['tracks'])
    );
  }
}
