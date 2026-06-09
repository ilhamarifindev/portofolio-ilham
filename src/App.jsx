import React, { useState, useEffect } from 'react';
import './index.css';

// --- Icons (SVG) ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.48-1.54 6.48-7.1a5 5 0 0 0-1.35-3.5 4.6 4.6 0 0 0 .05-3.4s-1.09-.35-3.5 1.3a11.9 11.9 0 0 0-6 0C7.1 2.5 6 2.85 6 2.85a4.6 4.6 0 0 0 .05 3.4A5 5 0 0 0 4.65 9.8c0 5.55 3.34 6.74 6.48 7.08A4.8 4.8 0 0 0 10 19.95v4.05"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ShadcnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256">
    <line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
    <line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
  </svg>
);

// Helper component for skill items using images
const SkillItem = ({ src, label, isSvgComponent = false, SvgComponent = null }) => (
  <div className="skill-item">
    {isSvgComponent ? (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
        <SvgComponent />
      </div>
    ) : (
      <img src={src} alt={label} style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
    )}
    <span>{label}</span>
  </div>
);

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupConfig, setPopupConfig] = useState({ show: false, message: '', type: 'success', hiding: false });

  const showPopup = (message, type = 'success') => {
    setPopupConfig({ show: true, message, type, hiding: false });
    setTimeout(() => {
      setPopupConfig(prev => ({ ...prev, hiding: true }));
      setTimeout(() => {
        setPopupConfig({ show: false, message: '', type: 'success', hiding: false });
      }, 300); // Wait for fadeOut animation
    }, 3000);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    // Add Web3Forms required fields
    formData.append("access_key", "e1e73bf7-a1b6-48c1-8530-aa673f31372a");
    formData.append("from_name", "Portfolio Muhammad Ilham");
    formData.append("subject", "Pesan Baru dari Portofolio!");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        showPopup("Pesan Berhasil Dikirim!", "success");
        e.target.reset(); // Clear form
      } else {
        showPopup("Gagal mengirim pesan. Coba lagi.", "error");
      }
    } catch (error) {
      showPopup("Terjadi kesalahan koneksi.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update document title for SEO
  useEffect(() => {
    document.title = "Muhammad Ilham Arifin Putra | Portfolio";
  }, []);

  return (
    <div className="app-container">
      {/* Header / Navigation */}
      <header className="site-header">
        <div className="container nav-container">
          <div className="site-logo">Muhammad Ilham</div>

          <nav>
            <ul className={`nav-list ${isMobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
              <li><a href="#education" onClick={() => setIsMobileMenuOpen(false)}>Education</a></li>
              <li><a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a></li>
              <li><a href="#projects" onClick={() => setIsMobileMenuOpen(false)}>Projects</a></li>
              <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="about" className="container" style={styles.heroSection}>
          <div className="hero-wrapper">
            {/* Text Content */}
            <div className="hero-content">
              <p style={styles.heroGreeting}>Hi, I'm</p>
              <h1 className="heading-1 text-gradient">Muhammad Ilham Arifin Putra</h1>
              <h2 className="heading-3" style={styles.heroSubtitle}>
                Software Engineering Student <a href="https://www.smktarunabangsa.sch.id/" target="_blank" rel="noopener noreferrer" style={{ color: '#00A859', textDecoration: 'none' }}>@ Taruna Bangsa Vocational High School</a>
              </h2>
              <p style={styles.heroDescription}>
                I am a Software Engineering (RPL) student with a strong passion for web development. I focus on building modern, fast, and scalable web applications while continuously learning new technologies to improve my craft.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="https://github.com/ilhamarifindev" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                  <GithubIcon /> GitHub
                </a>
              </div>
            </div>

            {/* Profile Image */}
            <div className="hero-image-container">
              {/* Replace the src with the actual image path, e.g., /profile.jpg if it's in the public folder */}
              <img 
                src="/profile.jpg" 
                alt="Muhammad Ilham Arifin Putra" 
                className="hero-image"
              />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="container" style={styles.section}>
          <h2 className="heading-2">Educational Background</h2>
          <div className="card" style={styles.educationCard}>
            <div style={styles.educationHeader}>
              <div>
                <h3 className="heading-3">Taruna Bangsa Vocational High School</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Software Engineering</p>
              </div>
              <div style={styles.educationDate}>2024 - 2027</div>
            </div>
            
            <div style={{ marginTop: '1.5rem', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <img 
                src="/sekolah.jpg" 
                alt="Taruna Bangsa Vocational High School" 
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              Learning the fundamentals of programming, web application development, database management, and modern software engineering practices. Actively engaged in project-based practical assignments and building functional applications.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container" style={styles.section}>
          <h2 className="heading-2">Skills & Technologies</h2>
          <div style={styles.skillsContainer}>
            
            {/* Frontend */}
            <div className="card">
              <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Frontend</h3>
              <div style={styles.badgeContainer}>
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" label="React.js" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" label="JavaScript" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" label="Tailwind CSS" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" label="Bootstrap" />
                <SkillItem isSvgComponent SvgComponent={ShadcnIcon} label="Shadcn/UI" />
              </div>
            </div>

            {/* Backend */}
            <div className="card">
              <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Backend</h3>
              <div style={styles.badgeContainer}>
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" label="Python" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg" label="NestJS" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" label="Laravel" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" label="PHP" />
              </div>
            </div>
            
            {/* Databases */}
            <div className="card">
              <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Databases</h3>
              <div style={styles.badgeContainer}>
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" label="PostgreSQL" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" label="MySQL" />
              </div>
            </div>

            {/* Tools */}
            <div className="card">
              <h3 className="heading-3" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Tools</h3>
              <div style={styles.badgeContainer}>
                <SkillItem isSvgComponent SvgComponent={GithubIcon} label="GitHub" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" label="Figma" />
                <SkillItem src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" label="Postman" />
              </div>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container" style={styles.section}>
          <h2 className="heading-2">Selected Project</h2>
          <div style={styles.projectsGrid}>
            
            {/* QR-Based Attendance System */}
            <div className="card" style={styles.projectCard}>
              <img src="/absensi-preview.jpg" alt="QR-Based Attendance Preview" className="project-preview" />
              <div style={styles.projectHeader}>
                <h3 className="heading-3" style={{ margin: 0 }}>DigiAttend – QR Attendance Platform</h3>
                <a href="https://github.com/ilhamarifindev/absensi-tb" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex' }}>
                  <GithubIcon />
                </a>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                A robust web-based application designed to seamlessly manage student data, daily attendance, and academic records. Developed to solve real-world problems at school.
              </p>
              <div style={styles.badgeContainer}>
                <span className="badge">Python</span>
                <span className="badge">Laravel</span>
                <span className="badge">PHP</span>
                <span className="badge">MySQL</span>
                <span className="badge">Bootstrap</span>
              </div>
              
              {/* View Project Button */}
              <div style={{ marginTop: '2rem' }}>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ width: '100%' }}>
                  View Project Image
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container" style={styles.section}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>Get In Touch</h2>
            <p style={{ color: 'var(--text-muted)' }}>Have a question or want to work together? Send me a message!</p>
          </div>
          
          <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <form onSubmit={handleContactSubmit} className="contact-form">
              {/* Note: Web3Forms handles spam prevention automatically. */}
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Your Name" required disabled={isSubmitting} />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="your.email@example.com" required disabled={isSubmitting} />
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea id="message" name="message" className="form-control" placeholder="What's on your mind?" required disabled={isSubmitting}></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerContainer}>
          <div style={styles.footerLogo}>
            <span style={{ fontWeight: 800, fontSize: '1.5rem' }}>Muhammad Ilham</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Building exceptional digital experiences.
            </p>
          </div>
          
          <div style={styles.footerLinks}>
            <a href="https://github.com/ilhamarifindev" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a href="https://id.linkedin.com/in/muhammad-ilham-arifin-putra" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>

          </div>
        </div>
        <div style={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Muhammad Ilham Arifin Putra. All rights reserved.</p>
        </div>
      </footer>

      {/* Image Modal overlay */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1000px' }}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Project Gallery (9 Images)</h3>
            <div className="modal-gallery">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <img 
                  key={num} 
                  src={`/absensi-${num}.png`} 
                  alt={`School Attendance View ${num}`} 
                  className="modal-gallery-img" 
                  onClick={() => setSelectedImage(num)}
                  style={{ cursor: 'zoom-in' }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for single image preview */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="modal-close" onClick={() => setSelectedImage(null)} style={{ top: '20px', right: '20px', position: 'fixed', zIndex: 2001 }}>
            &times;
          </button>
          <img 
            src={`/absensi-${selectedImage}.png`} 
            alt="Expanded view" 
            className="lightbox-image" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {/* Toast Popup Notification */}
      {popupConfig.show && (
        <div className={`toast-popup ${popupConfig.type === 'error' ? 'toast-error' : 'toast-success'} ${popupConfig.hiding ? 'hiding' : ''}`}>
          {popupConfig.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          )}
          <span>{popupConfig.message}</span>
        </div>
      )}

    </div>
  );
}

// Inline styles for layout specifics that aren't strictly utilities
const styles = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 10, 11, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid var(--border-color)',
    zIndex: 100,
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '4rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
  },
  navList: {
    display: 'flex',
    gap: '2rem',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '6rem', // offset for fixed header
  },
  heroGreeting: {
    color: 'var(--accent-color)',
    fontWeight: 600,
    marginBottom: '1rem',
    letterSpacing: '0.05em',
  },
  heroSubtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
  },
  heroDescription: {
    maxWidth: '600px',
    color: 'var(--text-muted)',
    fontSize: '1.125rem',
    marginBottom: '2.5rem',
  },
  heroActions: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  section: {
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  educationCard: {
    borderLeft: '4px solid var(--accent-color)',
  },
  educationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  educationDate: {
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-color)',
  },
  skillsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
  },
  badgeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  projectCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  footer: {
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-color)',
    paddingTop: '4rem',
    marginTop: '6rem',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '3rem',
  },
  footerLogo: {
    maxWidth: '300px',
  },
  footerLinks: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-secondary)',
  },
  copyright: {
    textAlign: 'center',
    padding: '1.5rem',
    borderTop: '1px solid var(--border-color)',
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
  }
};

export default App;
