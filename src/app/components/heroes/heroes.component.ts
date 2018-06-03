import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interface/heroe.interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes:any = [];
  loading:boolean = true;

  constructor(private _heroesService:HeroesService) {
    
    
    this._heroesService.getHeroes()
      .subscribe( (heroes:any) => {
         

         /* lo comento para forzar a ver el mensaje de loading */
         
         /* this.heroes = heroes;
         this.loading = false; */

         setTimeout( ()=> {
           this.loading = false;
           this.heroes = heroes;
           
          },3000 );
      });
  }

  borrarHeroe(key$:string) {
    this._heroesService.borrarHeroe(key$)
        .subscribe( resp => {
          if ( resp ) {
            console.error( resp );
          }
          else {
            //todo bien
            delete this.heroes[key$];
          }
        })
  }

  ngOnInit() {
  }

}
