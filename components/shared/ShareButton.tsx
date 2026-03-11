'use client';

import React, { useState } from 'react';

interface ShareButtonProps {
  reportId: string;
  title?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  reportId,
  title = 'Check out my Vedic astrology report from AstroBhavishya!',
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/report/${reportId}`;

  const handleShare = async (platform: string) => {
    const message = encodeURIComponent(`${title}\n\n${shareUrl}`);

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${message}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${message}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        setShowDropdown(false);
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShowDropdown(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="px-4 py-2 bg-[#d4a574] text-[#0a0a1a] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#d4a574]/50 transition-all flex items-center gap-2"
      >
        <span>🔗</span>
        Share
      </button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 bg-[#1e1b4b] border border-[#d4a574]/30 rounded-lg shadow-xl overflow-hidden z-50">
          <button
            onClick={() => handleShare('whatsapp')}
            className="w-full px-6 py-3 text-left text-white hover:bg-[#2d1b69] flex items-center gap-3 transition-colors border-b border-[#d4a574]/10"
          >
            <span>💬</span>
            WhatsApp
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="w-full px-6 py-3 text-left text-white hover:bg-[#2d1b69] flex items-center gap-3 transition-colors border-b border-[#d4a574]/10"
          >
            <span>f</span>
            Facebook
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-full px-6 py-3 text-left text-white hover:bg-[#2d1b69] flex items-center gap-3 transition-colors border-b border-[#d4a574]/10"
          >
            <span>𝕏</span>
            Twitter/X
          </button>
          <button
            onClick={() => handleShare('copy')}
            className="w-full px-6 py-3 text-left text-white hover:bg-[#2d1b69] flex items-center gap-3 transition-colors"
          >
            <span>📋</span>
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};
