import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      return this.movies;
    });
  }

  getDetails(
    title: string,
    imagePath: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { title, imagePath, description, director, genre },
      panelClass: 'details-dialog',  
    });  
  }

  getDirector(
    name: string,
    bio: string,
    birth: string,
    death: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      }
    });
  }

  getGenre(
    name: string,
    description: string
  ): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      }
    });
  }
  addFavorite(id: string, title: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }
}