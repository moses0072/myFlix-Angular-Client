import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user=res;
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }

  removeFavorites(id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {

      this.snackBar.open(`${title} has been Removed from favorites!`, 'OK', {
        duration: 2000,
      });

    setTimeout(function () {
      window.location.reload();
    }, 1000);
  });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  deleteUser(): void {
    let check = confirm(
      'This will delete your profile! Are you sure you want to continue?'
    );
    if (check) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }
  profileUpdate(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      panelClass: 'update-dialog',
    });
  }
}
