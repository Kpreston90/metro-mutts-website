import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Check, Clock3, ExternalLink, Info, Moon, Phone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { trpc } from "@/lib/trpc";
import { trackCTA, trackPhoneCall } from "@/lib/analytics";

const GINGR_LOGIN = "https://metromutts.portal.gingrapp.com";
const GINGR_SIGNUP = "https://metromutts.portal.gingrapp.com/#/public/new_customer";

type AvailabilityStatus = "available" | "limited" | "unavailable";

function dateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isoToDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

function daysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function nextMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1, 12);
}

function formatStayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function addDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function getNights(range: DateRange): number {
  if (!range.from || !range.to) return 0;
  return Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000);
}

function isStayAvailable(range: DateRange, statuses: Map<string, AvailabilityStatus>): boolean {
  if (!range.from || !range.to) return true;

  const nights = getNights(range);
  return Array.from({ length: nights }, (_, index) => {
    const status = statuses.get(dateToIso(addDays(range.from!, index)));
    return status === "available" || status === "limited";
  }).every(Boolean);
}

const statusClasses: Record<AvailabilityStatus, string> = {
  available: "bg-[#48D597]/10 text-[#345460] hover:bg-[#48D597]/20",
  limited: "bg-amber-50 text-amber-900 hover:bg-amber-100",
  unavailable: "bg-slate-100 text-slate-400 line-through",
};

