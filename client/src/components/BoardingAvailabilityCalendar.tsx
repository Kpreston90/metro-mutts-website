import { useMemo, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Info, Phone } from "lucide-react";
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

function previousMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1, 12);
}

function isSameMonth(first: Date, second: Date): boolean {
  return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth();
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

  const calendarDayByDate = useMemo(
    () => new Map(data?.days.map(day => [day.date, day]) ?? []),
    [data]
  );

  const modifiers = useMemo(
    () => ({
      available: (date: Date) => {
        const status = calendarDayByDate.get(dateToIso(date))?.status;
        return date >= today && status === "available";
      },
      limited: (date: Date) =>
        date >= today && calendarDayByDate.get(dateToIso(date))?.status === "limited",
      unavailable: (date: Date) =>
        calendarDayByDate.get(dateToIso(date))?.status === "unavailable",
      past: (date: Date) => date < today,
    }),
    [calendarDayByDate, today]
  );

  const handleMonthChange = (nextMonth: Date) => {
    setCurrentMonth(monthStart(nextMonth));
  };
  const lastVisibleStartMonth = useMemo(
    () => new Date(today.getFullYear(), 10, 1, 12),
    [today]
  );
  const finalCalendarMonth = useMemo(
    () => new Date(today.getFullYear(), 11, 1, 12),
    [today]
  );
  const canGoBack = !isSameMonth(currentMonth, monthStart(today));
  const canGoForward = !isSameMonth(currentMonth, lastVisibleStartMonth);
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
              Green dates have plenty of room. Yellow dates are over 50% booked. Red dates are fully booked.
            </p>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-[#345460]/10 bg-white shadow-xl shadow-[#345460]/5">
            <div className="p-5 sm:p-8 lg:p-10 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-bold text-[#345460] text-lg">Live suite availability</h3>
                  <p className="text-sm text-[#345460]/50 mt-1">Availability refreshes as reservations are confirmed.</p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3 text-xs font-medium text-[#345460]/65">
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
                  <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-[#345460]/10 bg-[#fafaf8] p-2.5 sm:p-3">
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(previousMonthStart(currentMonth))}
                      disabled={!canGoBack}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#345460]/15 bg-white px-3.5 py-2 text-sm font-bold text-[#345460] shadow-sm transition-colors hover:bg-[#345460]/5 disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Earlier months</span>
                      <span className="sm:hidden">Back</span>
                    </button>
                    <span className="text-center text-xs font-semibold text-[#345460]/60 sm:text-sm">
                      Browse through December
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(nextMonthStart(currentMonth))}
                      disabled={!canGoForward}
                      className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#345460] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#2a4550] disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      <span className="hidden sm:inline">Later months</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <Calendar
                    month={currentMonth}
                    onMonthChange={handleMonthChange}
                    hideNavigation
                    modifiers={modifiers}
                    modifiersClassNames={{
                      available: "bg-[#48D597]/20 text-[#214840] [&_button]:font-bold",
                      limited: "bg-amber-300 text-amber-950 [&_button]:font-extrabold",
                      unavailable: "bg-red-600 text-white [&_button]:font-extrabold",
                      past: "text-[#345460]/25 [&_button]:bg-transparent",
                    }}
                    formatters={{
                      formatWeekdayName: date =>
                        new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date),
                    }}
                    numberOfMonths={2}
                    startMonth={monthStart(today)}
                    endMonth={finalCalendarMonth}
                    showOutsideDays={false}
                    className="w-full p-0"
                    classNames={{
                      root: "!w-full",
                      months: "flex !w-full flex-col gap-8 md:flex-row md:gap-6",
                      month: "flex !w-full min-w-0 flex-1 flex-col gap-4",
                      table: "!w-full table-fixed border-separate border-spacing-1 sm:border-spacing-1.5",
                      weekdays: "table-row",
                      weekday: "h-8 w-[14.285%] p-0 text-center align-middle text-[0.7rem] font-extrabold text-[#345460]/70 sm:text-xs",
                      week: "table-row",
                      day: "h-12 w-[14.285%] text-center sm:h-14",
                      day_button: "group relative h-full w-full cursor-help rounded-xl text-sm font-semibold",
                      today: "[&_button]:ring-1 [&_button]:ring-[#345460]/30 [&_button]:ring-inset",
                      outside: "invisible",
                      month_caption: "h-9 flex items-center justify-center text-base font-bold text-[#345460]",
                    }}
                    components={{
                      DayButton: ({ day, className, ...buttonProps }) => {
                        const calendarDay = calendarDayByDate.get(dateToIso(day.date));
                        const isCurrentOrFuture = day.date >= today;
                        const bookedSummary = calendarDay
                          ? `${calendarDay.booked} of ${calendarDay.capacity} suites booked`
                          : "Availability is not shown for past dates";
                        const statusLabel =
                          calendarDay?.status === "unavailable"
                            ? "Fully booked"
                            : calendarDay?.status === "limited"
                              ? "Over 50% booked"
                              : "Available";

                        return (
                          <button
                            {...buttonProps}
                            type="button"
                            className={className}
                            title={isCurrentOrFuture ? bookedSummary : "Past date"}
                            aria-label={`${day.date.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}: ${isCurrentOrFuture ? `${bookedSummary}, ${statusLabel}` : "past date"}`}
                          >
                            {day.date.getDate()}
                            {isCurrentOrFuture && calendarDay ? (
                              <span
                                role="tooltip"
                                className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-20 w-max max-w-[11rem] -translate-x-1/2 rounded-lg bg-[#1a2e38] px-2.5 py-1.5 text-center text-[0.68rem] font-semibold leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                              >
                                {bookedSummary}
                              </span>
                            ) : null}
                          </button>
                        );
                      },
                    }}
                  />

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-xs font-semibold text-[#345460]/65">
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#48D597]" />Available</span>
                    <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-300" />Over 50% booked</span>
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
