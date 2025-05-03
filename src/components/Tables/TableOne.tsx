import React, { useEffect, useState } from 'react';

// Tipe data leaderboard
interface LeaderboardDriver {
  nama_supir: string;
  plat_nomor: string;
  total_tebu: number;
}

const TableOne = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardDriver[]>([]);

  useEffect(() => {
    const fetchLeaderboard = () => {
      fetch('/api/leaderboard')
        .then((res) => res.json())
        .then((data) => {
          // Gabungkan driver yang sama (berdasarkan nama_supir)
          const merged = Object.values(
            data.reduce((acc: any, curr: LeaderboardDriver) => {
              if (!acc[curr.nama_supir]) {
                acc[curr.nama_supir] = { ...curr };
              } else {
                acc[curr.nama_supir].total_tebu += curr.total_tebu;
                // Jika plat_nomor berbeda, bisa ditampilkan semua (opsional)
                if (!acc[curr.nama_supir].plat_nomor.includes(curr.plat_nomor)) {
                  acc[curr.nama_supir].plat_nomor += `, ${curr.plat_nomor}`;
                }
              }
              return acc;
            }, {})
          ) as LeaderboardDriver[];
          setLeaderboard(merged);
        })
        .catch(() => {
          setLeaderboard([
            { nama_supir: 'Budi', plat_nomor: 'AB1234CD', total_tebu: 20000 },
            { nama_supir: 'Andi', plat_nomor: 'AB5678EF', total_tebu: 15000 },
            { nama_supir: 'Dewi', plat_nomor: 'AB2222IJ', total_tebu: 17000 },
            { nama_supir: 'Cici', plat_nomor: 'AB1111GH', total_tebu: 10000 },
          ]);
        });
    };
    fetchLeaderboard(); // initial fetch
    const interval = setInterval(fetchLeaderboard, 5000); // fetch setiap 5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Top Channels
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Weight
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenues
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Sales
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Driver
            </h5>
          </div>
        </div>
        {leaderboard.map((driver, idx) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              idx === leaderboard.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={driver.nama_supir}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              {/* Source: Nama Supir */}
              <p className="text-black dark:text-white font-medium">{driver.nama_supir}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {/* Weight: Total Tebu */}
              <span className="text-red-500">{driver.total_tebu.toLocaleString()} KG</span>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {/* Revenues: Plat Nomor */}
              <p className="text-meta-3">{driver.plat_nomor}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {/* Sales: Kosongkan/opsional */}
              <p className="text-black dark:text-white">-</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {/* Driver: Nama Supir */}
              <p className="text-blue-500 dark:text-blue-300">{driver.nama_supir}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
