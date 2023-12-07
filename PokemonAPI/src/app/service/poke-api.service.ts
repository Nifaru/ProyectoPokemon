import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor(private httpC:HttpClient) { }

  public GetFirstGenerationPokemon():Observable<any>{
    return this.httpC.get(this.urlBase);
  }
  public getPokemonDetails(url: string): Observable<any> {
    return this.httpC.get(url);
  }
}
