/**
 * Metro Mutts Journal — "Too Hot for the Dog Park?"
 * SEO-optimized summer daycare article
 * Design: Apple × Linear × Chewy Editorial
 * White background, editorial typography, 760px max-width
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { useBookingModal } from "@/contexts/BookingModalContext";
import { ArrowRight, Clock } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/blog-summer-heat-hero-Ge8ZFehA9knJ44NifDf4LE.webp";

const relatedArticles = [
  {
    title: "Enrichment Beyond the Walk: 7 Ways to Tire Out Your Dog's Brain",
    slug: "enrichment-beyond-the-walk-7-ways-to-tire-out-your-dogs-brain",
    readTime: "7 min read",
  },
  {
    title: "Summer Heat Safety Tips for Dogs in Tulsa",
    slug: "summer-heat-safety-tips-for-dogs-in-tulsa",
    readTime: "5 min read",
  },
  {
    title: "Why Daycare Dogs Are Happier Dogs",
    slug: "why-daycare-dogs-are-happier-dogs",
    readTime: "5 min read",
  },
  {
    title: "How Dog Daycare Helps Working Pet Parents",
    slug: "how-dog-daycare-helps-working-pet-parents",
    readTime: "5 min read",
  },
];

export default function BlogSummerHeat() {
  const { openBookingModal } = useBookingModal();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageSEO
        title="Too Hot for the Dog Park? Here's Why Summer Is One of the Best Times for Daycare | Metro Mutts"
        description="Oklahoma heat limits safe outdoor exercise for dogs. Learn why climate-controlled daycare keeps dogs active, healthy and happy all summer long. Metro Mutts Tulsa."
        canonical="https://metromutts.com/blog/too-hot-for-the-dog-park"
      />
      <Navbar />

      {/* Hero — full-width image */}
      <section className="bg-white pt-8 pb-4">
        <div className="mx-auto max-w-[960px] px-6 lg:px-0">
          <motion.img
            src={HERO_IMG}
            alt="Happy dogs playing indoors at a climate-controlled daycare facility while summer heat blazes outside"
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
            Too Hot for the Dog Park?
          </h1>
          <p className="mt-4 text-[#345460]/60 text-xl font-light leading-relaxed">
            Here's why summer is one of the best times for daycare.
          </p>
        </motion.div>
      </div>

      {/* Article Meta */}
      <div className="border-b border-gray-100">
        <div className="mx-auto max-w-[760px] px-6 lg:px-0">
          <div className="flex items-center gap-5 py-5 text-sm text-gray-400">
            <span>Metro Mutts Team</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>July 28, 2026</span>
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
              Your dog is staring at you. That look — the one that says <em>I need to go somewhere, do something, chase something, be something other than bored</em>. You grab the leash. You open the door. And then it hits you like a wall: 97 degrees.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The air is thick, the sidewalk is radiating heat you can feel through your shoes, and the dog park looks like a ghost town.
            </p>
            <p className="text-[#345460] text-lg leading-relaxed mb-6 font-medium">
              Now what?
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              If you live in Tulsa — or anywhere in Oklahoma — you already know this feeling. June through September, the heat doesn't just make outdoor exercise uncomfortable. It makes it dangerous. And yet your dog's need for movement, stimulation, and social connection doesn't take a summer vacation.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              So what do you actually do with a high-energy dog when it's too hot to go outside?
            </p>

            {/* ─── Section: How Hot Is Too Hot ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              How Hot Is Too Hot for Dogs?
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Most people underestimate how quickly pavement heats up. When the air temperature hits 85 degrees, asphalt can reach 130 degrees or higher. At 95 degrees — a perfectly normal July afternoon in Tulsa — the ground can burn a dog's paw pads in under 60 seconds.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              But it's not just about paws.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Dogs regulate their body temperature primarily through panting. Unlike humans, they can't sweat through their skin. That means when the air is hot <em>and</em> humid — which describes most Oklahoma summers — their cooling system becomes dangerously inefficient.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Here's what veterinarians want you to know:
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Brachycephalic breeds</span> (bulldogs, pugs, Boston terriers, boxers, shih tzus) can begin overheating at temperatures as mild as 70 degrees if humidity is high or they're exerting themselves. Their shortened airways make it physically harder to move enough air to cool down.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Puppies and senior dogs</span> are also at elevated risk. Young dogs haven't fully developed their thermoregulation, and older dogs often have compromised cardiovascular systems that struggle under heat stress.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              <span className="font-semibold text-[#345460]">Warning signs of heat exhaustion:</span> excessive heavy panting that doesn't slow down, bright red or purple gums, excessive drooling, stumbling or reluctance to stand, vomiting, and glazed eyes or disorientation. Heat stroke can escalate from mild to life-threatening in minutes.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-[#48D597] pl-6 py-2 my-10">
              <p className="text-[#345460] text-lg italic leading-relaxed">
                "The safest place to burn energy on a 100-degree day isn't the sidewalk."
              </p>
            </blockquote>

            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              The bottom line: if you wouldn't walk barefoot on the pavement, your dog shouldn't either. And if you're uncomfortable standing outside for 20 minutes, your dog is probably struggling after five.
            </p>

            {/* ─── Section: Dogs Don't Just Need Exercise ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              Dogs Don't Just Need Exercise
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Here's the part most people miss. Your dog doesn't just need to run. They need to <em>think</em>.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Canine behavioral science has shown us that mental stimulation is just as critical as physical exercise — sometimes more so. A dog who gets 30 minutes of enrichment and social play can be calmer, more settled, and more satisfied than a dog who runs for an hour on a treadmill.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Social interaction.</span> Dogs are pack animals. They need to read body language, negotiate play styles, and exist in a social structure. Isolation — even comfortable isolation — doesn't fulfill that need.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Novelty and exploration.</span> Sniffing new environments, encountering new textures, hearing new sounds. A backyard they've explored a thousand times offers almost zero mental stimulation.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Problem solving.</span> Puzzle feeders, agility obstacles, scent work, and structured games all activate the parts of a dog's brain that keep them sharp and content.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              <span className="font-semibold text-[#345460]">Confidence building.</span> Dogs who regularly navigate new social situations and environments develop resilience. They're less reactive, less anxious, and more adaptable.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-[#48D597] pl-6 py-2 my-10">
              <p className="text-[#345460] text-lg italic leading-relaxed">
                "A tired dog isn't just physically exhausted. They're mentally fulfilled."
              </p>
            </blockquote>

            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              This is why a dog can come home from daycare and sleep for hours — not because they ran a marathon, but because their brain was engaged all day long.
            </p>

            {/* ─── Section: Why Sitting Inside Isn't the Answer ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              Why Sitting Inside All Day Isn't the Answer
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              When it's 100 degrees outside, the instinct is to keep your dog inside. Air conditioning. Netflix. Maybe a frozen Kong. And for a day or two, that works.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              But dogs weren't built for sedentary living. When a high-energy dog spends day after day with nothing to do, the consequences show up fast:
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Destructive behavior.</span> Chewing furniture, shredding pillows, digging at carpet. This isn't spite — it's a dog desperately trying to create stimulation where none exists.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Excessive barking.</span> Boredom barking is different from alert barking. It's repetitive, rhythmic, and relentless. It's your dog telling you they have nothing else to do.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Anxiety and restlessness.</span> Pacing, whining, following you from room to room. Dogs who are under-stimulated often develop generalized anxiety that spills into other areas of their life.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              <span className="font-semibold text-[#345460]">Nighttime zoomies.</span> If your dog is exploding with energy at 9 PM, it's because they stored up an entire day's worth of it with nowhere to put it.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              A backyard helps — but during an Oklahoma summer, even 15 minutes outside can push a dog into the danger zone. And most backyards don't offer the social interaction, novelty, or structured enrichment that dogs actually need. The math is simple: if outdoor exercise is off the table for three to four months of the year, you need a plan that doesn't involve your dog staring at the wall.
            </p>

            {/* ─── Section: What Makes Indoor Daycare Different ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              What Makes Indoor Daycare Different?
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Indoor daycare isn't just "a room with dogs in it." At least, it shouldn't be. The best facilities create an experience that mirrors what dogs would naturally seek out: movement, friendship, rest, and variety — all in a safe, temperature-controlled environment.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Climate-controlled play areas.</span> Not just air conditioning — purpose-built spaces where dogs can sprint, wrestle, and explore without any risk of overheating. The temperature stays consistent regardless of what's happening outside.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Structured playgroups.</span> Dogs are grouped by size, energy level, and temperament. A 12-pound Yorkie isn't thrown in with a 90-pound Lab. A shy newcomer isn't overwhelmed by a pack of regulars.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Active staff supervision.</span> Trained handlers who understand dog body language, intervene before conflicts escalate, and ensure every dog is having a positive experience.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Rotation between activity and rest.</span> Dogs don't play for eight hours straight. They alternate between high-energy play, enrichment activities, water breaks, and quiet rest periods.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              <span className="font-semibold text-[#345460]">Enrichment beyond fetch.</span> Puzzle toys, sensory games, agility equipment, splash pads, and scent work. The kind of activities that engage a dog's brain, not just their legs.
            </p>
            <p className="text-[#345460] text-lg leading-relaxed mb-16 font-medium">
              Dogs leave happy — not overheated, not overstimulated, not stressed. Just genuinely, deeply satisfied.
            </p>

            {/* ─── Section: Built for Tulsa Summers ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              Built for Tulsa Summers
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Metro Mutts wasn't built to simply have air conditioning. Plenty of buildings have air conditioning.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              The facility was designed from the ground up so that dogs could enjoy safe, enriching, full-day play even when Oklahoma weather makes outdoor exercise unrealistic. That's an important distinction.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Over 7,000 square feet of indoor and outdoor space — including 4,000 square feet of turfed play area — means dogs have room to run, explore, and socialize without ever stepping onto hot pavement. The climate-controlled environment stays comfortable whether it's 102 degrees outside or 15.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Every aspect of the space was built around what dogs actually need during Tulsa's brutal summers: room to move, friends to play with, enrichment to keep their minds sharp, and staff who genuinely understand canine behavior.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Families from Midtown, South Tulsa, Broken Arrow, Jenks, and Bixby bring their dogs here specifically because they know summer doesn't have to mean four months of boredom. It can mean four months of the best socialization and enrichment their dog gets all year.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-[#48D597] pl-6 py-2 my-10">
              <p className="text-[#345460] text-lg italic leading-relaxed">
                "Exercise changes with the seasons. Your dog's need for it doesn't."
              </p>
            </blockquote>

            {/* ─── Section: Signs Your Dog Needs More Enrichment ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6 mt-16">
              How to Tell Your Dog Needs More Enrichment
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              Not sure if your dog is getting enough stimulation? Here are the signs that they're telling you — in the only language they have:
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Pacing or restlessness.</span> Walking in circles, unable to settle, constantly shifting positions. This is a dog whose brain has nothing to work on.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Demand barking.</span> Barking at you, at the door, at nothing. Not because something is wrong — because nothing is happening.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Destructive chewing.</span> Shoes, furniture legs, remote controls. If your dog is destroying things, they're not being bad. They're being bored.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Sock stealing and attention-seeking.</span> Grabbing items and running away, nudging you constantly, dropping toys in your lap every five minutes.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-4">
              <span className="font-semibold text-[#345460]">Late-night zoomies.</span> If your dog is tearing through the house at 9 PM, they didn't burn enough energy during the day. Full stop.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              <span className="font-semibold text-[#345460]">Constantly asking to go outside.</span> Even when it's too hot. Even when they just came in. They're not confused — they're desperate for something to do.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-16">
              If any of this sounds familiar, your dog isn't broken. They're under-stimulated. And during an Oklahoma summer, when outdoor options shrink dramatically, that gap between what they need and what they're getting only widens.
            </p>

            {/* ─── Conclusion ─── */}
            <h2 className="text-2xl sm:text-[1.75rem] font-bold text-[#345460] tracking-tight mb-6">
              Summer Shouldn't Mean Fewer Adventures
            </h2>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              It just means changing where they happen.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              When the Oklahoma heat makes outdoor play difficult — and let's be honest, from June through September it often does — dogs still deserve exercise, friendship, enrichment, and fun. They still deserve to come home tired, happy, and fulfilled.
            </p>
            <p className="text-[#345460] text-lg leading-relaxed mb-6 font-medium">
              That's exactly why Metro Mutts exists.
            </p>
            <p className="text-[#345460]/80 text-[1.0625rem] leading-[1.8] mb-6">
              If you've never visited, we invite you to schedule a free temperament evaluation and see the facility for yourself. Walk through the play areas. Meet the staff. Watch the dogs. You'll understand in about 30 seconds why so many Tulsa dogs spend their summers playing indoors.
            </p>
            <p className="text-[#345460] text-lg italic leading-relaxed mb-4">
              Come see why so many Tulsa dogs spend their summers playing indoors.
            </p>
          </motion.div>
        </article>

        {/* CTA Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="text-center max-w-lg mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#345460] tracking-tight mb-3">
              Schedule a Free Visit
            </h2>
            <p className="text-[#345460]/60 text-[1.0625rem] leading-relaxed mb-8">
              See the facility, meet the team, and watch the dogs play. No pressure, no commitment — just come see what indoor daycare looks like.
            </p>
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 bg-[#48D597] hover:bg-[#3bc085] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#48D597]/20 transition-all hover:-translate-y-0.5"
            >
              Book a Free Visit
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
