import { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  track: {
    url: string;
    title: string;
    subtitle: string;
  } | null;
  onClose: () => void;
}

export default function AudioPlayer({ track, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100); // Start at 100x volume
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API on first mount
    if (audioRef.current && !audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      
      const gainNode = ctx.createGain();
      gainNodeRef.current = gainNode;
      gainNode.gain.value = volume;
      
      // We must only call createMediaElementSource once per audio element
      sourceRef.current = ctx.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(gainNode);
      gainNode.connect(ctx.destination);
    }
  }, []);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (track) {
      if (audioRef.current) {
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume().catch(e => console.log(e));
        }
        audioRef.current.src = track.url;
        audioRef.current.play().catch(err => console.error("Audio playback failed:", err));
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [track]);

  const togglePlay = () => {
    if (audioRef.current) {
      // Browsers often suspend AudioContext until user interaction
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const w = rect.width;
      const pct = x / w;
      audioRef.current.currentTime = pct * duration;
    }
  };

  if (!track) return null;

  return (
    <div className={`modal-overlay ${track ? 'open' : ''}`}>
      <audio
        ref={audioRef}
        crossOrigin="anonymous" /* required for Web Audio API with external sources */
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-title">{track.title}</div>
        <div className="modal-sub">{track.subtitle}</div>
        
        <div className="audio-waveform">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="w-bar" 
              style={{ 
                height: isPlaying ? `${20 + Math.random() * 60}%` : '20%',
                animationPlayState: isPlaying ? 'running' : 'paused',
                animationDelay: `${i * 0.05}s`
              }} 
            />
          ))}
        </div>
        
        <div className="audio-controls">
          <button className="play-btn-large" onClick={togglePlay}>
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: '4px' }} />}
          </button>
          
          <div className="audio-progress" onClick={handleProgressClick} style={{ cursor: 'pointer' }}>
            <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          
          <div className="volume-control" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100px' }}>
            <Volume2 size={16} style={{ color: 'var(--gold)', opacity: 0.8 }} />
            <input 
              title="Volume"
              type="range" 
              min="0" 
              max="500" 
              step="5" 
              value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                accentColor: 'var(--gold)',
                cursor: 'pointer',
                opacity: 0.8
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
