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
}

export type DataProps = {
    data: ResultDataProps[];
}