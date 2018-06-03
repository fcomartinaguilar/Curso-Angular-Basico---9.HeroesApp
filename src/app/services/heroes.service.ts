import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interface/heroe.interface';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL:string = "https://heroesapp-8240a.firebaseio.com/heroes.json";
  heroeURL:string = "https://heroesapp-8240a.firebaseio.com/heroes/";

  constructor(private http:Http) { }

  nuevoHeroe (heroe:Heroe) {
    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post( this.heroesURL, body, { headers:headers } )
            .pipe(map( resp => {
              return resp.json();
            }));
  }

  actualizarHeroe ( heroe:Heroe, key$:string ) {
    let body = JSON.stringify( heroe );
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    let url = `${ this.heroeURL }/${ key$ }.json `;

    return this.http.put( url, body, { headers:headers } )
            .pipe(map( resp => {
              return resp.json();
            }));
  }

  getHeroe ( key$:String ) {
    let url = `${ this.heroeURL }/${ key$ }.json`;

    return this.http.get( url )
      .pipe(map( resp => resp.json ));
  }

  getHeroes (  ) {

    return this.http.get( this.heroesURL )
      .pipe(map( resp => {
        return resp.json();
      }));
  }

  borrarHeroe( key$:string) {
    let url = `${ this.heroeURL }/${ key$ }.json`;
    return this.http.delete ( url )
          .pipe(map( resp => {
            return resp.json();
          }))
  }

}
