import { Component, OnInit } from '@angular/core';
import { IMovies } from '../../models/movie';
import { MovieService } from '../../services/movie.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.scss']
})
export class MovieDashboardComponent implements OnInit {
movieArr: IMovies[]=[]
  constructor(private _movieServ: MovieService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.getMovie();
    this.createMovie();
    this.updatedMOvie();
    this.removeMovie();
  }


      getMovie(){
      this._movieServ.fetchAllMovie().subscribe({
        next: res=>{
          this.movieArr =res
        },
        error: err=>{
          console.log(err);
          
        }
      })
      }

      createMovie(){
        this._movieServ.newMovieObs$.subscribe(res=>{
          this.movieArr.unshift(res)
          this._snackbar.opensnackbar(`The movie with id ${res.id} created successfully!!`)
        })
      }

       updatedMOvie(){
        this._movieServ.updateMovieObs$.subscribe(updatedObj=>{
          let getIndex = this.movieArr.findIndex(m=>m.id === updatedObj.id)
          this.movieArr[getIndex]=updatedObj
          this._snackbar.opensnackbar(`The movie with id ${updatedObj.id} Updated successfully!!`)

        })
       }

       removeMovie(){
        this._movieServ.removeMovieObs$.subscribe(removedId=>{
          let getIndex= this.movieArr.findIndex(movie=> movie.id = removedId)
          this.movieArr.splice(getIndex,1);
        this._snackbar.opensnackbar(`The movie with id ${removedId} r3emove successfully!!`)


        })
       }

trackById(index:number, movie: IMovies){
   return movie.id
}
}
