import { Cards } from '../components/Cards';

export default function Home() {
  return (
    <main>
      <header className='flex w-full h-36 bg-gradient-to-r from-max_red to-min_red'></header>
      <section>
        <h1 className='text-6xl font-bold font-sans'>Favoritos</h1>
        <Cards></Cards>
      </section>
      <section></section>
    </main>
  )
}
