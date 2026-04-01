import { useState } from 'react'
import { ImagePlus, WandSparkles } from 'lucide-react'

const prompts = [
  'Urban padel tournament poster with neon orange accents',
  'Night basketball in modern city court, cinematic light',
  'Fitness social app mockup with energetic sports community',
]

export function AIShowcase() {
  const [images, setImages] = useState([
    { id: 1, title: 'Padel Night Campaign', tone: 'from-orange-400/40 to-pink-500/10' },
    { id: 2, title: 'Community League Visual', tone: 'from-cyan-400/35 to-blue-500/10' },
    { id: 3, title: 'App Store Hero Banner', tone: 'from-violet-400/35 to-fuchsia-500/10' },
  ])

  const generateConcept = () => {
    setImages((prev) => {
      const nextId = prev.length + 1
      return [
        {
          id: nextId,
          title: `AI Concept #${nextId}`,
          tone: ['from-orange-400/40 to-pink-500/10', 'from-cyan-400/35 to-blue-500/10', 'from-violet-400/35 to-fuchsia-500/10'][
            nextId % 3
          ],
        },
        ...prev,
      ].slice(0, 6)
    })
  }

  return (
    <section className="section-shell" id="ai-visuals">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-accent-300">AI Visual Studio</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Generate campaign-ready sports visuals in seconds.</h2>
        <p className="mt-3 text-slate-300">
          Idea for next phase: connect this block to real AI image APIs so your team can generate social creatives directly
          from KR dashboard prompts.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass rounded-2xl p-5">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <WandSparkles className="h-5 w-5 text-accent-300" />
            Prompt ideas
          </h3>
          <div className="mt-4 space-y-3">
            {prompts.map((prompt) => (
              <div key={prompt} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                {prompt}
              </div>
            ))}
          </div>

          <button
            onClick={generateConcept}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-primary-950 transition hover:bg-accent-400"
          >
            <ImagePlus className="h-4 w-4" />
            Generate new concept
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((image) => (
            <article key={image.id} className="glass group rounded-2xl p-4">
              <div
                className={`mb-3 h-28 rounded-xl bg-gradient-to-br ${image.tone} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
              </div>
              <h3 className="text-sm font-semibold text-slate-100">{image.title}</h3>
              <p className="mt-1 text-xs text-slate-300">AI generated concept preview</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
