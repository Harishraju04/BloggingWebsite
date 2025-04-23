type QuoteProps = {
    quote:string;
}

export const Quote = () => {
    return (
      <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="max-w-xl ">
          <div className="text-2xl font-bold  text-4xl text-gray-800 ">
            "The customer support I received was exceptional. The support team went above and beyond to address my concerns."
          </div>
          <div className="text-xl text-left font-medium font-semibold text-gray-700 pt-3 mt-3"> — Julies Winfield</div>
          <p className="text-sm text-left font-small text-gray-700">CEO | Acme crop</p>
        </div>
      </div>
    );
  };
  