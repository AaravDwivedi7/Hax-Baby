import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  RefreshCw,
  Moon,
  Smile,
  Heart,
} from 'lucide-react';
import {
  SUGGESTED_QUESTIONS,
  type PipMessage,
  getPipDialogueResponse,
} from '../utils/pipDialogue';
import {
  loadVisitorProfile,
  type VisitorProfile,
  awardStardust,
} from '../utils/visitorMemory';
import { playUiChime, playMagicChime } from '../utils/soundEffects';

interface PipChatDrawerProps {
  isMuted: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const PipChatDrawer: React.FC<PipChatDrawerProps> = ({
  isMuted,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<PipMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visitor, setVisitor] = useState<VisitorProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation and load visitor profile
  useEffect(() => {
    const profile = loadVisitorProfile();
    setVisitor(profile);

    const initialPipMessage: PipMessage = {
      id: 'welcome-pip',
      sender: 'pip',
      text:
        profile.visitCount > 1
          ? `Welcome back to the dome, ${profile.name}! 🌟 It's visit #${profile.visitCount} for you! What nocturnal mystery or dream question can I help you engineer tonight?`
          : `Hello there, ${profile.name}! ✦ I'm Pip, Junior Dream Engineer at Midnight Nursery. How can my telescope and star-lantern assist you tonight?`,
      timestamp: 'Just now',
      mood: 'happy',
    };

    setMessages([initialPipMessage]);
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    playUiChime(isMuted);
    setInputText('');

    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${
      now.getHours() >= 12 ? 'PM' : 'AM'
    }`;

    const userMsg: PipMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 1. Try real backend /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          visitorName: visitor?.name || 'Little Dreamer',
          visitCount: visitor?.visitCount || 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        playMagicChime(isMuted);
        awardStardust(1);

        const pipMsg: PipMessage = {
          id: `pip-${Date.now()}`,
          sender: 'pip',
          text: data.reply,
          timestamp: timeStr,
          mood: data.mood || 'happy',
        };
        setMessages((prev) => [...prev, pipMsg]);
        setIsLoading(false);
        return;
      }
    } catch {
      // Fallback seamlessly to client rule-based dialogue
    }

    // Client fallback dialogue
    setTimeout(() => {
      playMagicChime(isMuted);
      awardStardust(1);
      const dialogue = getPipDialogueResponse(
        text,
        visitor?.name || 'Little Dreamer',
        visitor?.visitCount || 1
      );

      const pipMsg: PipMessage = {
        id: `pip-${Date.now()}`,
        sender: 'pip',
        text: dialogue.text,
        timestamp: timeStr,
        mood: dialogue.mood,
      };

      setMessages((prev) => [...prev, pipMsg]);
      setIsLoading(false);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Chat with Pip the Junior Dream Engineer"
    >
      {/* Click outside to close backdrop */}
      <div className="flex-1" onClick={onClose} aria-hidden="true" />

      {/* Slide-out Chat Panel */}
      <div className="w-full max-w-md h-full bg-[#fcf8f2] dark:bg-[#1a1730] shadow-2xl flex flex-col border-l border-[#f0dfcf] dark:border-[#43395c] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white dark:bg-[#252042] border-b border-[#f0dfcf] dark:border-[#43395c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#f4d7df] to-[#fcf1d8] dark:from-[#392f50] dark:to-[#28213d] p-1 border border-[#dba7b9] dark:border-[#f5c96a]/40 flex items-center justify-center shadow-xs">
              <img
                src="/assets/pip_portrait.png"
                alt="Pip Avatar"
                className="w-full h-full object-contain"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#252042]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-base font-bold text-[#402c25] dark:text-[#fcf8f2]">
                  Pip's Observatory Comms
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f4d7df]/60 dark:bg-[#302847] text-[#a34063] dark:text-[#dba7b9] font-semibold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-[#6e544b] dark:text-[#dcd2ea]">
                Junior Dream Engineer · {visitor?.name} (Visit #{visitor?.visitCount})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close chat drawer"
            className="p-2 rounded-xl text-[#9c8278] hover:text-[#402c25] dark:hover:text-white hover:bg-[#f0dfcf]/50 dark:hover:bg-[#302847] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'pip' && (
                <div className="w-8 h-8 rounded-full bg-[#f4d7df] dark:bg-[#392f50] flex items-center justify-center shrink-0 border border-[#dba7b9]/60">
                  <Sparkles className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a]" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#a34063] text-white rounded-tr-xs'
                    : 'bg-white dark:bg-[#252042] text-[#402c25] dark:text-[#fcf8f2] border border-[#f0dfcf] dark:border-[#43395c] rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span
                  className={`text-[10px] mt-1 block font-mono ${
                    msg.sender === 'user'
                      ? 'text-white/70 text-right'
                      : 'text-[#9c8278] dark:text-[#a69bb8]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#402c25] dark:bg-[#43395c] text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  {visitor?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f4d7df] dark:bg-[#392f50] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#a34063] dark:text-[#f5c96a] animate-spin" />
              </div>
              <div className="bg-white dark:bg-[#252042] border border-[#f0dfcf] dark:border-[#43395c] rounded-2xl rounded-tl-xs px-4 py-2.5 text-xs text-[#6e544b] dark:text-[#dcd2ea] flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a34063] dark:bg-[#f5c96a] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#a34063] dark:bg-[#f5c96a] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#a34063] dark:bg-[#f5c96a] animate-bounce [animation-delay:0.3s]" />
                <span className="ml-1 italic text-[11px]">Pip is adjusting his antenna...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions */}
        <div className="px-4 py-2 bg-[#f8f1e6]/70 dark:bg-[#201d39] border-t border-[#f0dfcf] dark:border-[#43395c] overflow-x-auto">
          <span className="text-[10px] font-semibold text-[#9c8278] dark:text-[#a69bb8] uppercase tracking-wider block mb-1.5">
            Ask Pip:
          </span>
          <div className="flex gap-1.5 flex-nowrap pb-1">
            {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-lg bg-white dark:bg-[#2e264a] border border-[#f0dfcf] dark:border-[#43395c] text-[#5c4033] dark:text-[#dcd2ea] hover:border-[#a34063] dark:hover:border-[#f5c96a] hover:bg-[#fff8f1] transition-all cursor-pointer shadow-2xs shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-white dark:bg-[#252042] border-t border-[#f0dfcf] dark:border-[#43395c]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Pip anything about dreams or stars..."
              maxLength={150}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-[#fff8f1] dark:bg-[#1a1730] border border-[#f0dfcf] dark:border-[#43395c] text-[#402c25] dark:text-[#fcf8f2] placeholder-[#9c8278] focus:outline-none focus:ring-2 focus:ring-[#f5c96a] transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              aria-label="Send message to Pip"
              className="p-2.5 rounded-xl bg-[#a34063] hover:bg-[#8f3454] disabled:opacity-40 text-white transition-all shadow-xs cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
