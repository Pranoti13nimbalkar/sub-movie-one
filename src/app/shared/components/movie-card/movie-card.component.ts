import { Component, Input, OnInit } from '@angular/core';
import { IMovies } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
@Input()movieObj!: IMovies
  constructor(private _movieServ: MovieService,
    private _dailog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEdit(){
    this._movieServ.setEditSub(this.movieObj)
  }

  onRemove(){
    let matconfig = new MatDialogConfig();
    matconfig.data = `Are you sure, you want to remove with Id ${this.movieObj.id}`,
    matconfig.width= '400px',
    matconfig.disableClose= true
    this._dailog.open(GetconfirmComponent,matconfig).afterClosed().pipe(
      filter(res => res===true),
      switchMap(()=>{
        return this._movieServ.removeMovie(this.movieObj.id)
      })
    ).subscribe({
      next: res=>{
        this._movieServ.setRemoveSub(this.movieObj.id)
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }
}
