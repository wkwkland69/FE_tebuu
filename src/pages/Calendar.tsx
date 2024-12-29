import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // Event list
  const events = [
    { date: '2024-09-27', title: 'Overview topik dan judul...' },
    { date: '2024-11-19', title: 'Bimbingan ke-4 di ruangan...' },
    { date: '2024-12-05', title: 'Integrasi model ML dengan...' },
    { date: '2024-11-04', title: 'Bimbingan terkait RTSP...' },
    { date: '2024-10-17', title: 'Bimbingan rutin dan...' },
    { date: '2024-12-20', title: 'Finalisasi laporan...' },
  ];

  // Check if a date has an event
  const getEventForDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return events.find((event) => event.date === formattedDate);
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
            <tr className="grid grid-cols-7 text-center">
              {[...Array(daysInMonth)].map((_, index) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
                const event = getEventForDate(date);
                return (
                  <td
                    key={index}
                    className={`h-20 border border-stroke p-1 text-sm dark:border-strokedark ${
                      event ? 'bg-secondary text-white' : ''
                    }`}
                  >
                    <div className="relative">
                      <span>{index + 1}</span>
                      {event && (
                        <div className="absolute top-0 left-0 w-full text-xs text-center text-white bg-red-500 rounded-md">
                          {event.title}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
