export function BackgroundShape() {
  return (
    <span
      className={''+`
        fixed 
        top-0 
        left-0
        h-full
        w-full
        rotate-[50deg]
        translate-y-[-55%] 
        z-[0]
      bg-background 
        sm:rounded-full
        sm:rotate-[0deg]
        sm:w-[180vw] 
        sm:h-[175vw] 
        sm:translate-y-[-92%] 
        sm:translate-x-[-22%] 
      `} />
  );
}
