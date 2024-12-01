import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const Camera = () => {
  return (
    <>
      <Breadcrumb pageName="Camera Selection" />

      {/* <!-- ====== Camera Section Start ====== --> */}
      <div className="flex flex-col min-h-screen px-4 pb-20">
        {/* Konten utama kamera */}
        <div className="flex justify-between space-x-4 mb-8">
          {/* Camera 1 */}
          <div className="w-1/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Camera 1
              </h3>
            </div>
          </div>

          {/* Camera 2 */}
          <div className="w-1/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Camera 2
              </h3>
            </div>
          </div>

          {/* Camera 3 */}
          <div className="w-1/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Camera 3
              </h3>
            </div>
          </div>

          {/* Camera 4 */}
          <div className="w-1/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Camera 4
              </h3>
            </div>
          </div>
        </div>

        {/* Input Kamera dan Tombol */}
        <div className="flex flex-col mt-8 space-y-6">
          {/* Input Camera */}
          <div>
            <label
              htmlFor="cameraInput"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Input Camera Name
            </label>
            <input
              type="text"
              id="cameraInput"
              className="w-full rounded-lg border border-stroke py-3 px-4 bg-transparent text-black dark:border-form-strokedark dark:bg-form-input dark:text-white outline-none focus:border-primary dark:focus:border-primary"
              placeholder="Enter camera name"
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-between space-x-4">
            <button className="w-1/3 rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 transition">
              Button 1
            </button>
            <button className="w-1/3 rounded-lg bg-green-500 p-4 text-white hover:bg-green-600 transition">
              Button 2
            </button>
            <button className="w-1/3 rounded-lg bg-red-500 p-4 text-white hover:bg-red-600 transition">
              Button 3
            </button>
          </div>
        </div>

        {/* Spasi fleksibel untuk mengisi sampai bawah */}
        <div className="flex-grow"></div>
      </div>

      {/* <!-- ====== Camera Section End ====== --> */}
    </>
  );
};

export default Camera;
