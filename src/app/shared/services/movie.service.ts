import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovies, IMoviesRes } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
 BASE_URL: string= environment.BASE_URL;
 MOVIE_IRL:string=`${this.BASE_URL}/movie-one.json`
  constructor(private _http: HttpClient) { }
 private newMoviesub$ : Subject<IMovies> =new Subject<IMovies>();
 private editMoviesub$ : Subject<IMovies> =new Subject<IMovies>();
 private updateMoviesub$ : Subject<IMovies> =new Subject<IMovies>();
 private removeMoviesub$ : Subject<string> =new Subject<string>();
 newMovieObs$ : Observable<IMovies> = this.newMoviesub$.asObservable();
 editMovieObs$ : Observable<IMovies> = this.editMoviesub$.asObservable();
 updateMovieObs$ : Observable<IMovies> = this.updateMoviesub$.asObservable();
 removeMovieObs$ : Observable<string> = this.removeMoviesub$.asObservable();


 setNewMovie(movie: IMovies){
  this.newMoviesub$.next(movie)
 }

 setEditSub(movie:IMovies){
  this.editMoviesub$.next(movie)
 }

 setUpdate(movies:IMovies){
  this.updateMoviesub$.next(movies)
 }

 setRemoveSub(id:string){
  this.removeMoviesub$.next(id)
 }

  fetchAllMovie():Observable<IMovies[]>{
    return this._http.get<any>(this.MOVIE_IRL).pipe(
      map(movie=>{
       let movieArr : IMovies[]=[]
       for (const key in movie) {
          movieArr.unshift({...movie[key], id:key})
       } 
         return movieArr
      })
    )
  }

  createMovie(movie:IMovies):Observable<IMoviesRes>{
   return  this._http.post<any>(`${this.MOVIE_IRL}`,movie)
  }

  updatedMovie(updatedObj:IMovies):Observable<IMovies>{
    return this._http.patch<IMovies>(`${this.BASE_URL}/movie-one/${updatedObj.id}.json`,updatedObj)
  }

   removeMovie(removeId: string):Observable<any>{
    return this._http.delete<string>(`${this.BASE_URL}/movie-one/${removeId}.json`)
   }
}
