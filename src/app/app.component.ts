import { Component, inject, OnInit } from '@angular/core';
import { InterceptorService } from './shared/services/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sub-movie-one';
  isLodder : boolean=false;

  private _authServ= inject(InterceptorService)
ngOnInit(): void {
  this._authServ.authSubObs$.subscribe(status=>{
    this.isLodder = status
  })
}
  
}
