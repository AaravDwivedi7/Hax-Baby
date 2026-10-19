import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { LULLABY_MOODS, LullabyMood } from '../utils/dreamLogic';
import { playMusicBoxNote, playUiChime } from '../utils/soundEffects';

interface LullabyLabProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const LullabyLab: React.FC<LullabyLabProps> = ({ isMuted, onToggleMute }) => {
  const [selectedMoodKey, setSelectedMoodKey] = useState<string>('starlight');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number>(-1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMood: LullabyMood = LULLABY_MOODS[selectedMoodKey];

  const stopMusicBox = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
    setActiveNoteIndex(-1);
  };

  const playSequence = (noteIdx: number) => {
    if (noteIdx >= currentMood.notes.length) {
      // Loop sequence gently after a pause
      timerRef.current = setTimeout(() => {
        playSequence(0);
      }, 1200);
      return;
    }

    const note = currentMood.notes[noteIdx];
    setActiveNoteIndex(noteIdx);
    playMusicBoxNote(note.freq, note.duration, isMuted);

    const stepMs = (note.duration + note.pause) * 1000;
    timerRef.current = setTimeout(() => {
      playSequence(noteIdx + 1);
    }, stepMs);
  };

  const togglePlayback = () => {
    playUiChime(isMuted);
    if (isPlaying) {
      stopMusicBox();
    } else {
      setIsPlaying(true);
      playSequence(0);
    }
  };

