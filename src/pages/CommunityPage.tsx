import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { VisitorOdometer } from '../components/VisitorOdometer';
import { Guestbook } from '../components/Guestbook';
import { ShapeDivider } from '../components/ShapeDivider';
import { ChamberPortalsNav } from '../components/ChamberPortalsNav';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { Users, Award, Sparkles, Printer, Check, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playUiChime } from '../utils/soundEffects';

interface CommunityPageProps {
  isMuted: boolean;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ isMuted }) => {
  const [cadetName, setCadetName] = useState<string>('Baby Luna');
  const [cadetTitle, setCadetTitle] = useState<string>('Master of Moonbeams');
  const [constellation, setConstellation] = useState<string>('Ursa Lullaby');
  const [certificateIssued, setCertificateIssued] = useState<boolean>(false);

  const titles = [
    'Master of Moonbeams',
    'Senior Stardust Navigator',
    'Chief Cloud Cuddler',
    'Guardian of Gentle Dreams',
  ];

  const constellations = ['Ursa Lullaby', 'Cradle Nebula', 'The Slumber Ring', 'Chamomile Corona'];

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    playUiChime(isMuted);
    setCertificateIssued(true);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f5c96a', '#dba7b9', '#c7b6df', '#f4d7df'],
      });
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageTransitionWrapper pageId="community-page">
      {/* Chamber Header */}
      <PageHeader
        title="Nursery Sleep Registry & Logs"
        subtitle="Sign the international starry guestbook, view live community sleep counts, and generate an official printable Star Cadet Bedtime Certificate."
        chamberNumber="Chamber VI"
        badge="Community Slumber Archives"
        icon={<Users className="w-8 h-8 text-[#dba7b9]" />}
      />

      {/* 1. Official Star Cadet Certificate Generator */}
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-[#fff8f1] dark:bg-[#1f1b36] transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4d7df]/50 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5 text-[#f5c96a]" />
              <span>Observatory Registry Perk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
              Official Star Cadet Certificate
            </h2>
            <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] mt-1">
              Honor your little one’s brave bedtime journey with a customized keepsake certificate signed by Pip.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <form
              onSubmit={handleGenerateCertificate}
              className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] shadow-xs space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#6e544b] dark:text-[#dcd2ea] mb-1">
                  Child's or Dreamer's Name:
                </label>
                <input
                  type="text"
                  value={cadetName}
                  onChange={(e) => setCadetName(e.target.value)}
                  maxLength={30}
                  required
                  placeholder="e.g. Leo, Maya, Oliver..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#f0dfcf] dark:border-[#43395c] bg-[#fff8f1] dark:bg-[#1a1730] text-[#402c25] dark:text-[#fcf8f2] text-sm focus:outline-none focus:ring-2 focus:ring-[#f5c96a]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6e544b] dark:text-[#dcd2ea] mb-1">
                  Honorary Bedtime Rank:
                </label>
                <select
                  value={cadetTitle}
                  onChange={(e) => setCadetTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#f0dfcf] dark:border-[#43395c] bg-[#fff8f1] dark:bg-[#1a1730] text-[#402c25] dark:text-[#fcf8f2] text-sm focus:outline-none focus:ring-2 focus:ring-[#f5c96a]"
                >
                  {titles.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#6e544b] dark:text-[#dcd2ea] mb-1">
                  Guardian Constellation:
                </label>
                <select
                  value={constellation}
                  onChange={(e) => setConstellation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#f0dfcf] dark:border-[#43395c] bg-[#fff8f1] dark:bg-[#1a1730] text-[#402c25] dark:text-[#fcf8f2] text-sm focus:outline-none focus:ring-2 focus:ring-[#f5c96a]"
                >
                  {constellations.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-[#a34063] hover:bg-[#8f3454] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-[#f5c96a]" />
                <span>Update & Seal Certificate</span>
              </button>
            </form>

            {/* Certificate Display */}
            <div className="lg:col-span-7">
              <div
                id="printable-certificate"
                className="relative p-8 rounded-3xl bg-gradient-to-br from-[#fffdfa] via-[#fef7ee] to-[#fcf1d8] dark:from-[#2e264a] dark:via-[#252042] dark:to-[#1f1b36] border-4 border-double border-[#f5c96a] shadow-xl text-center overflow-hidden"
              >
                {/* Decorative border corners */}
                <div className="absolute top-2 left-2 text-[#f5c96a] text-lg">✦</div>
                <div className="absolute top-2 right-2 text-[#f5c96a] text-lg">✦</div>
                <div className="absolute bottom-2 left-2 text-[#f5c96a] text-lg">✦</div>
                <div className="absolute bottom-2 right-2 text-[#f5c96a] text-lg">✦</div>

                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#a34063] dark:text-[#dba7b9] mb-1">
                  <span>Midnight Observatory of Sector 7</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2]">
                  Certificate of Slumber Merit
                </h3>
                <p className="text-xs text-[#9c8278] dark:text-[#a69bb8] italic mt-0.5">
                  Issued under the auspices of the haX.baby Bedtime Guild
                </p>

                <div className="my-6 py-4 border-y border-[#f0dfcf] dark:border-[#43395c]">
                  <div className="text-xs text-[#6e544b] dark:text-[#dcd2ea] uppercase font-semibold">
                    This certifies that
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#a34063] dark:text-[#f5c96a] my-1">
                    {cadetName || 'Little Dreamer'}
                  </div>
                  <div className="text-xs font-semibold text-[#6e544b] dark:text-[#dcd2ea]">
                    has officially attained the honorary rank of
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#402c25] dark:text-[#fcf8f2] mt-0.5 font-sans">
                    ✨ {cadetTitle} ✨
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6e544b] dark:text-[#dcd2ea] px-4">
                  <div className="text-left">
                    <div className="text-[10px] text-[#9c8278] dark:text-[#a69bb8]">Constellation:</div>
                    <div className="font-semibold text-[#a34063] dark:text-[#dba7b9]">{constellation}</div>
                  </div>

                  {/* Golden Stardust Seal */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#f5c96a] to-[#fff] text-[#402c25] flex flex-col items-center justify-center shadow-md font-bold text-[9px] border-2 border-[#a34063]">
                    <Star className="w-4 h-4 fill-[#a34063] text-[#a34063]" />
                    <span>SEALED</span>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-[#9c8278] dark:text-[#a69bb8]">Attested by:</div>
                    <div className="font-editorial italic font-bold text-[#402c25] dark:text-white">
                      Pip the Sloth
                    </div>
                  </div>
                </div>
              </div>

              {/* Print Action */}
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-[#302847] border border-[#f0dfcf] dark:border-[#43395c] text-xs font-semibold text-[#6e544b] dark:text-[#dcd2ea] hover:text-[#a34063] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Keepsake</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waves Divider */}
      <ShapeDivider variant="waves" />

      {/* 2. Community Logs Section (Visitor Odometer + Starry Guestbook) */}
      <section
        className="py-16 md:py-24 bg-[#fff8f1] dark:bg-[#201d39] border-t border-[#f0dfcf] dark:border-[#43395c] transition-colors"
        aria-label="Nursery Sleep Logs and Guestbook"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <VisitorOdometer isMuted={isMuted} />
            <Guestbook isMuted={isMuted} />
          </div>
        </div>
      </section>

      {/* Constellations Divider */}
      <ShapeDivider variant="constellations" />

      {/* Chamber Portals Navigation */}
      <ChamberPortalsNav currentPath="/community" />
    </PageTransitionWrapper>
  );
};
