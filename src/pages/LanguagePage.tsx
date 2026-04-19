import { Link } from 'react-router-dom';
import { getWorksByLanguage } from '../data/works';

interface LanguagePageProps {
  language: string;
  gradient?: string;
  description: string;
  icon?: any;
  setTrack: (track: any) => void;
}

export default function LanguagePage({ language, description, setTrack }: LanguagePageProps) {
  const works = getWorksByLanguage(language as any).filter(w => w.category !== 'Audiobooks');

  return (
    <div className="min-h-screen pt-32 pb-20">
      <section style={{ padding: '8rem 5% 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal">
          <Link to="/portfolio" className="subpage-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Archives
          </Link>
        </div>

        <div className="section-label reveal d1">{language} Archives</div>
        <h2 className="section-title reveal d2" style={{ marginBottom: '2.5rem' }}>The <em>Spirit</em> of {language}</h2>
        
        <div className="reveal d3">
          <p className="about-bio" style={{ maxWidth: '800px', marginBottom: '5rem' }}>
            {description}
          </p>
        </div>

        <div className="file-list-container reveal d4">
          {works.map((work) => (
            <div 
              key={work.id} 
              className="file-item"
              onClick={() => setTrack({ url: work.audio, title: work.filename, subtitle: `${language} Archive` })}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '2rem 0', 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                gap: '2.5rem',
                animation: 'fadeInUp 0.5s ease forwards'
              }}
            >
              <div className="file-play-icon" style={{ width: '45px', height: '45px', borderRadius: '50%', border: '1px solid rgba(200,150,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--gold)' }}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
              </div>

              <div style={{ flex: '1' }}>
                <div className="file-name" style={{ 
                  fontFamily: 'var(--fd)', 
                  fontSize: '1.4rem', 
                  color: 'var(--cream)', 
                  letterSpacing: '0.03em',
                  marginBottom: '0.3rem',
                  transition: 'color 0.3s ease'
                }}>
                  {work.filename}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                   {language} Archive
                </div>
              </div>

              <div className="listen-label" style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.5, transition: 'all 0.3s ease' }}>
                Listen
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal d4" style={{ marginTop: '10rem', textAlign: 'center', padding: '6rem 4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '2px', border: '1px solid rgba(200,150,74,0.1)' }}>
          <h3 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Request custom <em>samples?</em></h3>
          <p style={{ opacity: 0.5, marginBottom: '2.5rem', maxWidth: '500px', marginInline: 'auto', lineHeight: '1.8' }}>
            Personalized voice samples tailored to your script requirements, delivered within 24 working hours.
          </p>
          <Link to="/contact" className="btn-primary" style={{ marginInline: 'auto' }}>
            Request Recording
          </Link>
        </div>
      </section>
      <div style={{ height: '3rem' }}></div>
    </div>
  );
}
