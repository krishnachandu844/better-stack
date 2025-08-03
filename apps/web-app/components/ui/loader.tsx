const Loader = () => {
  return (
    <div className='p-8 text-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4'></div>
      <p className='text-gray-400'>Loading monitoring data...</p>
    </div>
  );
};

export default Loader;
