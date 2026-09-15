import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageSEO from "@/components/PageSEO";

const HERO_IMAGE =
  "/manus-storage/Shadow_email_84ae3f1b.png";

const DAYCARE_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/new-daycare-9JTdpbodWw4zW5xQhTfmzM.webp";

const ARTICLE_URL = "https://metromutts.com/journal/why-does-my-dog-follow-me-everywhere";

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Does My Dog Follow Me Everywhere? 7 Common Reasons",
  description:
    "Why does your dog follow you everywhere—even to the bathroom? Here are 7 common reasons dogs shadow their owners and what the behavior may mean.",
  image: [`https://metromutts.com${HERO_IMAGE}`],
  datePublished: "2026-09-15",
  dateModified: "2026-09-15",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": ARTICLE_URL,
  },
  author: {
    "@type": "Organization",
    name: "Metro Mutts Team",
    url: "https://metromutts.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Metro Mutts",
    logo: {
      "@type": "ImageObject",
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/mm-logo-dark_455bad7b.png",
    },
  },
};

const relatedArticles = [
  {
    title: "Which One Is Your Dog?",
    href: "/blog/which-one-is-your-dog",
    readTime: "8 min read",
  },
  {
    title: "Enrichment Beyond the Walk",
    href: "/blog/enrichment-beyond-the-walk-7-ways-to-tire-out-your-dogs-brain",
    readTime: "7 min read",
  },
];

