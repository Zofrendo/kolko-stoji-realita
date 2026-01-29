"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Region = "bratislava" | "zapad" | "stred" | "vychod";
type Housing = "najom" | "hypoteka" | "rodicia";

const regionLabels: Record<Region, string> = {
  bratislava: "Bratislava",
  zapad: "Západ SR",
  stred: "Stred SR",
  vychod: "Východ SR",
};

const housingLabels: Record<Housing, string> = {
  najom: "Nájom",
  hypoteka: "Hypotéka",
  rodicia: "Bývam u rodičov",
};

const regionMultipliers: Record<Region, number> = {
  bratislava: 1.3,
  zapad: 1.1,
  stred: 1.0,
  vychod: 0.9,
};

const housingCosts: Record<Housing, number> = {
  najom: 400,
  hypoteka: 300,
  rodicia: 0,
};

const BASE_COST = 700;
const CHILD_COST = 250;
const CAR_COST = 200;

function calculateCost(
  region: Region,
  housing: Housing,
  children: number,
  hasCar: boolean
): number {
  const baseCost = BASE_COST * regionMultipliers[region];
  const housingCost = housingCosts[housing];
  const childrenCost = children * CHILD_COST;
  const carCost = hasCar ? CAR_COST : 0;

  return Math.round(baseCost + housingCost + childrenCost + carCost);
}

