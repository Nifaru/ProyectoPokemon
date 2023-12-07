import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../service/poke-api.service';

@Component({
  selector: 'app-class-example',
  templateUrl: './class-example.component.html',
  styleUrls: ['./class-example.component.css']
})
export class ClassExampleComponent implements OnInit {

  ashKetchup: any={};

  constructor(private api:PokeApiService){}  

  ngOnInit(): void {
   // this.searchPokemon();
  }

  // searchPokemon():void{
  //   this.api.cosultPokemon('magikarp').subscribe({
  //     next:(infoPoke)=>{
  //       this.ashKetchup = infoPoke;
  //       console.log(this.ashKetchup);
  //     }
  //   })
  // }
}