  const handleMoodSelect = (key: string) => {
    playUiChime(isMuted);
    setSelectedMoodKey(key);
    if (isPlaying) {
      stopMusicBox();
      // Restart with new mood
      setTimeout(() => {
        setIsPlaying(true);
        const newMood = LULLABY_MOODS[key];
        const runNewSequence = (idx: number) => {
          if (idx >= newMood.notes.length) {
            timerRef.current = setTimeout(() => runNewSequence(0), 1200);
            return;
          }
          const note = newMood.notes[idx];
          setActiveNoteIndex(idx);
          playMusicBoxNote(note.freq, note.duration, isMuted);
          timerRef.current = setTimeout(() => {
            runNewSequence(idx + 1);
          }, (note.duration + note.pause) * 1000);
        };
        runNewSequence(0);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      id="lullaby-lab"
      className="bg-[#ffffff] dark:bg-[#302847] rounded-3xl p-6 sm:p-8 border border-[#f0dfcf] dark:border-[#43395c] shadow-md flex flex-col justify-between transition-colors relative overflow-hidden"
    >
      {/* Visual background ambient music glow */}
      {isPlaying && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-700 blur-3xl"
          style={{ backgroundColor: currentMood.color }}
          aria-hidden="true"
        />
      )}

      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5c96a]" aria-hidden="true"></span>
            <span className="text-xs font-semibold text-[#a34063] dark:text-[#dba7b9] uppercase tracking-wider">
              Project 01 · Acoustic Mechanics
            </span>
          </div>

          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Audio muted. Click to enable sound.' : 'Audio active. Click to mute.'}
            className="text-xs flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-[#fff8f1] dark:bg-[#28213d] border border-[#f0dfcf] dark:border-[#43395c] text-[#6e544b] dark:text-[#dcd2ea] hover:bg-[#f4d7df]/30 transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9c8278]" />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#a34063] dark:text-[#f5c96a]" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>

        <h3 className="text-2xl font-bold font-editorial text-[#402c25] dark:text-[#fcf8f2] mb-2">
          The Lullaby Lab
        </h3>
        <p className="text-sm text-[#6e544b] dark:text-[#dcd2ea] leading-relaxed mb-6">
          Tiny melodies for restless stars, sleepy clouds, and creatures who need one last little song.
        </p>

        {/* Music Box Artwork & Visualizer */}
        <div className="relative rounded-2xl bg-gradient-to-b from-[#fff8f1] to-[#fef4e8] dark:from-[#28213d] dark:to-[#201d39] p-5 border border-[#f0dfcf] dark:border-[#43395c] flex flex-col items-center justify-center mb-6 overflow-hidden">
          {/* Morphing sound ripple rings when playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <span className="w-40 h-40 rounded-full border-2 border-[#f5c96a] opacity-40 animate-sound-ripple" />
              <span className="w-56 h-56 rounded-full border-2 border-[#dba7b9] opacity-30 animate-sound-ripple" style={{ animationDelay: '0.65s' }} />
            </div>
          )}

          <div className="relative w-44 h-44 flex items-center justify-center z-10">
            {/* Winding key rotating ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-dashed border-[#dba7b9]/40 dark:border-[#dba7b9]/20 transition-all ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              aria-hidden="true"
            />

            <img
              src="/assets/pip_lullaby_box.png"
              alt="Pip's hand-crafted music box with golden winding key and star chimes"
              className={`w-36 h-36 object-contain filter drop-shadow-md transition-all duration-300 ${
                isPlaying ? 'scale-110 drop-shadow-[0_8px_20px_rgba(245,201,106,0.4)]' : 'scale-100 hover:scale-105'
              }`}
              width="144"
              height="144"
              loading="lazy"
            />

            {/* Note sparkles popping when playing */}
            {isPlaying && (
              <div className="absolute -top-1 -right-1 text-[#f5c96a] text-sm animate-bounce" aria-hidden="true">
                ♪
              </div>
            )}
            {isPlaying && (
              <div className="absolute top-4 -left-2 text-[#dba7b9] text-xs animate-pulse" aria-hidden="true">
                ♫
              </div>
            )}
            {isPlaying && activeNoteIndex >= 0 && (
              <div
                key={activeNoteIndex}
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#f5c96a] to-[#dba7b9] text-[#402c25] text-[10px] font-bold shadow-[0_0_10px_#f5c96a] animate-float-up-fade pointer-events-none"
                aria-hidden="true"
              >
                ✦ {currentMood.notes[activeNoteIndex].name}
              </div>
            )}
          </div>

          {/* Note visualizer track with smooth morphing height and glow */}
          <div className="w-full mt-4 flex items-center justify-center gap-1.5 z-10" aria-label="Lullaby notes sequence">
            {currentMood.notes.map((note, idx) => (
              <div
                key={idx}
                className={`h-7 px-2 flex items-center justify-center rounded-md text-[11px] font-mono transition-all duration-200 transform ${
                  activeNoteIndex === idx
                    ? 'bg-[#a34063] text-white font-bold scale-115 -translate-y-1 shadow-[0_0_12px_rgba(163,64,99,0.5)]'
                    : 'bg-[#ffffff] dark:bg-[#302847] text-[#9c8278] dark:text-[#a69bb8] border border-[#f0dfcf] dark:border-[#43395c] hover:border-[#dba7b9]'
                }`}
              >
                {note.name}
              </div>
            ))}
          </div>
        </div>

        {/* Selectable Lullaby Moods */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-[#5c4033] dark:text-[#fcf8f2] block mb-2">
            Select Melody Mood:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(LULLABY_MOODS).map((mood) => {
              const active = selectedMoodKey === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => handleMoodSelect(mood.id)}
                  aria-pressed={active}
                  className={`py-2 px-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                    active
                      ? 'bg-[#a34063] text-white shadow-xs'
                      : 'bg-[#fff8f1] dark:bg-[#28213d] text-[#6e544b] dark:text-[#dcd2ea] border border-[#f0dfcf] dark:border-[#43395c] hover:bg-[#f4d7df]/30'
                  }`}
                >
                  <div className="truncate font-semibold">{mood.name.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-80">{mood.tempoBpm} BPM</div>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-[#9c8278] dark:text-[#a69bb8] italic">
            {currentMood.description}
          </p>
        </div>
      </div>

      {/* Main Play / Stop Control Button */}
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Stop Lullaby Music Box' : 'Wind up and Play Lullaby'}
        className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] ${
          isPlaying
            ? 'bg-[#5c4033] hover:bg-[#402c25] text-white shadow-md'
            : 'bg-[#a34063] hover:bg-[#8f3454] text-white shadow-md'
        }`}
      >
        {isPlaying ? (
          <>
            <Square className="w-4 h-4 fill-white" aria-hidden="true" />
            <span>Stop Music Box</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-white" aria-hidden="true" />
            <span>Wind Music Box & Play</span>
            <Sparkles className="w-3.5 h-3.5 text-[#f5c96a]" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
};
