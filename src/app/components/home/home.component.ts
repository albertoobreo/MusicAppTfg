import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  nuevosAlbumes: any[] = [];
  loading: boolean;

  constructor(private spotifyService: SpotifyService) {
    this.loading = true;
    this.spotifyService.getNewReleases().subscribe((albumHttpdata: any) => {
      this.nuevosAlbumes = albumHttpdata;
      this.loading = false;
    });
  }
}