function ArticleParagraph({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[1.0625rem] leading-[1.8] text-[#223B4D]/80 mb-6 ${className}`}>
      {children}
    </p>
  );
}

function Reason({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-14 scroll-mt-24" id={`reason-${number}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#48D597]">
        Reason {number}
      </p>
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-[#223B4D] sm:text-[1.75rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function JournalWhyDogFollows() {
  return (
    <div className="min-h-screen bg-white text-[#223B4D]">
      <PageSEO
        title="Why Does My Dog Follow Me Everywhere? 7 Common Reasons | Metro Mutts"
        description="Why does your dog follow you everywhere—even to the bathroom? Here are 7 common reasons dogs shadow their owners and what the behavior may mean."
        canonical={ARTICLE_URL}
        structuredData={articleSchema}
      />
      <Navbar />

      <main>
        <section className="bg-white pt-8">
          <div className="mx-auto max-w-[960px] px-6 lg:px-0">
            <motion.img
              src={HERO_IMAGE}
              alt="Metro Mutts team member walking through the indoor daycare as dogs happily follow behind"
              className="aspect-[16/10] w-full rounded-2xl object-cover object-center sm:aspect-[16/8]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            />
          </div>
        </section>

        <header className="mx-auto max-w-[760px] px-6 pb-7 pt-11 lg:px-0 lg:pt-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#48D597]">
              The Metro Mutts Journal
            </span>
            <h1 className="text-4xl font-bold leading-[1.07] tracking-tight text-[#223B4D] sm:text-5xl lg:text-[3.5rem]">
              Why Does Your Dog Follow You Everywhere?
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-light leading-relaxed text-[#223B4D]/65">
              Seven reasons you might have a four-legged shadow—and what your dog may actually be trying to tell you.
            </p>
          </motion.div>
        </header>

        <div className="border-y border-slate-100">
          <div className="mx-auto flex max-w-[760px] items-center gap-4 px-6 py-5 text-sm text-[#223B4D]/45 lg:px-0">
            <span>Metro Mutts Team</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime="2026-09-15">September 15, 2026</time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 8 min read</span>
          </div>
        </div>

        <article className="mx-auto max-w-[760px] px-6 py-14 lg:px-0 lg:py-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <div className="mb-14">
              <p className="mb-6 text-lg leading-relaxed text-[#223B4D]">You stand up.</p>
              <p className="mb-6 text-lg leading-relaxed text-[#223B4D]">Your dog stands up.</p>
              <p className="mb-6 text-lg leading-relaxed text-[#223B4D]">You walk to the kitchen. They’re coming too.</p>
              <p className="mb-6 text-lg leading-relaxed text-[#223B4D]">You go upstairs. Right behind you.</p>
              <p className="mb-6 text-lg leading-relaxed text-[#223B4D]">You go to the bathroom and close the door. Apparently, that’s where they draw the line.</p>
              <p className="mb-6 text-lg font-medium leading-relaxed text-[#223B4D]">So why do dogs follow us everywhere?</p>
              <ArticleParagraph>
                The obvious answer is: <em>because they love us.</em> And yes, attachment is part of the story. But dogs may shadow people for several different reasons. Figuring out which one fits your dog can tell you something interesting about how they experience their world—and how closely they have been studying your kitchen habits.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">Here are seven common explanations.</ArticleParagraph>
            </div>

            <Reason number={1} title="You’re Their Person">
              <ArticleParagraph>
                Dogs are social animals, and many form strong attachment relationships with the people they live with. Research has found attachment-related behavior in dogs, with plenty of individual variation. In plain English: being close to a trusted person can simply feel safe, familiar, and good.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                That does not mean every dog who follows you is anxious or overly dependent. Sometimes it means your dog likes your company and has decided the house is better when the two of you occupy the same room.
              </ArticleParagraph>
            </Reason>

            <Reason number={2} title="You’re Where the Good Stuff Happens">
              <ArticleParagraph>
                From a dog’s perspective, humans control an extraordinary number of valuable resources: food, doors, walks, car rides, toys, attention, outside access, and occasionally cheese.
              </ArticleParagraph>
              <ArticleParagraph>
                If following Dad into the kitchen has produced cheese three times, following Dad into the kitchen is suddenly a very reasonable investment strategy. Dogs repeat behaviors that have historically paid off. The behavior does not have to pay off every time to be worth trying again.
              </ArticleParagraph>
              <blockquote className="my-10 border-l-4 border-[#48D597] py-2 pl-6">
                <p className="max-w-xl text-xl italic leading-relaxed text-[#223B4D]">“Sometimes your dog’s shadowing isn’t clinginess. It’s just excellent pattern recognition.”</p>
              </blockquote>
              <ArticleParagraph className="mb-0">
                So if your dog materializes every time you open the fridge, that may be less a mystery of the heart and more a highly successful research program.
              </ArticleParagraph>
            </Reason>

            <Reason number={3} title="They Know Your Routine Better Than You Do">
              <ArticleParagraph>
                Dogs are remarkably good at noticing patterns. Shoes go on: maybe a walk. The laptop closes: something might happen. Coffee finishes: the morning is changing. Keys come out: somebody is leaving.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                What looks like random following can be anticipation. Your dog may not be trailing you because they need something in that exact moment. They may be trying to get ahead of the next scene in a sequence they know very well. And unlike the rest of us, they are not distracted by email while they do it.
              </ArticleParagraph>
            </Reason>

            <Reason number={4} title="You’re the Most Interesting Thing Happening">
              <ArticleParagraph>
                Sometimes following you is simply the most interesting option available. If the environment is not offering much stimulation, the moving human becomes entertainment. You are the show.
              </ArticleParagraph>
              <ArticleParagraph>
                Dogs can benefit from safe, suitable chances to sniff, explore, play, solve small problems, and encounter novelty at their own pace. For some, a food puzzle or a slow, sniff-heavy walk is plenty. For others, training games, a new route, time with trusted people, or appropriate social interaction adds another satisfying layer.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                The useful question is not “How can I wear my dog out?” It is “What does this particular dog enjoy doing?” A dog who is overwhelmed by a crowded setting may prefer a quiet trail. A dog who loves company may be delighted by a play date. Individual taste is the whole point.
              </ArticleParagraph>
            </Reason>

            <Reason number={5} title="Some Dogs Are Built to Keep an Eye on Us">
              <ArticleParagraph>
                Breed tendencies can be part of the picture. Some dogs were selectively bred to work closely alongside people, which may make them especially attentive to human movement and behavior. Herding breeds, sporting breeds, working dogs, and some companion breeds can all show that watchful, “what are we doing next?” quality.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                But breed is not a personality test. A dog’s history, learning, age, confidence, and individual temperament matter just as much. The point is not that a certain kind of dog is destined to be a velcro dog. It is that their wiring may make the human side of the room especially interesting.
              </ArticleParagraph>
            </Reason>

            <Reason number={6} title="They’d Simply Like to Know What You’re Doing">
              <ArticleParagraph>
                Dogs are curious, and we sometimes over-psychologize perfectly ordinary dog behavior. You got up. Something might happen. They would like to investigate.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                Not every trip across the house is an emotional event. Sometimes your dog just wants to know why you’re going over there. This is especially true if you have ever been known to open a cabinet, pick up a leash, or make the suspicious crinkling sound of a treat bag.
              </ArticleParagraph>
            </Reason>

            <Reason number={7} title="Sometimes Clinginess Is Worth Paying Attention To">
              <ArticleParagraph>
                Following behavior alone is usually not enough to conclude that a dog has separation anxiety. A dog can enjoy being near their person and still settle comfortably when that person leaves. Separation-related distress is different: it is about genuine difficulty coping with an absence, not simple enthusiasm for company.
              </ArticleParagraph>
              <ArticleParagraph>
                Signs worth discussing with a veterinarian or qualified behavior professional can include persistent vocalizing, destructive behavior specifically around departures, attempts to escape, inability to settle, inappropriate elimination, or intense distress when departure cues appear. Those signs can have more than one cause, so they are a reason to investigate—not a DIY diagnosis.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                A sudden, unexplained increase in clinginess is also worth noting, especially if it comes with changes in appetite, activity, mobility, sleep, or other behavior. Dogs do not give us a memo when something feels different. A veterinarian can help rule out physical causes before we assume the answer is emotional.
              </ArticleParagraph>
            </Reason>

            <section className="border-y border-[#48D597]/30 py-10 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#48D597]">Which shadow do you have?</p>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#223B4D]/75">
                The Food Optimist. The Routine Expert. The Velcro Dog. The Bored Sidekick. The Curious Supervisor. Most dogs are a charmingly inconsistent mix.
              </p>
            </section>

            <section className="mb-16 mt-16">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#223B4D] sm:text-[1.75rem]">So Which One Is Your Dog?</h2>
              <ArticleParagraph>
                Most dogs are probably not just one category. If yours follows you primarily into the kitchen, you may be looking at learned behavior plus optimism. If they appear the second you touch your walking shoes, you likely live with a routine expert.
              </ArticleParagraph>
              <ArticleParagraph>
                If they nap peacefully while you are gone but follow you everywhere when you are home, attachment, curiosity, and habit are more likely explanations than separation anxiety. If they wander off the instant something more interesting appears, congratulations: you may simply have a dog with priorities.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0">
                And if they become genuinely distressed when you leave, that is different. It deserves closer, compassionate attention—not a label based on how often they accompany you to the bathroom.
              </ArticleParagraph>
            </section>

            <section className="mb-16">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#223B4D] sm:text-[1.75rem]">The Underrated Skill of Being Okay Without You</h2>
              <ArticleParagraph>
                A strong relationship with a dog does not require the dog to be physically attached to us every moment. Dogs can benefit from positive experiences that do not depend entirely on their primary person: exploring, sniffing, playing, resting independently, learning something new, and spending time with trusted people. For dogs who enjoy it, appropriate interaction with other dogs can be part of that wider world too.
              </ArticleParagraph>
              <blockquote className="my-10 border-l-4 border-[#48D597] py-2 pl-6">
                <p className="max-w-xl text-xl italic leading-relaxed text-[#223B4D]">“A confident dog doesn’t love you less when you’re not in the room.”</p>
              </blockquote>
              <ArticleParagraph className="mb-0">
                Independence is not emotional distance. It is a dog having more than one good thing in their day. The goal is not to make your dog need you less. It is to let their world get a little bigger.
              </ArticleParagraph>
            </section>

            <section className="mb-16 overflow-hidden rounded-2xl bg-[#223B4D]">
              <img
                src={DAYCARE_IMAGE}
                alt="Metro Mutts team member playing with dogs in the indoor daycare space"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-7 sm:p-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#48D597]">Where Metro Mutts fits</p>
                <h2 className="mb-5 text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">A World That Exists Beyond the Hallway</h2>
                <p className="mb-5 text-[1.0625rem] leading-[1.8] text-white/75">
                  One of the things we like about <Link href="/daycare" className="font-semibold text-[#48D597] underline decoration-[#48D597]/40 underline-offset-4 hover:text-white">daycare</Link> is not simply that dogs come home tired. For dogs who enjoy it, a thoughtfully matched daycare day can offer a world that exists independently of their humans: smells to investigate, people to know, dogs to play with, places to explore, choices to make, and eventually somewhere comfortable to collapse.
                </p>
                <p className="mb-0 text-[1.0625rem] leading-[1.8] text-white/75">
                  Not every dog enjoys the same social environment, and that is exactly why temperament, confidence, energy, and play style matter. The dog who loves a bustling group and the dog who prefers one calm friend are both telling us something useful. If you are curious about the personalities we notice every day, start with <Link href="/blog/which-one-is-your-dog" className="font-semibold text-[#48D597] underline decoration-[#48D597]/40 underline-offset-4 hover:text-white">Which One Is Your Dog?</Link>
                </p>
              </div>
            </section>

            <section className="mb-14">
              <ArticleParagraph>
                So tomorrow morning, when you get up from the couch and hear four paws immediately hit the floor behind you, remember: it could be love. It could be habit. It could be curiosity. Or you may simply be walking in the general direction of the cheese.
              </ArticleParagraph>
              <ArticleParagraph className="mb-0 text-lg font-medium text-[#223B4D]">
                Either way, you probably still will not be going to the bathroom alone.
              </ArticleParagraph>
            </section>

            <section className="border-t border-slate-100 pt-10">
              <h2 className="mb-4 text-xl font-bold text-[#223B4D]">Sources &amp; Further Reading</h2>
              <p className="text-sm leading-7 text-[#223B4D]/60">
                Behavioral guidance for this article was checked against <a href="https://pubmed.ncbi.nlm.nih.gov/9770312/" target="_blank" rel="noreferrer" className="font-medium text-[#223B4D] underline decoration-[#48D597] underline-offset-4 hover:text-[#48D597]">research on dog–owner attachment</a>, the <a href="https://www.dogstrust.org.uk/dog-advice/life-with-your-dog/enrichment/enrichment-activities-for-dogs" target="_blank" rel="noreferrer" className="font-medium text-[#223B4D] underline decoration-[#48D597] underline-offset-4 hover:text-[#48D597]">Dogs Trust enrichment guide</a>, the <a href="https://www.aspca.org/pet-care/dog-care/common-dog-behavior-issues/separation-anxiety" target="_blank" rel="noreferrer" className="font-medium text-[#223B4D] underline decoration-[#48D597] underline-offset-4 hover:text-[#48D597]">ASPCA guide to separation anxiety</a>, and <a href="https://vetmed.illinois.edu/pet-health-columns/separation-anxiety-in-pets-faq/" target="_blank" rel="noreferrer" className="font-medium text-[#223B4D] underline decoration-[#48D597] underline-offset-4 hover:text-[#48D597]">University of Illinois veterinary guidance</a>. If your dog’s behavior changes suddenly or they seem distressed when alone, consult your veterinarian.
              </p>
            </section>
          </motion.div>
        </article>

        <section className="border-t border-slate-100 bg-[#fafcfb] py-16 sm:py-20">
          <div className="mx-auto max-w-xl px-6 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#48D597]">Metro Mutts Daycare</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#223B4D]">Give Your Shadow Something to Do.</h2>
            <p className="mb-8 text-[1.0625rem] leading-relaxed text-[#223B4D]/65">
              Play. Friends. New smells. New experiences. And an entire day of things that do not involve following you to the bathroom.
            </p>
            <a
              href="https://metromutts.com/booking"
              className="inline-flex items-center gap-2 rounded-full bg-[#48D597] px-7 py-3.5 text-sm font-bold text-[#223B4D] shadow-lg shadow-[#48D597]/20 transition-all hover:-translate-y-0.5 hover:bg-[#3bc485]"
            >
              Book Their Next Day <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="border-t border-slate-100 bg-white py-14">
          <div className="mx-auto max-w-[760px] px-6 lg:px-0">
            <h2 className="mb-7 text-sm font-semibold uppercase tracking-[0.16em] text-[#223B4D]/40">More from the Journal</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((article) => (
                <Link key={article.href} href={article.href} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-[#fafcfb] p-5 transition-all hover:border-[#48D597]/40 hover:shadow-sm">
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-[#223B4D] transition-colors group-hover:text-[#48D597]">{article.title}</h3>
                    <span className="mt-1 flex items-center gap-1 text-xs text-[#223B4D]/40"><Clock className="h-3 w-3" />{article.readTime}</span>
                  </div>
                  <ArrowRight className="ml-3 h-4 w-4 shrink-0 text-[#223B4D]/25 transition-colors group-hover:text-[#48D597]" />
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
