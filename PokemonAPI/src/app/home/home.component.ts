import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { PokeApiService } from "../service/poke-api.service"
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  name: string = "";
  showImage: boolean = false;
  data: any = {}
  pokemonList: any = [];
  typeColor:any = { //Escoger color segun el genero
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  
  constructor(private apiService: ApiService, private pokeApiService: PokeApiService){
    this.myForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllFirstGenPokemon();
  }

  onSubmit(){
      const formValue = this.myForm.value;
      this.name= formValue.name;
      this.consultPokemon(this.name);
      this.myForm.reset();
  }

  consultPokemon(pokemon:string){ //Consuta
    this.apiService.getData(pokemon).subscribe({
        next: this.handleSuccessMethod.bind(this),
        error:this.handleErrorMethod.bind(this),
    })
  }

  getAllFirstGenPokemon(): void { // Obtener todo en la primera generacion en un array
    this.pokeApiService.GetFirstGenerationPokemon().subscribe((result: any) => {
      const pokemonArray = result.results;

      // Iterar sobre cada Pokémon para obtener detalles adicionales
      pokemonArray.forEach((pokemon: any) => {
        this.pokeApiService.getPokemonDetails(pokemon.url).subscribe((details: any) => {
          const pokemonDetails = {
            name: details.name,
            type: details.types[0].type.name,
            image: details.sprites.other.dream_world.front_default,
            abilities: details.abilities.map((ability: any) => ability.ability.name),
            color: this.typeColor[details.types[0].type.name]
          };

          this.pokemonList.push(pokemonDetails);
        });
      });
    });
  }

  

 



  

  handleSuccessMethod(data:any){
    this.showImage = true;
    this.data = data;
    this.data["typeColor"] = this.typeColor[data.types[0].type.name]
  }

  handleErrorMethod(){
    this.showImage = false;
    this.data.name = "Pokemon no encontrado" 
  }

}
