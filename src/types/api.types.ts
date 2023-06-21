type EvolveProps = {
   baby_trigger_item: any;
   chain: {
      evolution_details: [];
      evolves_to: [{
         species: {
            name: string;
            url: string;
         };
      }]
   }
}

export type ResultDataProps = {
   abilities: [];
   order: number;
   base_experience: number;
   height: number;
   is_default: boolean;
   game_indices: [];
   forms: [];
   id: number;
   name: string;
   past_types: [];
   location_area_encounters: string;
   species: {};
   sprites: {
      front_default: string | null;
      back_default: string | null;
      front_shiny: string | null;
      back_shiny: string | null;
      other: {
         dream_world: {
            front_default: string;
         }
      }
   };
   stats: [];
   types: [{
      slot: number;
      type: {
         name: string;
         url: string;
      }
   }];
   weight: number;
   evolve: EvolveProps;
}

export type DataProps = {
   data: ResultDataProps[];
}