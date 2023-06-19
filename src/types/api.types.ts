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
    sprites: {};
    stats: [];
    types: [];
    weight: number;
}

export type DataProps = {
    data: ResultDataProps[];
}