export default function BoardingAvailabilityCalendar() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  }, []);
  const [currentMonth, setCurrentMonth] = useState(() => monthStart(today));
  const [stay, setStay] = useState<DateRange | undefined>();
  const [selectionNote, setSelectionNote] = useState<string | null>(null);

  const currentMonthStart = dateToIso(currentMonth);
  const calendarRequest = useMemo(() => {
    const nextMonth = nextMonthStart(currentMonth);
    return {
      startDate: currentMonthStart,
      days: daysInMonth(currentMonth) + daysInMonth(nextMonth),
    };
  }, [currentMonthStart, currentMonth]);
  const { data, isLoading, isFetching, error } = trpc.availability.boardingCalendar.useQuery(
    calendarRequest,
    {
      staleTime: 2 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: true,
    }
  );

  const statusByDate = useMemo(
    () => new Map(data?.days.map(day => [day.date, day.status]) ?? []),
    [data]
  );

  const modifiers = useMemo(
    () => ({
      available: (date: Date) => statusByDate.get(dateToIso(date)) === "available",
      limited: (date: Date) => statusByDate.get(dateToIso(date)) === "limited",
      unavailable: (date: Date) => statusByDate.get(dateToIso(date)) === "unavailable",
    }),
    [statusByDate]
  );

  const isPastOrUnavailable = (date: Date) => {
    const status = statusByDate.get(dateToIso(date));
    return date < today || status === "unavailable";
  };

  const handleSelect = (nextStay: DateRange | undefined) => {
    if (!nextStay?.from || !nextStay.to || nextStay.to <= nextStay.from) {
      setStay(nextStay);
      setSelectionNote(null);
      return;
    }

    if (!isStayAvailable(nextStay, statusByDate)) {
      setSelectionNote("One or more nights in that stay are unavailable. Please choose different dates.");
      setStay({ from: nextStay.from });
      return;
    }

    setSelectionNote(null);
    setStay(nextStay);
  };

  const handleMonthChange = (nextMonth: Date) => {
    setCurrentMonth(monthStart(nextMonth));
    setStay(undefined);
    setSelectionNote(null);
  };

  const hasCompleteStay = Boolean(stay?.from && stay?.to && getNights(stay) > 0);
  const nights = stay ? getNights(stay) : 0;
  const lastBookableMonth = useMemo(
    () => new Date(today.getFullYear() + 1, today.getMonth(), 1, 12),
    [today]
  );
  const formattedUpdated = data
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(
        new Date(data.lastUpdated)
      )
    : null;

  return (
    <section id="boarding-availability" className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#48D597]/10 text-[#277d58] text-sm font-bold tracking-wide uppercase">
              <CalendarDays className="w-4 h-4" />
              Live Gingr availability
            </span>
            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#345460]">
              Find a cozy suite for their next stay.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#345460]/65">
              Select your check-in and check-out dates to view current boarding availability. We show only live results from Gingr — never estimates.
            </p>
          </div>

          <div className="grid 2xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.68fr)] rounded-[2rem] overflow-hidden border border-[#345460]/10 bg-[#fafaf8] shadow-xl shadow-[#345460]/5">
            <div className="p-5 sm:p-8 lg:p-10 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-bold text-[#345460] text-lg">Choose your stay dates</h3>
                  <p className="text-sm text-[#345460]/50 mt-1">Availability changes as reservations are confirmed.</p>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-[#345460]/65">
                  {isFetching && !isLoading ? <span>Refreshing…</span> : null}
                  {formattedUpdated ? <span>Updated from Gingr at {formattedUpdated}</span> : null}
                </div>
              </div>

              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 w-48 bg-[#345460]/8 rounded-lg mb-6" />
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, index) => (
                      <div key={index} className="aspect-square rounded-xl bg-[#345460]/6" />
                    ))}
                  </div>
                </div>
              ) : error || !data ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 mt-0.5 text-amber-700 shrink-0" />
                    <div>
                      <h4 className="font-bold text-amber-900">Live availability is temporarily unavailable.</h4>
                      <p className="mt-2 text-sm leading-relaxed text-amber-900/75">
                        We can't confirm suite inventory right now, so we won't display a guess. Please call or text our team and we'll check Gingr for you.
                      </p>
                      <a
                        href="tel:5398673841"
                        onClick={() => trackPhoneCall("boarding_calendar_unavailable")}
                        className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-amber-900 underline underline-offset-4"
                      >
                        <Phone className="w-4 h-4" />
                        Call 539-867-3841
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Calendar
                    mode="range"
                    month={currentMonth}
                    onMonthChange={handleMonthChange}
                    selected={stay}
                    onSelect={handleSelect}
                    disabled={isPastOrUnavailable}
                    modifiers={modifiers}
                    modifiersClassNames={statusClasses}
                    numberOfMonths={2}
                    startMonth={monthStart(today)}
                    endMonth={lastBookableMonth}
                    showOutsideDays={false}
                    className="w-full p-0"
                    classNames={{
                      root: "w-full",
                      months: "flex flex-col gap-8 w-full md:flex-row md:gap-6",
                      month: "w-full gap-4",
                      table: "w-full border-separate border-spacing-1 sm:border-spacing-1.5",
                      weekday: "w-[14.285%] text-center text-[0.68rem] font-bold uppercase tracking-wider text-[#345460]/35",
                      week: "w-full mt-1.5",
                      day: "w-[14.285%] h-11 sm:h-13 text-center",
                      day_button: "relative w-full h-full rounded-xl text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#48D597]",
                      selected: "bg-[#48D597] text-[#153d3a] rounded-xl [&_button]:text-[#153d3a] [&_button]:font-bold",
                      range_middle: "bg-[#48D597]/20 rounded-none",
                      range_start: "bg-[#48D597] rounded-l-xl",
                      range_end: "bg-[#48D597] rounded-r-xl",
                      today: "[&_button]:ring-1 [&_button]:ring-[#345460]/30 [&_button]:ring-inset",
                      disabled: "opacity-45 cursor-not-allowed",
                      outside: "invisible",
                      nav: "flex items-center justify-between absolute inset-x-0 top-0",
                      button_previous: "h-9 w-9 rounded-full text-[#345460] hover:bg-[#345460]/5",
                      button_next: "h-9 w-9 rounded-full text-[#345460] hover:bg-[#345460]/5",
                      month_caption: "h-9 flex items-center justify-center text-base font-bold text-[#345460]",
                    }}
                    components={{
                      Chevron: ({ orientation, className }) =>
                        orientation === "left" ? <span className={className}>‹</span> : <span className={className}>›</span>,
                    }}
                  />

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-xs font-semibold text-[#345460]/65">
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#48D597]" />Available</span>
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" />Limited availability</span>
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300" />Unavailable</span>
                  </div>

                  {selectionNote ? (
                    <p role="alert" className="mt-5 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                      {selectionNote}
                    </p>
                  ) : null}
                </>
              )}
            </div>

            <aside className="relative overflow-hidden bg-[#345460] p-7 sm:p-9 lg:p-10 text-white">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#48D597]/10" />
              <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full border-[24px] border-white/5 rounded-full" />
              <div className="relative h-full flex flex-col">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#48D597]/15 text-[#48D597]">
                  <Moon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight">Plan their stay</h3>

                {hasCompleteStay && stay?.from && stay.to ? (
                  <div className="mt-6 rounded-2xl border border-[#48D597]/30 bg-white/8 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#48D597]">Your selected stay</p>
                    <p className="mt-3 font-bold leading-relaxed">{formatStayDate(stay.from)} → {formatStayDate(stay.to)}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-white/65"><Clock3 className="w-4 h-4" />{nights} {nights === 1 ? "night" : "nights"}</p>
                    <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#72e4b0]"><Check className="w-4 h-4" />Dates currently available</p>
                    <p className="mt-3 text-xs leading-relaxed text-white/55">Keep these dates handy — Gingr will ask you to enter them again when you submit the request.</p>
                  </div>
                ) : (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="font-semibold text-white">Start with a check-in date.</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">Then select the day your dog will head home. We’ll check every night in between.</p>
                  </div>
                )}

                <div className="mt-auto pt-8">
                  <a
                    href={GINGR_LOGIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTA("boarding_calendar_continue_to_gingr")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#48D597] px-5 py-3.5 font-bold text-[#153d3a] shadow-lg shadow-black/15 transition-all hover:-translate-y-0.5 hover:bg-[#62df9f]"
                  >
                    Continue to Gingr booking
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={GINGR_SIGNUP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackCTA("boarding_calendar_new_customer")}
                    className="mt-4 block text-center text-sm font-semibold text-white/65 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
                  >
                    New to Metro Mutts? Create an account
                  </a>
                  <p className="mt-6 text-center text-xs leading-relaxed text-white/45">
                    Availability refreshes from Gingr. You’ll select your dog and re-enter your dates in Gingr, where your request is confirmed.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
