import { useMemo, useState } from "react";
import { CalendarDays, Info, Phone } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { trpc } from "@/lib/trpc";
import { trackPhoneCall } from "@/lib/analytics";

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

export default function BoardingAvailabilityCalendar() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  }, []);
  const [currentMonth, setCurrentMonth] = useState(() => monthStart(today));

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
      available: (date: Date) => {
        const status = statusByDate.get(dateToIso(date));
        return date >= today && (status === "available" || status === "limited");
      },
      unavailable: (date: Date) => statusByDate.get(dateToIso(date)) === "unavailable",
      past: (date: Date) => date < today,
    }),
    [statusByDate, today]
  );

  const handleMonthChange = (nextMonth: Date) => {
    setCurrentMonth(monthStart(nextMonth));
  };
  const lastBookableMonth = useMemo(
    () => new Date(today.getFullYear(), 11, 1, 12),
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
              Boarding availability at a glance.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#345460]/65">
              Green dates are available. Red dates are fully booked. It’s that simple.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-[#345460]/10 bg-white shadow-xl shadow-[#345460]/5">
            <div className="p-5 sm:p-8 lg:p-10 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-bold text-[#345460] text-lg">Live suite availability</h3>
                  <p className="text-sm text-[#345460]/50 mt-1">Availability refreshes as reservations are confirmed.</p>
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
                    month={currentMonth}
                    onMonthChange={handleMonthChange}
                    modifiers={modifiers}
                    modifiersClassNames={{
                      available: "bg-[#48D597]/20 text-[#214840] [&_button]:font-bold",
                      unavailable: "bg-red-600 text-white [&_button]:font-extrabold",
                      past: "text-[#345460]/25 [&_button]:bg-transparent",
                    }}
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
                      day_button: "pointer-events-none relative w-full h-full rounded-xl text-sm font-semibold cursor-default",
                      today: "[&_button]:ring-1 [&_button]:ring-[#345460]/30 [&_button]:ring-inset",
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
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-600" />Fully booked</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
