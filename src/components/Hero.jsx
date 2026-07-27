
function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-12 text-center">
        <span className="mb-5 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-sm font-medium text-lime-300">
        AI-powered meal analysis
        </span>

        <h1 className="max-w-5xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
        Eat Smarter.
        <span className="text-lime-300"> Train Better.</span>    
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
        Upload a photo of your meal and get estimated nutrition,
        a health score, and simple improvement suggestions.
        </p>
      
    </section>
  )
}

export default Hero
