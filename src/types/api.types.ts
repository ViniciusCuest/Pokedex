export type ResultDataProps = {
  id: number;
  name: string;
  weight: number;
  height: number;
  pokemon_v2_pokemontypes: [{
    pokemon_v2_type: {
      id: number;
      name: string;
    }
  }]
  pokemon_v2_pokemonspecy: {
    pokemon_v2_evolutionchain: {
      pokemon_v2_pokemonspecies: [{
        evolves_from_species_id: number | null;
        id: number;
        name: string;
      }]
    }
  }

  pokemon_v2_pokemonsprites: [{
    sprites: string;
  }];

}

export type DataProps = {
  data: ResultDataProps[];
}
