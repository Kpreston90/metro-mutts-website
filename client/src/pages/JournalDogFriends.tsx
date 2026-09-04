import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageSEO from "@/components/PageSEO";

const HERO_IMAGE =
  "https://res.cloudinary.com/dbirizuja/image/upload/v1782835303/ChatGPT_Image_Jun_30_2026_10_01_22_AM_d8b0dg.png";
const PLAYGROUP_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/gallery-dogs-playing-BfSr5ehaeRPFzukQGEBYsh.webp";
const YARD_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/outdoor-yard-real-edited_937b0e31.png";

const socialTypes = [
  {
    title: "The Social Butterfly",
    copy: "They greet every new arrival as if they are hosting a party. Group play can be energizing for this dog, provided the group has the same friendly, loose style.",
  },
  {
    title: "The Best-Friend Dog",
    copy: "They do not need the whole room. One or two familiar buddies may be their ideal social calendar—and they are perfectly content to keep it small.",
  },
  {
    title: "The Wrestler",
    copy: "They love a well-matched physical play partner: shoulder bumps, gentle tumble-and-reset games, and the occasional dramatic flop. Compatibility matters more than enthusiasm.",
  },
  {
    title: "The Observer",
    copy: "They enjoy being near the action without becoming the action. Watching, sniffing the perimeter, and choosing a short interaction when ready can be a great day for them.",
  },
  {
    title: "The People Dog",
    copy: "They may prefer staff attention, a quiet routine, or simply sharing a space with humans. That is not a social failure; it is useful information about what they enjoy.",
  },
  {
    title: "The Selective Socializer",
    copy: "They like dogs—just not every dog, every day, or every kind of play. A selective socializer has opinions, which is both normal and, frankly, relatable.",
  },
];

