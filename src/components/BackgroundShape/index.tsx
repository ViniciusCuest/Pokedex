export function BackgroundShape() {
  return (
    <span
      className={'shadow-2xl' + `
        absolute 
        top-0 
        left-0
        h-full
        w-full
        rotate-[50deg]
        translate-y-[-55%] 
        z-[1]
      bg-background 
        sm:fixed
        sm:rounded-full
        sm:rotate-[0deg]
        sm:w-[180vw] 
        sm:h-[175vw] 
        sm:translate-y-[-92%] 
        sm:translate-x-[-22%] 
        sm:shadow-sm
      `} />
  );
}
