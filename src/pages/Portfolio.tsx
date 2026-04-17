import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { works, type Work } from '../data/works';

export default function Portfolio({ setTrack }: { setTrack: (track: any) => void }) {
  const navigate = useNavigate();
  const [langFilter, setLangFilter] = useState<'all' | Work['language']>('all');

  const filteredWorks = works.filter((work) => {
    const matchLang = langFilter === 'all' || work.language === langFilter;
    const notAudiobook = work.category !== 'Audiobooks';
    return matchLang && notAudiobook;
  });

  const languages: Array<{ value: 'all' | Work['language']; label: string }> = [
    { value: 'all', label: 'All Voices' },
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Jingles', label: 'Jingles' },
  ];

  const handleWorkClick = (work: Work) => {
    if (work.category === 'Audiobooks') {
      navigate(`/audiobook/${work.id}`);
    } else {
      setTrack({ url: work.audio, title: work.filename, subtitle: `${work.language} • ${work.category}` });
    }
  };

  return (
    <div className="page-container">
      <section id="portfolio" style={{ padding: '0 5% 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal">Archives</div>
        <h2 className="section-title reveal d1" style={{ marginBottom: '2rem' }}>Voice <em>Repertoire</em></h2>
        


        {/* Premium Filters */}
        <div className="reveal d2" style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '3rem', marginBottom: '4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', justifyContent: 'center' }}>
          {languages.map((l) => (
            <button
              key={l.value}
              onClick={() => setLangFilter(l.value)}
              className={`portfolio-filter ${langFilter === l.value ? 'active' : ''}`}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: langFilter === l.value ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '0 0 1rem 0',
                transition: 'all 0.4s ease',
                position: 'relative',
                fontFamily: 'var(--fb)',
                fontWeight: langFilter === l.value ? '600' : '400'
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div key={langFilter} className="file-list-container reveal d3">
          {filteredWorks.map((work) => (
            <div 
              key={work.id} 
              className="file-item"
              onClick={() => handleWorkClick(work)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '1.8rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                gap: '2.5rem',
                animation: 'fadeInUp 0.5s ease forwards'
              }}
            >
              <div className="file-play-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(200,150,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gold)' }}>
                 {work.category === 'Audiobooks' ? (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                     <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                   </svg>
                 ) : (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                 )}
              </div>

              <div style={{ flex: '1' }}>
                <div className="file-name" style={{ 
                  fontFamily: 'var(--fd)', 
                  fontSize: '1.3rem', 
                  color: 'var(--cream)', 
                  letterSpacing: '0.03em',
                  marginBottom: '0.2rem'
                }}>
                  {work.filename}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {work.category} &bull; {work.language}
                </div>
              </div>

              <div className="listen-label" style={{ color: 'var(--gold)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>
                {work.category === 'Audiobooks' ? 'Open Project' : 'Play Archive'}
              </div>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="reveal" style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ opacity: 0.5, letterSpacing: '0.08em', fontSize: '0.9rem' }}>No recordings found for this selection.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="reveal" style={{ marginTop: '8rem', padding: '3rem', border: '1px solid rgba(200,150,74,0.1)', borderRadius: '12px', background: 'rgba(255,255,255,0.01)' }}>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>Disclaimer & Usage</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '800px' }}>
            All audio samples provided are for portfolio and demonstration purposes only. The intellectual property rights of the scripts and final productions belong to the respective clients. Unauthorised use, redistribution, or modification of these recordings is strictly prohibited. Professional voice-over sessions are recorded in a sound-proofed acoustic environment ensuring broadcast-quality delivery.
          </p>
        </div>
      </section>
      <div style={{ height: '3rem' }}></div>
    </div>
  );
}