function getContextMessage(cost: number): string {
  if (cost < 1200) {
    return "Žiješ veľmi skromne. Väčšina ľudí by to nezvládla.";
  } else if (cost <= 1600) {
    return "Toto je realita väčšiny rodín na Slovensku.";
  } else {
    return "O tejto realite sa veľmi nahlas nehovorí.";
  }
}

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function Home() {
  const [region, setRegion] = useState<Region>("bratislava");
  const [housing, setHousing] = useState<Housing>("najom");
  const [children, setChildren] = useState<number>(0);
  const [hasCar, setHasCar] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  const handleCalculate = useCallback(() => {
    const cost = calculateCost(region, housing, children, hasCar);
    setResult(cost);
    setShowResult(true);

    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [region, housing, children, hasCar]);

  const handleRegionChange = useCallback((newRegion: Region) => {
    setRegion(newRegion);
    if (showResult) {
      const cost = calculateCost(newRegion, housing, children, hasCar);
      setResult(cost);
    }
  }, [showResult, housing, children, hasCar]);

  const handleShare = useCallback(async () => {
    const shareText = `Moje reálne mesačné náklady na život: ${formatNumber(result)} €. A aké sú tvoje?\n\nKoľko stojí realita života na Slovensku?`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Koľko stojí realita",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
      window.open(fbUrl, "_blank", "width=600,height=400");
    }
  }, [result]);

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Header - Project Name */}
      <header className="pt-10 md:pt-12 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <span className="w-8 h-[1px] bg-gray-300" />
          <p className="text-center text-xs font-medium text-gray-500 tracking-[0.2em] uppercase">
            Koľko stojí realita
          </p>
          <span className="w-8 h-[1px] bg-gray-300" />
        </motion.div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-10 md:pt-14 pb-14 md:pb-20 max-w-2xl lg:max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-center text-[#111] leading-[1.15] tracking-[-0.02em]"
        >
          Koľko ťa reálne stojí
          <br />
          <span className="text-gray-400">život na Slovensku?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center text-gray-500 mt-6 md:mt-8 text-lg md:text-xl font-medium"
        >
          4 otázky. 30 sekúnd. Realita.
        </motion.p>
      </section>

      {/* Calculator */}
      <section className="px-4 pb-16 md:pb-20 max-w-xl lg:max-w-2xl mx-auto">
        <div className="space-y-6 md:space-y-7">
          {/* Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100/80"
          >
            <label className="block text-sm font-semibold text-gray-600 mb-4">
              Kde žiješ?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(regionLabels) as Region[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionChange(r)}
                  className={`py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                    region === r
                      ? "bg-[#111] text-white shadow-lg shadow-gray-900/10"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {regionLabels[r]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Housing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100/80"
          >
            <label className="block text-sm font-semibold text-gray-600 mb-4">
              Ako bývaš?
            </label>
            <div className="space-y-3">
              {(Object.keys(housingLabels) as Housing[]).map((h) => (
                <button
                  key={h}
                  onClick={() => setHousing(h)}
                  className={`w-full py-4 px-5 rounded-xl text-sm font-medium transition-all duration-200 text-left hover:scale-[1.01] ${
                    housing === h
                      ? "bg-[#111] text-white shadow-lg shadow-gray-900/10"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {housingLabels[h]}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Children */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100/80"
          >
            <label className="block text-sm font-semibold text-gray-600 mb-4">
              Počet detí
            </label>
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setChildren(num)}
                    className={`w-14 h-14 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.05] ${
                      children === num
                        ? "bg-[#111] text-white shadow-lg shadow-gray-900/10"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {num === 3 ? "3+" : num}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Car */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100/80"
          >
            <label className="block text-sm font-semibold text-gray-600 mb-4">
              Máš auto?
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setHasCar(false)}
                className={`flex-1 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                  !hasCar
                    ? "bg-[#111] text-white shadow-lg shadow-gray-900/10"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Nie
              </button>
              <button
                onClick={() => setHasCar(true)}
                className={`flex-1 py-4 px-4 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                  hasCar
                    ? "bg-[#111] text-white shadow-lg shadow-gray-900/10"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Áno
              </button>
            </div>
          </motion.div>

          {/* Calculate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="pt-2"
          >
            <button
              onClick={handleCalculate}
              className="w-full py-5 bg-[#111] text-white rounded-2xl text-lg font-semibold hover:bg-black transition-all duration-250 shadow-lg shadow-gray-900/15 hover:shadow-xl hover:shadow-gray-900/20 hover:scale-[1.01] active:scale-[0.99]"
            >
              Vypočítať
            </button>
          </motion.div>
        </div>
      </section>

      {/* Result */}
      <AnimatePresence mode="wait">
        {showResult && (
          <motion.section
            id="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white"
          >
            {/* Result Number Section */}
            <div className="px-4 pt-16 md:pt-20 pb-12 md:pb-16 border-t border-gray-100">
              <div className="max-w-xl lg:max-w-2xl mx-auto text-center">
                <motion.div
                  key={result}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                >
                  <p className="text-xs font-semibold text-gray-400 mb-3 tracking-[0.15em] uppercase">
                    Tvoje mesačné náklady
                  </p>
                  <p className="text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold text-[#111] tracking-tighter">
                    {formatNumber(result)} €
                  </p>
                  <p className="text-sm font-semibold text-gray-400 mt-2 tracking-wide">
                    / mesiac
                  </p>
                  <p className="text-gray-500 mt-8 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
                    Reálny mesačný náklad na dôstojný život na Slovensku
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Emotional Message Card */}
            <div className="px-4 pb-10 md:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl lg:max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 rounded-3xl p-8 md:p-10 border border-gray-100">
                  <p className="text-xl sm:text-2xl md:text-[1.75rem] font-semibold text-gray-800 leading-relaxed md:leading-[1.4]">
                    Ak ti toto vyšlo podobne, nie si problém ty.
                  </p>
                  <p className="text-xl sm:text-2xl md:text-[1.75rem] font-bold text-[#111] mt-2">
                    Toto je realita.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Context Message */}
            <motion.div
              key={`context-${result}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="px-4 pb-10 md:pb-12"
            >
              <p className="text-center text-lg md:text-xl text-gray-600 font-medium max-w-md mx-auto">
                {getContextMessage(result)}
              </p>
            </motion.div>

            {/* Social FOMO */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="px-4 pb-12 md:pb-14"
            >
              <div className="max-w-xl lg:max-w-2xl mx-auto">
                <div className="border border-gray-200 rounded-2xl p-6 md:p-7 bg-white">
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center">
                    Toto si dnes vypočítali <span className="font-bold text-gray-800">stovky ľudí</span>.
                    <br />
                    <span className="text-gray-500">Väčšina z nich bola prekvapená.</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Zone */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="bg-gradient-to-b from-blue-50/50 to-blue-50/80 border-t border-blue-100/50"
            >
              <div className="px-4 py-12 md:py-14">
                <div className="max-w-xl lg:max-w-2xl mx-auto text-center">
                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    className="w-full max-w-md mx-auto py-5 bg-blue-600 text-white rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-all duration-250 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Zdieľať túto realitu
                  </button>
                  <p className="mt-5 text-base text-gray-600 font-medium">
                    Porovnaj sa s ostatnými.
                  </p>

                  {/* Repeat Mechanic */}
                  <div className="mt-10 pt-8 border-t border-blue-100/80">
                    <p className="text-base text-gray-600 font-medium mb-5">
                      Čo keby som žil v inom kraji?
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {(Object.keys(regionLabels) as Region[])
                        .filter((r) => r !== region)
                        .map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRegionChange(r)}
                            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-[#111] bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:scale-[1.02]"
                          >
                            {regionLabels[r]}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="px-4 py-10 md:py-12 bg-white border-t border-gray-100"
            >
              <p className="text-center text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                Toto nie je oficiálna štatistika.
                <br />
                Ide o realistický odhad založený na bežných životných nákladoch.
              </p>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-4 text-center bg-[#fafafa]">
        <p className="text-xs text-gray-400 font-medium">
          {new Date().getFullYear()} Koľko stojí realita
        </p>
      </footer>
    </main>
  );
}
