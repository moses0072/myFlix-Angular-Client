import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  
})

/**
 * This component provides a modal for detailed movie information.
 *
 */
export class MovieDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imagePath: string;
      description: string;
      director: string;
      genre: string;
    }
  ) {}

  ngOnInit(): void {}
}
