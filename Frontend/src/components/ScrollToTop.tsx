const ScrollToTop = () => {
  return (
    <>
      {/* CRM Software Button - Bottom Right */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-yellow-300 text-blue-950 px-5 py-3 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold hover:bg-yellow-200"
        onClick={() => window.open('https://your-crm-software.com', '_blank')}
      >
        CRM Software
      </button>
    </>
  );
};

export default ScrollToTop;
