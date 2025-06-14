import React, { useEffect, useState } from 'react';

type ScannedLog = {
  id: number;
  batch: string;
  quality: string;
  waktu_scan: string;
};

const TableThree = () => {
  const [logs, setLogs] = useState<ScannedLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/scanned')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: ScannedLog[]) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Gagal mengambil data log history');
        setLoading(false);
      });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Log History
        </h4>
      </div>
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <div className="py-4 px-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 px-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Batch
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Quality
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                  Waktu Scan
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <span className="font-medium text-black dark:text-white">{log.batch}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="text-black dark:text-white">{log.quality}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="text-black dark:text-white">{log.waktu_scan}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">SCANNED</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableThree;
