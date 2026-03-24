export function CommunitySection() {
  return (
    <section className="section-shell" id="community">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass rounded-3xl p-7 sm:p-9">
          <p className="text-sm uppercase tracking-[0.2em] text-accent-300">Community-first</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">More than bookings. A sports network.</h2>
          <p className="mt-4 text-slate-300">
            Join interest groups, challenge friends, attend local meetups, and stay consistent with a supportive community
            layer built into every activity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: 'Group chats', text: 'Coordinate sessions and keep your team active.' },
            { title: 'Weekly challenges', text: 'Compete, earn badges, and celebrate progress.' },
            { title: 'Local events', text: 'Join pop-up tournaments and social runs.' },
            { title: 'Accountability circles', text: 'Stay motivated with your sports crew.' },
          ].map((item) => (
            <article key={item.title} className="glass rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
