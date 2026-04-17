import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { works } from '../data/works';
import { Clock, ArrowLeft, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AudiobookDetail({ setTrack }: { setTrack: (track: any) => void }) {
  const { id } = useParams();
  const work = works.find(w => w.id === id);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const covers = [
    { src: '/shadows-front.png', label: 'Front Cover' },
    { src: '/shadows-back.png', label: 'Back Cover' },
  ];

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) setSlide(s => (s + 1) % covers.length);
    }, 3000);
  }, [paused, covers.length]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (idx: number) => {
    setSlide(idx);
    startTimer();
  };
  const prev = () => goTo(slide === 0 ? covers.length - 1 : slide - 1);
  const next = () => goTo(slide === covers.length - 1 ? 0 : slide + 1);

  if (!work) {
    return (
      <div className="audiobook-detail-page" style={{ textAlign: 'center', padding: '10rem 5%' }}>
        <h2 className="section-title">Work not found</h2>
        <Link to="/portfolio" className="btn-outline" style={{ marginTop: '2rem' }}>Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="audiobook-detail-page">
      <section className="audiobook-hero">
        <div className="reveal">
          <Link to="/portfolio" className="subpage-back">
            <ArrowLeft size={16} />
            Back to Archives
          </Link>
          
          {/* Auto-scroll Carousel */}
          <div
            className="audiobook-cover-wrap reveal d1"
            style={{ position: 'relative', overflow: 'hidden' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="audiobook-wip-badge" style={{ zIndex: 10 }}>Work In Progress</div>

            {/* Sliding strip */}
            <div style={{
              display: 'flex',
              width: `${covers.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(slide * 100) / covers.length}%)`,
              transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
            }}>
              {covers.map((cover) => (
                <div key={cover.src} style={{ width: `${100 / covers.length}%`, flexShrink: 0, height: '100%', position: 'relative', overflow: 'hidden' }}>
                  {/* Blurred background */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${cover.src})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'blur(20px) brightness(0.4)', opacity: 0.6
                  }}></div>
                  
                  <img
                    src={cover.src}
                    alt={cover.label}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain', 
                      position: 'relative', 
                      zIndex: 1, 
                      display: 'block' 
                    }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                  />
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <button onClick={prev} style={{
              position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(200,150,74,0.4)',
              borderRadius: '50%', width: '2.5rem', height: '2.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold)', cursor: 'pointer', zIndex: 20,
              backdropFilter: 'blur(4px)', transition: 'background 0.2s'
            }}>
              <ChevronLeft size={18} />
            </button>

            {/* Right Arrow */}
            <button onClick={next} style={{
              position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(200,150,74,0.4)',
              borderRadius: '50%', width: '2.5rem', height: '2.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold)', cursor: 'pointer', zIndex: 20,
              backdropFilter: 'blur(4px)', transition: 'background 0.2s'
            }}>
              <ChevronRight size={18} />
            </button>

            {/* Dot Indicators */}
            <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 20 }}>
              {covers.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: slide === i ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '50px',
                  background: slide === i ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(0,0,0,0.3)', zIndex: 20 }}>
              <div key={`${slide}-${paused}`} style={{
                height: '100%',
                background: 'var(--gold)',
                animation: paused ? 'none' : 'ab-progress 3s linear forwards',
              }} />
            </div>

            {/* Slide label */}
            <div style={{ position: 'absolute', bottom: '1.8rem', left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', zIndex: 20 }}>
              {covers[slide].label}
            </div>
          </div>
        </div>

        <div className="audiobook-info reveal d2" style={{ alignSelf: 'flex-start' }}>
          <div className="section-label">Production Detail</div>
          <h1>{work.title}</h1>
          
          <div className="audiobook-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Clock size={18} />
              <span>RECORDING ACTIVE</span>
            </div>
          </div>

          <p className="about-bio" style={{ marginBottom: '3rem', fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
            {work.description} This project is currently in the active production phase. We are meticulously refining the vocal texture and emotional resonance to match the artistic vision of the manuscript.
          </p>

          {work.audio ? (
            <div className="audiobook-player-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button 
                  className="play-btn-large"
                  onClick={() => setTrack({ url: work.audio, title: work.filename, subtitle: `${work.language} • Audiobooks` })}
                >
                  <Play fill="currentColor" />
                </button>
                <div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--cream)', marginBottom: '0.3rem' }}>Preview Draft</div>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Studio Quality • MP3</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="audiobook-player-card" style={{ opacity: 0.6 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>🎙 Audio Preview Coming Soon</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>Recording is currently in active production.</div>
            </div>
          )}

          <div className="wip-status-row reveal d3">
            <div className="wip-dot"></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.05em' }}>VOCAL SESSION LIVE</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '2px' }}>Recording latest chapters in the professional studio environment.</div>
            </div>
          </div>
        </div>
      </section>
      

    </div>
  );
}
