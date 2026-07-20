/**
 * Metro Mutts Journal — "Which One Is Your Dog?"
 * The 7 daycare personalities we see every day
 * Design: Apple × Linear × Chewy Editorial
 * White background, editorial typography, 760px max-width
 * Generous whitespace, premium feel, no blogspam
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { ArrowRight, Clock } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/dog-personalities-hero_70375c1c.png";

const relatedArticles = [
  {
    title: "Why Your Dog Sleeps So Much After Daycare",
    slug: "why-your-dog-sleeps-so-much-after-daycare",
    readTime: "4 min read",
  },
  {
    title: "The First 15 Minutes at Daycare",
    slug: "the-first-15-minutes-at-daycare",
    readTime: "4 min read",
  },
  {
    title: "Why Dogs Love Routine",
    slug: "why-dogs-love-routine",
    readTime: "3 min read",
  },
  {
    title: "5 Signs Your Dog Is Ready for a Groom",
    slug: "5-signs-your-dog-is-ready-for-a-groom",
    readTime: "5 min read",
  },
];

export default function BlogDogPersonalities() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero — full-width illustration, white background, no overlay */}
      <section className="bg-white pt-8 pb-4">
        <div className="mx-auto max-w-[960px] px-6 lg:px-0">
          <motion.img
            src={HERO_IMG}
            alt="Which One Is Your Dog? — The 7 daycare personalities illustrated with different dog breeds"
            className="w-full h-auto rounded-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </section>

      {/* Article Header */}
      <div className="mx-auto max-w-[760px] px-6 lg:px-0 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="block text-[#48D597] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            The Metro Mutts Journal
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#345460] tracking-tight leading-[1.08]">
            Which One Is Your Dog?
          </h1>
          <p className="mt-4 text-[#345460]/60 text-xl font-light leading-relaxed">
            The 7 daycare personalities we see every day (and what they tell us about your pup.)
          </p>
        </motion.div>
      </div>

      {/* Article Meta */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-[760px] px-6 lg:px-0">
          <div className="flex items-center gap-5 py-5 text-sm text-gray-400">
            <span>Metro Mutts Team</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>July 20, 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />8 min read
            </span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <main className="flex-1">
        <article className="mx-auto max-w-[760px] px-6 lg:px-0 py-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-0"
          >
            {/* Introduction */}
            <p className="text-[#345460] text-lg leading-relaxed mb-6">
              Spend a single afternoon watching dogs at daycare and something becomes obvious.
            </p>
            <p className="text-[#345460] text-lg leading-relaxed mb-6">
              They all have personalities.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Not just different breeds. Different ways of playing. Some immediately make friends. Some sprint laps until they're exhausted. Others quietly observe before joining the fun.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              After seeing thousands of dogs over the years, we've noticed the same personalities appear again and again. Seven of them, to be exact.
            </p>
            <p className="text-[#345460] text-lg leading-relaxed mb-16 font-medium">
              Which one sounds like yours?
            </p>

            {/* ─── Personality 1: The Wrestler ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              1. The Wrestler
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "Let's go. Right now. You and me."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Wrestler lives for body contact. They play bow, launch into their friend, roll around on the ground, and pop back up grinning. It looks intense to the untrained eye—but healthy wrestling is one of the most natural forms of dog play.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The key indicators of good wrestling: both dogs take turns being on top and on the bottom. They pause frequently. They use exaggerated, bouncy movements rather than stiff, tense ones. And when one dog walks away, the other lets them go.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Other wrestlers, obviously. They'll seek out the dog who matches their energy and intensity—and they usually find each other within minutes.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Boxers, Pit Bulls, Labs, Bulldogs, and many terrier mixes. But honestly, any breed can be a wrestler—it's about personality, not pedigree.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> Their joy is contagious. When two good wrestlers find each other, the whole room gets more playful.
            </p>

            {/* ─── Personality 2: The Sprinter ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              2. The Sprinter
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "Catch me if you can."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Zoomies. Laps. Full-speed sprints from one end of the yard to the other. The Sprinter doesn't walk anywhere—they launch. They're the dog that turns every game into a chase, every open space into a racetrack.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              These dogs are athletes. They need space, they need speed, and they need other dogs who can keep up. A Sprinter who doesn't get enough physical output will find other ways to burn energy at home—and you probably won't love those alternatives.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Other sprinters. They'll also recruit Social Butterflies into chase games—anyone willing to run.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Border Collies, Australian Shepherds, Huskies, Vizslas, Whippets, and Greyhounds. But we've seen Corgis run circles around all of them.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> Watching a Sprinter finally tire out and flop onto the turf is one of the most satisfying things in daycare. Pure, earned exhaustion.
            </p>

            {/* ─── Personality 3: The Referee ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              3. The Referee
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "Alright, that's enough, you two."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Referee doesn't play much. They stand nearby. They watch. They monitor. And when play gets a little too intense between two other dogs, they calmly walk over and stand between them—breaking it up without any aggression whatsoever.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              These dogs have an incredible sense of social dynamics. They read body language better than most humans do. They're often older, calmer, and carry themselves with a quiet confidence that other dogs respect instinctively.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> They don't really "play" in the traditional sense. They prefer calm companionship—lying near other dogs, walking the perimeter, or simply being present.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> German Shepherds, Great Pyrenees, older Labs, and many herding breeds. They often grow into this role over time.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> They make our job easier. A good Referee helps maintain calm energy in the room without us having to intervene.
            </p>

            {/* ─── Personality 4: The Social Butterfly ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              4. The Social Butterfly
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "Hi! Hi! Oh my god, hi! You're new! I love you already!"
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Social Butterfly knows everyone. They greet every single dog that walks through the door. They have no enemies, no grudges, no preferences—just pure, unfiltered enthusiasm for every living creature in the building.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              These dogs are the connectors. They bridge groups. They introduce shy dogs to confident ones. They bounce between playgroups like they're working the room at a party—because in their mind, that's exactly what this is.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Everyone. Literally everyone. But they especially light up around new dogs who need a friendly face.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Golden Retrievers, Goldendoodles, Cavalier King Charles Spaniels, Beagles, and Cocker Spaniels. The breeds that were literally designed to love everyone.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> They set the tone. When a Social Butterfly is in the room, the energy stays positive and welcoming for everyone.
            </p>

            {/* ─── Personality 5: The Shadow ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              5. The Shadow
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "Where are you going? I'm coming too."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Shadow bonds with people. Not just their owner—our staff, too. They follow their favorite handler from room to room. They lean against legs. They make eye contact that feels almost human. Their love language is presence.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              These dogs aren't necessarily anxious or clingy—though some start that way. Many are simply wired to seek connection with humans above all else. They'll play with other dogs when encouraged, but given the choice, they'd rather be near a person.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Staff. Honestly. But they'll warm up to gentle, calm dogs—especially other Shadows or Observers who won't overwhelm them.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Velcro breeds like Vizslas, Weimaraners, Italian Greyhounds, Cavaliers, and many rescue dogs who've bonded deeply with their person.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> The trust they place in our team. When a Shadow chooses you, it means something.
            </p>

            {/* ─── Personality 6: The Mayor ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              6. The Mayor
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "I run this place."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Mayor is the regular. The dog who's been coming for months—maybe years. They walk in like they own the building. They know where the water bowls are. They know which staff member gives the best scratches. They know the routine better than some of our new hires.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Every daycare has a few Mayors. They're the backbone of the group—the dogs that new arrivals look to for cues on how to behave. Their confidence is earned through experience, and it radiates outward.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Their established crew. They'll greet newcomers politely but tend to gravitate toward the dogs they already know and trust.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Any breed that comes consistently. The Mayor isn't born—they're made. Regularity creates confidence.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> They make daycare feel like a community. When a Mayor greets a nervous new dog with a calm sniff and a tail wag, it tells that dog: "You're safe here."
            </p>

            {/* ─── Personality 7: The Observer ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-2">
              7. The Observer
            </h2>
            <p className="text-[#48D597] text-sm font-medium uppercase tracking-wide mb-6">
              "I'm taking it all in."
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The Observer watches. They sniff. They take their time. They might spend the first 20 minutes of daycare simply standing near the edge of the room, reading the energy before deciding whether to engage.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              People often mistake this for shyness or anxiety—but observation is actually one of the healthiest things a dog can do in a new environment. It means they're processing, not panicking. They're gathering information. And when they do decide to join, they've already chosen exactly who they want to interact with.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Who they love playing with:</span> Calm, patient dogs. They avoid high-energy rushes and prefer one-on-one interactions over group chaos.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Common breeds:</span> Shiba Inus, Basenjis, Chow Chows, many hound breeds, and older dogs of any breed who've learned that watching is just as satisfying as running.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              <span className="font-semibold text-[#345460]">What we love about them:</span> Their intelligence. Observers notice things other dogs miss. And watching them finally choose to play—on their own terms—is incredibly rewarding.
            </p>

            {/* ─── Bonus: Can Dogs Change Personalities? ─── */}
            <div className="border-t border-gray-100 pt-16 mb-16">
              <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
                Can Dogs Change Personalities?
              </h2>
              <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
                Absolutely.
              </p>
              <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
                One of the most rewarding parts of running a daycare is watching dogs evolve over time. The nervous Observer who spent their first three visits glued to the wall? Six months later, they're initiating play with three different dogs. The overly intense Wrestler who didn't know when to stop? They learn boundaries, develop self-control, and become a better play partner.
              </p>
              <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
                Confident dogs become calmer. Shy dogs become social. Young dogs mature. Play styles evolve.
              </p>
              <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8]">
                That's what consistent socialization does. It doesn't change who your dog is—it gives them the confidence to fully become themselves.
              </p>
            </div>

            {/* Pull Quote */}
            <div className="my-20 py-12 border-t border-b border-[#48D597]/30 text-center">
              <p className="text-2xl sm:text-[1.75rem] font-light text-[#345460] leading-relaxed italic max-w-2xl mx-auto">
                "Every dog has a personality. Great daycare gives them the confidence to be themselves."
              </p>
            </div>

            {/* Interactive Engagement Section */}
            <div className="bg-[#f8faf9] rounded-2xl p-8 sm:p-10 mb-16">
              <h3 className="text-xl font-bold text-[#345460] mb-4">
                Which personality is your dog?
              </h3>
              <p className="text-[#345460]/70 text-[1.0625rem] leading-[1.8] mb-6">
                We'd love to know. Send us a message on Instagram or tell us at drop-off — we'll confirm whether we agree.
              </p>
              <div className="space-y-2 text-[#345460]/70 text-[0.9375rem]">
                <p>"Bella is definitely a Mayor."</p>
                <p>"Charlie is 100% a Sprinter."</p>
                <p>"Daisy is an Observer with a little Social Butterfly mixed in."</p>
              </div>
            </div>
          </motion.div>
        </article>

        {/* CTA Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="text-center max-w-lg mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#345460] tracking-tight mb-3">
              We'd Love to Meet Your Dog.
            </h2>
            <p className="text-[#345460]/60 text-[1.0625rem] leading-relaxed mb-8">
              Whether they're a Wrestler, Mayor, or Observer — we'd love to learn what makes them unique.
            </p>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#48D597]/20 transition-all hover:-translate-y-0.5"
            >
              Book Your Visit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-[#fafaf8] border-t border-gray-100">
          <div className="mx-auto max-w-[760px] px-6 lg:px-0">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400 mb-8">
              More from the Journal
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:border-[#48D597]/30 hover:shadow-sm transition-all"
                >
                  <div>
                    <h4 className="text-[#345460] font-medium text-sm group-hover:text-[#48D597] transition-colors leading-snug">
                      {article.title}
                    </h4>
                    <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#48D597] transition-colors flex-shrink-0 ml-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
