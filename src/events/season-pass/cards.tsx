import React from "react";
const cards = ["Bronze", "Silver", "Gold", "Platinum", "Ruby"];

const CardsDPS = () => {
  return (
    <div className="py-20">
      <div className="w-5/6 sm:w-4/5 text-center mx-auto">
        <h2 className="text-5xl text-warmGray-800 font-black tracking-wide">
          Season Pass DPS Cards
        </h2>
        <p className="text-xl tracking-wide my-4">
          Here are the cards for specific DPS ranks and attributes
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {cards.map((c, index) => (
            <img
              className="h-56 sm:h-64 md:h-96 w-full object-contain"
              alt={`${c} Card`}
              src={`/_events/season-pass/${c}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsDPS;
