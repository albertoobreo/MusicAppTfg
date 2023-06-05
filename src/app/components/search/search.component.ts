import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  artistas : any[] = [];
  loading : boolean | undefined;
  constructor(private spotifySearchService: SpotifyService) {}

  buscar(termino: string) {
    this.loading= true;
    this.spotifySearchService.getArtistas(termino).subscribe((data:any) => {
      
      this.artistas=data;

      this.loading= false;

    });
  }
}
