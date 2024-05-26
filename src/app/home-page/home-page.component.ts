import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  //@ViewChild('videoPlayer') videoPlayer!: ElementRef;
  //quitarAudio() {
  //  this.videoPlayer.nativeElement.muted = true;
  //}
}
