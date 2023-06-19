export function Cards({children}: any) {
    return (
        <div 
        className='w-[calc((100% / 2) - (1.25rem * 2 + 1rem)] h-44 rounded-lg bg-gradient-to-b from-max_blue to-min_blue sm:rounded-lg sm:w-96 sm:h-80'>
            {
                children
            }
        </div>
    );
}

