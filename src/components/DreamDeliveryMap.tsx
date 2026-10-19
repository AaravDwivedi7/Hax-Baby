import React, { useState } from 'react';
import { Send, MapPin, Wind, Sparkles, CheckCircle2 } from 'lucide-react';
import { DELIVERY_ROUTES, DeliveryDestination } from '../utils/dreamLogic';
import { playUiChime, playMagicChime } from '../utils/soundEffects';

interface DreamDeliveryMapProps {
  isMuted: boolean;
}

export const DreamDeliveryMap: React.FC<DreamDeliveryMapProps> = ({ isMuted }) => {
  const [selectedDestId, setSelectedDestId] = useState<string>('bramble-cottage');
  const [isDelivering, setIsDelivering] = useState<boolean>(false);
  const [deliveryProgress, setDeliveryProgress] = useState<number>(0);
  const [deliveredCount, setDeliveredCount] = useState<number>(1);

  const selectedDestination: DeliveryDestination =
    DELIVERY_ROUTES.find((d) => d.id === selectedDestId) || DELIVERY_ROUTES[0];

  const handleSelect = (id: string) => {
    playUiChime(isMuted);
    setSelectedDestId(id);
  };

  const dispatchDream = () => {
    if (isDelivering) return;
    playMagicChime(isMuted);
    setIsDelivering(true);
    setDeliveryProgress(0);

    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDelivering(false);
          setDeliveredCount((c) => c + 1);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  return (
    <div
      id="dream-delivery"
      className="bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex flex-col justify-between transition-colors relative overflow-hidden"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5c96a]" aria-hidden="true"></span>
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Project 03 · Aerial Navigation
            </span>
          </div>
          <span className="text-xs font-mono text-[#9c8278] dark:text-[#a69bb8]">
            5 Rooftop Waypoints
          </span>
        </div>

        <h3 className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          Dream Delivery Routes
        </h3>
        <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Every dream has somewhere to be. Pip finds the quietest path across the rooftops.
        </p>

        {/* Illustrated SVG Map Container */}
        <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#201d39] to-[#302847] rounded-2xl overflow-hidden border border-[#43395c] mb-6 p-2 flex items-center justify-center">
          {/* Subtle starry sky backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <span className="absolute top-4 left-6 text-xs text-[#f5c96a]">✦</span>
            <span className="absolute top-12 right-10 text-xs text-[#dba7b9]">✧</span>
            <span className="absolute bottom-6 left-16 text-xs text-[#c7b6df]">✦</span>
            <span className="absolute bottom-12 right-24 text-xs text-[#f5c96a]">✧</span>
          </div>

          <svg
            viewBox="0 0 500 310"
            className="w-full h-full"
            role="img"
            aria-label="Fictional neighborhood rooftop delivery map"
          >
            <defs>
              {/* Route dash line gradient */}
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5c96a" />
                <stop offset="50%" stopColor="#dba7b9" />
                <stop offset="100%" stopColor="#c7b6df" />
              </linearGradient>

              {/* Waypoint glow filter */}
              <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Fictional Rooftop Silhouettes */}
            <path
              d="M0 310 L0 250 L40 230 L80 250 L140 200 L180 240 L220 180 L280 250 L340 210 L390 260 L450 190 L500 240 L500 310 Z"
              fill="#181428"
              opacity="0.85"
            />
            {/* Chimneys and chimney smoke */}
            <rect x="75" y="220" width="14" height="24" fill="#251f38" />
            <path d="M82 218 Q75 195 85 175" stroke="#dba7b9" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="3 3" />
            <rect x="215" y="160" width="16" height="30" fill="#251f38" />
            <path d="M223 158 Q235 135 220 115" stroke="#c7b6df" strokeWidth="1.5" fill="none" opacity="0.35" strokeDasharray="3 3" />

            {/* Flight Path Connecting Waypoints */}
            <path
              d="M 90 108 Q 160 80 240 62 T 375 161 T 170 223 T 425 86"
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity="0.75"
            />

            {/* Active Delivery Progress Indicator (Pip on his little cloud) */}
            {isDelivering && (
              <g
                transform={`translate(${
                  90 + ((selectedDestination.x * 5 - 90) * deliveryProgress) / 100
                }, ${108 + ((selectedDestination.y * 3.1 - 108) * deliveryProgress) / 100})`}
              >
                <circle r="12" fill="#f5c96a" opacity="0.3" filter="url(#starGlow)" />
                <circle r="7" fill="#fff8f1" />
                <text x="-4" y="3" fontSize="8" fill="#a34063">
                  ☁
                </text>
              </g>
            )}

            {/* Destination Markers */}
            {DELIVERY_ROUTES.map((dest) => {
              const cx = dest.x * 5;
              const cy = dest.y * 3.1;
              const isSelected = selectedDestId === dest.id;

              return (
                <g
                  key={dest.id}
                  onClick={() => handleSelect(dest.id)}
                  className="cursor-pointer group"
                  tabIndex={0}
                  role="button"
                  aria-label={`Select destination: ${dest.name}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(dest.id);
                    }
                  }}
                >
                  {/* Outer pulse when selected */}
                  {isSelected && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r="16"
                      fill="none"
                      stroke="#f5c96a"
                      strokeWidth="1.5"
                      opacity="0.8"
                      className="animate-ping"
                    />
                  )}

                  {/* Node Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? '#f5c96a' : '#fff8f1'}
                    stroke={isSelected ? '#a34063' : '#c7b6df'}
                    strokeWidth="2.5"
                    filter="url(#starGlow)"
                  />

                  {/* Marker Star */}
                  <text
                    x={cx - 3.5}
                    y={cy + 3.5}
                    fontSize="9"
                    fill={isSelected ? '#5c4033' : '#a34063'}
                    fontWeight="bold"
                  >
                    ✦
                  </text>

                  {/* Label */}
                  <text
                    x={cx}
                    y={cy - 12}
                    textAnchor="middle"
                    fill={isSelected ? '#f5c96a' : '#dcd2ea'}
                    fontSize="9"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    className="select-none pointer-events-none transition-colors"
                  >
                    {dest.occupant.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick HUD badge */}
          <div className="absolute top-3 left-3 bg-[#181428]/85 backdrop-blur-xs py-1 px-2.5 rounded-lg border border-[#43395c] text-[11px] text-[#f5c96a] flex items-center gap-1.5">
            <Wind className="w-3 h-3" />
            <span>Draft: 0 km/h · Clear Night Skies</span>
          </div>
        </div>

        {/* Selected Destination Details */}
        <div className="p-4 rounded-2xl bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] space-y-2 mb-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a]" aria-hidden="true" />
              <h4 className="text-sm font-bold text-[#402c25] dark:text-[#fcf8f2]">
                {selectedDestination.name}
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#9c8278] dark:text-[#a69bb8]">
              {selectedDestination.altitude}
            </span>
          </div>

          <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea]">
            <strong className="text-[#402c25] dark:text-[#fcf8f2]">Occupant: </strong>
            {selectedDestination.occupant}
          </p>

          <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea]">
            <strong className="text-[#402c25] dark:text-[#fcf8f2]">Dream Package: </strong>
            {selectedDestination.dreamType}
          </p>

          <p className="text-xs text-[#5c4033] dark:text-[#dcd2ea] italic pt-1 border-t border-[#f0dfcf] dark:border-[#43395c]">
            {selectedDestination.story}
          </p>
        </div>
      </div>

      {/* Dispatch Action Button */}
      <button
        onClick={dispatchDream}
        disabled={isDelivering}
        aria-label={`Dispatch dream package to ${selectedDestination.occupant}`}
        className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white transition-all flex items-center justify-center gap-2 shadow-md ${
          isDelivering
            ? 'bg-[#5c4033] cursor-wait'
            : 'bg-[#a34063] hover:bg-[#8f3454] active:scale-[0.99]'
        }`}
      >
        {isDelivering ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin text-[#f5c96a]" aria-hidden="true" />
            <span>Delivering across rooftops ({deliveryProgress}%)...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Dispatch Dream to {selectedDestination.occupant.split(' ')[0]}</span>
            <span className="text-xs bg-[#ffffff]/20 px-2 py-0.5 rounded-full ml-1">
              #{deliveredCount}
            </span>
          </>
        )}
      </button>
    </div>
  );
};
