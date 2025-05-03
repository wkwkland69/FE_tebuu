import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

interface ScannedEvent {
  id: number;
  batch: string;
  quality: string;
  waktu_scan: string;
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [scannedEvents, setScannedEvents] = useState<ScannedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/scanned')
      .then((res) => res.json())
      .then((data) => {
        console.log('Scanned events fetched:', data); // DEBUG
        setScannedEvents(data);
        setLoading(false);
      })
      .catch((e) => {
        setError('Gagal mengambil data kalender dari server');
        setLoading(false);
        console.error('Fetch error:', e); // DEBUG
      });
  }, []);

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

  // Cek event pada tanggal tertentu dari DB
  const getEventsForDate = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    // Ambil semua event pada tanggal itu
    return scannedEvents.filter((event) => event.waktu_scan.startsWith(formattedDate));
  };

  // Membagi tanggal menjadi minggu-minggu
  const getCalendarRows = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0=Sun
    const totalDays = daysInMonth;
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    // Padding awal minggu pertama
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      currentWeek.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    // Padding akhir jika minggu terakhir tidak penuh
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    return weeks;
  };

  return (
    <>
      <Breadcrumb pageName="Calendar" />

      <div className="flex items-center justify-between mb-5">
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-secondary"
          onClick={handlePreviousMonth}
        >
          Previous
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-secondary"
          onClick={handleNextMonth}
        >
          Next
        </button>
      </div>

      {loading && <div className="text-center text-blue-500">Loading data kalender...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Sun</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Mon</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Tue</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Wed</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Thu</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Fri</th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">Sat</th>
            </tr>
          </thead>
          <tbody>
            {getCalendarRows().map((week, weekIdx) => (
              <tr key={weekIdx} className="grid grid-cols-7 text-center">
                {week.map((date, idx) => {
                  if (!date) {
                    return <td key={idx} className="h-20 border border-stroke p-1 dark:border-strokedark bg-gray-100"></td>;
                  }
                  const events = getEventsForDate(date);
                  return (
                    <td
                      key={idx}
                      className={`h-20 border border-stroke p-1 text-sm align-top dark:border-strokedark relative ${
                        events.length > 0 ? 'bg-boxdark text-white' : ''
                      }`}
                    >
                      <div className="relative h-full">
                        <span className="font-semibold">{date.getDate()}</span>
                        {events.length > 0 && (
                          <div className="absolute left-0 top-6 w-full text-xs text-center bg-red-500 rounded-md p-1 overflow-y-auto max-h-12 shadow-lg">
                            {events.map((ev) => (
                              <div key={ev.id} className="mb-1 last:mb-0 break-words">
                                <span className="block">Batch: <b>{ev.batch}</b></span>
                                <span className="block">Q: <b>{ev.quality.toString()}</b></span>
                                <span className="block" style={{ fontSize: '0.7em' }}>{ev.waktu_scan.slice(11, 16)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
