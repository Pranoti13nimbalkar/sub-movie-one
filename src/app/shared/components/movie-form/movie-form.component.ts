import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {
movieForm!:FormGroup
isinEditMode:boolean=false
editId!:string;
  constructor(private _movieServ:MovieService,
    private _snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.patchData()
  }

  createForm(){
    this.movieForm= new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
    })
  }

patchData(){
  this._movieServ.editMovieObs$.subscribe(res=>{
    this.isinEditMode = true;
    this.movieForm.patchValue(res)
    this.editId = res.id;
  this._snackbar.opensnackbar(`The movie with id ${this.editId} Patch successfully!!`)


  })
}

onUpdate(){
  if(this.movieForm.valid){
    let updated_obj= ({...this.movieForm.value, id: this.editId})
    this._movieServ.updatedMovie(updated_obj).subscribe(res=>{
      this._movieServ.setUpdate(updated_obj)
      this.isinEditMode = false;
      this.movieForm.reset()
    }
  )
  }
}









  onAddMovie(){
    if(this.movieForm.valid){
      let movieObj = this.movieForm.value;
      this._movieServ.createMovie(movieObj).subscribe({
        next: res=>{
          this._movieServ.setNewMovie({...movieObj, id:res.name})
          
        },error: err=>{
          console.log(err);
          
        }
      })

    }
  }
}
