type colorName = {
   bug: string;
   grass: string;
   fire: string;
   poison: string;
   water: string;
   flying: string;
   normal: string;
}

interface objType {
   badge: {
      [key: string]: string
   };
   cards: {
      [key: string]: string
   }
}


export const colors: objType = {
   badge: {
      bug: 'bg-gradient-to-r from-max_blue to-min_blue',
      grass: 'bg-gradient-to-r from-max_blue to-min_blue',
      fire: 'bg-gradient-to-r from-fire1 to-fire2',
      poison: 'bg-gradient-to-r from-max_blue to-min_blue',
      water: 'bg-gradient-to-r from-water1 to-water2',
      flying: 'bg-gradient-to-r from-max_blue to-min_blue',
      normal: 'bg-gradient-to-r from-max_blue to-min_blue'
   },
   cards: {
      bug: 'bg-gradient-to-b from-max_blue to-min_blue',
      grass: 'bg-gradient-to-b from-max_orange to-min_orange',
      fire: 'bg-gradient-to-b from-max_orange to-min_orange',
      poison: 'bg-gradient-to-b from-max_blue to-min_blue',
      water: 'bg-gradient-to-b from-max_blue to-min_blue',
      flying: 'bg-gradient-to-b from-max_blue to-min_blue',
      normal: 'bg-gradient-to-b from-max_blue to-min_blue'
   }
}
