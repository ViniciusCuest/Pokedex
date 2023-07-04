'use client'
export function Graph({ data }: any) {
  console.log('ads', data);
  return (
    <div className="sm:px-6 sm:py-5 space-y-1">
      {
        data.map((item) => {
          const width = `w-[${item.base_stat}%]`;
          return (
            <div key={item.id} className="grid grid-cols-3">
              <h4 className="font-sans text-lg text-white text-left">
                {
                  item.pokemon_v2_stat.name
                }
              </h4>
              <div className='bg-max_blue opacity-75 h-5 w-48 rounded-2xl z-0 relative'>
                <span className={`absolute h-full bg-white z-10 rounded-xl ${width}`} />
              </div>
              <p className="font-sans text-xl text-white font-bold text-right">
                {
                  item.base_stat
                }
              </p>
            </div>
          );
        })
      }
    </div >
  );
}
