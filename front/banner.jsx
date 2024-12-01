import React from "react";
import BannerCard from "../home/BannerCard";

function Banner() {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* Partie gauche */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-5xl font-bold leading-snug text-black">
            Explorez et Participez aux <span className="text-blue-700">Meilleurs Événements</span>
          </h2>
          <p className="md:w-4/5">
            Trouvez des événements qui vous intéressent, réservez vos places et découvrez des activités près de chez vous. Rejoignez notre communauté dynamique et enrichissez votre vie sociale !
          </p>
          <div>
           
          
          </div>
        </div>
        <div> < BannerCard /></div>
      </div>
    </div>
  );
}

export default Banner;
