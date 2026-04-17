import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { works } from '../data/works';

export default function Audiobooks() {
  const navigate = useNavigate();
  const audiobooks = works.filter(w => w.category === 'Audiobooks');

  // Auto-scroll carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.max(audiobooks.length, 1));
    }, 3000);
  };

  useEffect(() => {
    if (audiobooks.length > 1) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [audiobooks.length]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    startTimer(); // reset timer on manual nav
  };

  return (
    <div className="page-container">
      <section style={{ padding: '0 5% 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal">Library</div>
        <h2 className="section-title reveal d1" style={{ marginBottom: '1rem' }}>
          Audio<em>books</em>
        </h2>
        <p className="reveal d2" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '4rem', maxWidth: '600px' }}>
          Immersive narrations spanning fiction, drama, and human experience — each book brought to life through voice.
        </p>

        {/* ── GRID (desktop: auto-fill cards, mobile: single card with carousel) ── */}

        {/* Desktop grid (hidden on mobile via CSS) */}
        <div
          className="audiobooks-grid reveal d3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {audiobooks.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/audiobook/${book.id}`)}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(200,150,74,0.12)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,150,74,0.4)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,150,74,0.12)';
              }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel (hidden on desktop via CSS) */}
        {audiobooks.length > 0 && (
          <div className="audiobooks-carousel" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Slides */}
            <div
              style={{
                display: 'flex',
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {audiobooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/audiobook/${book.id}`)}
                  style={{
                    minWidth: '100%',
                    cursor: 'pointer',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(200,150,74,0.2)',
                    background: 'rgba(255,255,255,0.02)',
                    flexShrink: 0,
                    maxWidth: '320px',
                    margin: '0 auto',
                  }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            {audiobooks.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '1.5rem',
              }}>
                {audiobooks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    style={{
                      width: i === currentSlide ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === currentSlide ? 'var(--gold)' : 'rgba(200,150,74,0.3)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Auto-scroll progress bar */}
            <div style={{ marginTop: '1rem', height: '2px', background: 'rgba(200,150,74,0.15)', borderRadius: '1px' }}>
              <div
                key={currentSlide}
                style={{
                  height: '100%',
                  background: 'var(--gold)',
                  borderRadius: '1px',
                  animation: audiobooks.length > 1 ? 'ab-progress 3s linear forwards' : 'none',
                }}
              />
            </div>
          </div>
        )}

        {audiobooks.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 0', opacity: 0.5, fontSize: '0.9rem', letterSpacing: '0.08em' }}>
            No audiobook projects yet.
          </div>
        )}

        {/* Disclaimer */}
        <div className="reveal" style={{ marginTop: '8rem', padding: '3rem', border: '1px solid rgba(200,150,74,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Disclaimer & Usage</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '800px' }}>
            All audiobook productions shared here are either active works in progress or completed projects. Intellectual property of all manuscripts belongs to their respective authors. Narration rights are held under formal agreements with publishers and authors.
          </p>
        </div>
      </section>
      <div style={{ height: '10rem' }}></div>
    </div>
  );
}

// Shared book card to avoid duplication
function BookCard({ book }: { book: ReturnType<typeof works.filter>[0] }) {
  return (
    <>
      {/* Book Cover */}
      <div style={{ aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#0d0d1a', position: 'relative' }}>
        {/* Blurred background for a premium 'contain' look */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(/shadows-front.png)`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'blur(20px) brightness(0.4)', opacity: 0.6
        }}></div>
        
        <img
          src="/shadows-front.png"
          alt={book.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            display: 'block',
          }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />
        {/* WIP badge */}
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'var(--gold)', color: 'var(--dark)',
          fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          padding: '0.3rem 0.7rem', borderRadius: '20px', fontWeight: '700'
        }}>
          Work In Progress
        </div>
      </div>

      {/* Book Info */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
          {book.language}
        </div>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--fd)', color: 'var(--cream)', marginBottom: '0.6rem', lineHeight: 1.3 }}>
          {book.title}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: '1.2rem' }}>
          {book.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          View Project
        </div>
      </div>
    </>
  );
}
