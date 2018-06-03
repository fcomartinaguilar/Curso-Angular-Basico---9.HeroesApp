import { NgForm } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interface/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:"Marvel",

  }

  nuevo:boolean = false;
  id:string;

  guardar() {

    if (this.id == "nuevo") {
      //insertando
      this._heroeService.nuevoHeroe( this.heroe )
        .subscribe( data=> {
          this.router.navigate(['/heroe', data.name])
        }, error => console.error(error));
    }
    else {
      //actualizando
      this._heroeService.actualizarHeroe( this.heroe, this.id )
        .subscribe( data=> {
          
        }, error => console.error(error));
    }


    
  }

  constructor(private _heroeService:HeroesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { 



      this.activatedRoute.params
          .subscribe( parametros => {
            this.id = parametros['id'];

            if ( this.id !== "nuevo" ) {
              this._heroeService.getHeroe( this.id )
                .subscribe( (heroe:any) => {
                  this.heroe = heroe
                });
            }
      })
  }

  agregarNuevo ( forma:NgForm ) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa:"Marvel"
    });
  }

  ngOnInit() {
  }

}