const relatedArticles = [
  {
    title: "Which One Is Your Dog? The 7 Daycare Personalities",
    href: "/blog/which-one-is-your-dog",
    readTime: "8 min read",
  },
  {
    title: "Too Hot for the Dog Park?",
    href: "/blog/too-hot-for-the-dog-park",
    readTime: "7 min read",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Does Your Dog Actually Need Friends?",
  alternativeHeadline: "Do Dogs Need Dog Friends? A Guide to Canine Socialization",
  description:
    "Do dogs actually need dog friends? Learn how dogs socialize, what healthy play looks like, and how to tell what kind of social life your dog enjoys.",
  image: [HERO_IMAGE],
  datePublished: "2026-09-04",
  dateModified: "2026-09-04",
  author: {
    "@type": "Organization",
    name: "Metro Mutts",
    url: "https://metromutts.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Metro Mutts",
    url: "https://metromutts.com",
    logo: {
      "@type": "ImageObject",
      url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503607069/K74BFWniuFWtXDKrDiRtHb/mm-logo-dark_455bad7b.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://metromutts.com/journal/do-dogs-need-friends",
  },
  about: ["Dog socialization", "Dog daycare", "Canine behavior"],
};

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[1.0625rem] leading-[1.85] text-[#223B4D]/80 sm:text-[1.1rem]">
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 pt-8 text-2xl font-bold tracking-tight text-[#223B4D] sm:text-[1.9rem]">
      {children}
    </h2>
  );
}

export default function JournalDogFriends() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageSEO
        title="Do Dogs Need Dog Friends? A Guide to Canine Socialization | Metro Mutts Journal"
        description="Do dogs actually need dog friends? Learn how dogs socialize, what healthy play looks like, and how to tell what kind of social life your dog enjoys."
        canonical="https://metromutts.com/journal/do-dogs-need-friends"
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-slate-100 bg-[#fbfcfb] pt-10 sm:pt-14">
          <div className="mx-auto max-w-[1120px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-[780px] pb-10 sm:pb-14"
            >
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#48D597]">
                The Metro Mutts Journal · Dog Behavior
              </p>
              <h1 className="max-w-[720px] text-[2.55rem] font-bold leading-[1.05] tracking-[-0.04em] text-[#223B4D] sm:text-6xl lg:text-[4.25rem]">
                Does Your Dog Actually Need Friends?
              </h1>
              <p className="mt-6 max-w-[690px] text-xl font-light leading-relaxed text-[#223B4D]/65 sm:text-2xl">
                What dogs get from other dogs that they can&apos;t always get from us—and why the answer depends on the dog.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-[#223B4D]/45">
                <span>Metro Mutts</span>
                <span className="h-1 w-1 rounded-full bg-[#223B4D]/20" />
                <span>September 4, 2026</span>
                <span className="h-1 w-1 rounded-full bg-[#223B4D]/20" />
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> 10 min read
                </span>
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="overflow-hidden rounded-t-[1.75rem]"
            >
              <img
                src={HERO_IMAGE}
                alt="A group of dogs socializing in Metro Mutts’ outdoor turf play yard, with a curious golden dog close to the camera"
                className="aspect-[16/9] w-full object-cover"
              />
            </motion.figure>
          </div>
        </section>

        <article className="mx-auto max-w-[760px] px-6 py-14 sm:py-20">
          <ArticleParagraph>
            We give our dogs a lot.
          </ArticleParagraph>
          <ArticleParagraph>
            Food. Walks. Belly rubs. A suspicious amount of space in our beds.
          </ArticleParagraph>
          <ArticleParagraph>
            But there&apos;s one thing we can&apos;t really give them: the experience of being around other dogs.
          </ArticleParagraph>
          <ArticleParagraph>
            Which raises a surprisingly complicated question: <strong className="font-semibold text-[#223B4D]">does your dog actually need friends?</strong>
          </ArticleParagraph>
          <ArticleParagraph>
            Not every dog needs a standing Saturday brunch group. Some thrive in a lively playgroup. Some prefer one reliable pal. Some grow more selective as they mature. Some simply think people are the superior species, and who are we to argue? The useful question is not whether every dog needs friends. It&apos;s what kind of social life your dog enjoys.
          </ArticleParagraph>

          <SectionHeading>Dogs Speak Dog</SectionHeading>
          <ArticleParagraph>
            Dogs are constantly exchanging information with one another. A play bow can invite interaction. A pause can reset the pace. A turn of the head, a loose curve through the body, a sniff, a shake-off, or a decision to walk away can all say something. Canine communication includes posture, facial expression, tail and ear position, scent, touch, and vocalization—not one signal in isolation.[1]
          </ArticleParagraph>
          <ArticleParagraph>
            We can provide affection, enrichment, and excellent company. But human interaction is not a perfect substitute for communication between members of the same species. Two dogs who are playing well are not merely burning calories. They are reading, responding, negotiating, and deciding whether to keep going.
          </ArticleParagraph>

          <blockquote className="my-14 border-y border-[#48D597]/35 py-10 text-center">
            <p className="mx-auto max-w-[590px] text-2xl font-light italic leading-relaxed text-[#223B4D] sm:text-3xl">
              “Dogs don&apos;t just play together. They communicate.”
            </p>
          </blockquote>

          <SectionHeading>Does That Mean Every Dog Needs Dog Friends?</SectionHeading>
          <ArticleParagraph>
            No. Socialized does not mean &ldquo;loves every dog at the park.&rdquo; A well-socialized dog may be calm, comfortable, and capable of moving through the world around other dogs without wanting to join every game. That counts.
          </ArticleParagraph>
          <ArticleParagraph>
            Dogs have flexible social lives. Some form close relationships with other dogs. Some are happy with short, polite interactions. Some prefer familiar company over novelty. Some become choosier as they get older. And some are unabashed people dogs. Veterinary behavior guidance emphasizes both the flexibility of dogs&apos; social structure and the importance of treating the individual in front of you rather than making assumptions based on breed or a generic idea of sociability.[1]
          </ArticleParagraph>
          <ArticleParagraph>
            The goal is not to turn every dog into the life of the party. It&apos;s to notice whether your dog is comfortable, interested, and able to choose their level of participation.
          </ArticleParagraph>

          <SectionHeading>What Healthy Dog Play Actually Looks Like</SectionHeading>
          <ArticleParagraph>
            Healthy play usually has some give-and-take. Look for loose bodies, bouncy or exaggerated movement, play bows, role reversals, and pauses. In a chase, the chaser and chased may switch jobs. In a wrestling match, the dog on the bottom may later become the dog on top. Most importantly, both dogs are choosing to re-engage.
          </ArticleParagraph>
          <ArticleParagraph>
            It is also useful to notice when a dog wants space. Repeated attempts to leave, hiding, a stiff or frozen posture, persistent mounting, one dog relentlessly pursuing another, or corrections that keep getting ignored are all signals that the interaction needs a reset. A wagging tail alone is not a complete report card; reading the whole dog matters.[2]
          </ArticleParagraph>

          <figure className="my-14">
            <img
              src={PLAYGROUP_IMAGE}
              alt="Metro Mutts dogs playing together under staff supervision"
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-[#223B4D]/45">
              Good group care pays attention to body language, breaks, and compatible play styles—not just activity level.
            </figcaption>
          </figure>

          <ArticleParagraph>
            That is why good supervision is more than standing in the room. It means noticing the tiny moments before a dog becomes overwhelmed, helping dogs take breaks, and making sure that opting out is always allowed.
          </ArticleParagraph>

          <SectionHeading>There&apos;s More to Play Than Burning Energy</SectionHeading>
          <ArticleParagraph>
            Appropriate social play can bring exercise, novelty, communication practice, environmental enrichment, and opportunities to make choices. It can be mentally tiring in the best way: the kind of tired that comes from having a day full of things to pay attention to.
          </ArticleParagraph>

          <blockquote className="my-14 border-y border-[#48D597]/35 py-10 text-center">
            <p className="mx-auto max-w-[590px] text-2xl font-light italic leading-relaxed text-[#223B4D] sm:text-3xl">
              “The goal isn&apos;t simply a tired dog. It&apos;s a fulfilled one.”
            </p>
          </blockquote>

          <ArticleParagraph>
            This is why a dog can come home from a good daycare day, eat dinner, and fall asleep like they just worked a double shift in middle management. Their brain has been busy, too.
          </ArticleParagraph>

          <SectionHeading>What Kind of Social Dog Do You Have?</SectionHeading>
          <ArticleParagraph>
            These are not scientific classifications. They are simply useful lenses for noticing what your dog chooses when they have options.
          </ArticleParagraph>

          <div className="my-10 grid gap-px overflow-hidden rounded-2xl border border-[#223B4D]/10 bg-[#223B4D]/10 sm:grid-cols-2">
            {socialTypes.map((type) => (
              <section key={type.title} className="bg-white p-6 sm:p-7">
                <h3 className="text-lg font-bold tracking-tight text-[#223B4D]">{type.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-7 text-[#223B4D]/65">{type.copy}</p>
              </section>
            ))}
          </div>

          <SectionHeading>Where Daycare Fits In</SectionHeading>
          <ArticleParagraph>
            Good daycare is not &ldquo;put 30 dogs together and hope they sort it out.&rdquo; It starts by learning a dog&apos;s temperament, confidence, energy level, and play style. It relies on compatible grouping, active supervision, rest, and enough space for dogs to disengage when they&apos;re done.
          </ArticleParagraph>
          <ArticleParagraph>
            The question is not how many dogs can play together. It&apos;s <strong className="font-semibold text-[#223B4D]">which dogs should play together.</strong> That is the philosophy behind a considered <Link href="/daycare" className="font-medium text-[#2daa77] underline decoration-[#48D597]/60 underline-offset-4 hover:text-[#223B4D]">dog daycare in Tulsa, Oklahoma</Link>. The match matters as much as the motion.
          </ArticleParagraph>

          <figure className="my-14">
            <img
              src={YARD_IMAGE}
              alt="Dogs enjoying supervised outdoor time in Metro Mutts’ play yard"
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-[#223B4D]/45">
              A dog&apos;s ideal day may include play, a few familiar faces, rest, outdoor time, or simply room to observe.
            </figcaption>
          </figure>

          <SectionHeading>How to Tell Whether Your Dog Might Enjoy Daycare</SectionHeading>
          <ArticleParagraph>
            A dog may enjoy daycare if they show relaxed interest around compatible dogs, seek play, recover easily from excitement, enjoy new environments, or have a history of doing well in group settings. None of these are a guarantee, and uncertainty is normal. You should not have to diagnose your dog&apos;s social preferences from the passenger seat of the car.
          </ArticleParagraph>
          <ArticleParagraph>
            That is one reason <Link href="/get-started" className="font-medium text-[#2daa77] underline decoration-[#48D597]/60 underline-offset-4 hover:text-[#223B4D]">Metro Mutts evaluates new daycare dogs</Link> before placing them into regular groups. The complimentary first daycare day gives the team time to observe your dog during at least five hours of supervised care and learn what kind of interaction feels right for them. For new boarding dogs, that first assessment also helps make an eventual <Link href="/boarding" className="font-medium text-[#2daa77] underline decoration-[#48D597]/60 underline-offset-4 hover:text-[#223B4D]">boarding stay</Link> more familiar.
          </ArticleParagraph>

          <SectionHeading>So… Does Your Dog Actually Need Friends?</SectionHeading>
          <ArticleParagraph>
            Not necessarily. Your dog needs safety, enrichment, exercise, communication, stimulation, and relationships. For many dogs, relationships with other dogs become a meaningful part of that life. For others, the ideal social circle is small, carefully chosen, or mostly human.
          </ArticleParagraph>
          <ArticleParagraph>
            The goal is not to make your dog social. It&apos;s to understand the dog you actually have.
          </ArticleParagraph>
          <ArticleParagraph>
            Because the Social Butterfly and the Observer probably should not have the same day.
          </ArticleParagraph>
          <ArticleParagraph>And that&apos;s okay.</ArticleParagraph>

          <section className="my-16 rounded-2xl border border-[#48D597]/30 bg-[#f4fbf7] px-7 py-10 text-center sm:px-12 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.19em] text-[#2daa77]">Metro Mutts Daycare</p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#223B4D] sm:text-3xl">What Kind of Social Dog Do You Have?</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[1.02rem] leading-relaxed text-[#223B4D]/70">
              Every dog is different. If you&apos;re curious how your pup might do at Metro Mutts, we&apos;d love to meet them and learn what kind of play they actually enjoy.
            </p>
            <Link
              href="/booking"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#48D597] px-7 py-3.5 text-sm font-bold text-[#223B4D] shadow-lg shadow-[#48D597]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#3bc085]"
            >
              Book Their First Day <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="border-t border-slate-100 pt-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#223B4D]/45">Sources &amp; further reading</h2>
            <ol className="mt-5 space-y-3 text-sm leading-6 text-[#223B4D]/60">
              <li>
                <a href="https://www.merckvetmanual.com/behavior/behavior-of-dogs/social-behavior-of-dogs" target="_blank" rel="noreferrer" className="underline decoration-[#48D597]/60 underline-offset-4 hover:text-[#223B4D]">
                  [1] Merck Veterinary Manual, “Social Behavior of Dogs”
                </a>
              </li>
              <li>
                <a href="https://bestfriends.org/pet-care-resources/dog-body-language-signs-comfort-stress-and-more" target="_blank" rel="noreferrer" className="underline decoration-[#48D597]/60 underline-offset-4 hover:text-[#223B4D]">
                  [2] Best Friends Animal Society, “Dog Body Language: Signs of Comfort, Stress, and More”
                </a>
              </li>
            </ol>
          </section>
        </article>

        <section className="border-t border-slate-100 bg-[#fafcfb] py-14 sm:py-16">
          <div className="mx-auto max-w-[760px] px-6">
            <h2 className="mb-7 text-sm font-bold uppercase tracking-[0.16em] text-[#223B4D]/45">More from the Journal</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedArticles.map((article) => (
                <Link key={article.href} href={article.href} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-5 transition-all hover:border-[#48D597]/40 hover:shadow-sm">
                  <div>
                    <h3 className="text-sm font-semibold leading-snug text-[#223B4D] transition-colors group-hover:text-[#2daa77]">{article.title}</h3>
                    <span className="mt-1 flex items-center gap-1 text-xs text-[#223B4D]/45"><Clock className="h-3 w-3" />{article.readTime}</span>
                  </div>
                  <ArrowRight className="ml-3 h-4 w-4 flex-shrink-0 text-[#223B4D]/25 transition-colors group-hover:text-[#2daa77]" />
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
