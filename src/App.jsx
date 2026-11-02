import { useEffect, useRef, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

const initialProfile = {
  id: 1,
  name: 'Hussein Ali Abdulrahman',
  title: 'Business Information Technology Specialist',
  summary:
    'Seeking an opportunity in Business Information Technology where I can use my technical skills, education, and passion for technology to contribute to organizational success.',
  email: 'husseinali2334@gmail.com',
  phone: '+255 658 216 348',
  location: 'Mombasa - Zanzibar',
  linkedin: '',
  github: 'https://github.com/Hussein2334',
  photo_url: '/images/me1.jpg',
  footer_description: 'Passionate about technology and innovation, dedicated to creating solutions that make a difference.',
  footer_links: [
    { label: 'GitHub', href: 'https://github.com/Hussein2334?tab=repositories', icon: 'fab fa-github' },
    { label: 'Email', href: 'mailto:husseinali2334@gmail.com', icon: 'fas fa-envelope' },
  ],
  font_family: 'Poppins',
  accent_color: '#2F3C9E',
  language: 'en',
  dark_mode: false,
}

const previewData = {
  education: [
    {
      id: 'preview-education-1',
      qualification: 'Bachelor of Information Technology',
      institution: 'Institute of Accountancy Arusha (IAA)',
      period: 'Inaendelea',
      description:
        'Ninaendelea na shahada ya BIT (NTA Level 8), nikijifunza IT project management, network administration, information security, data mining na open-source software deployment. CGPA: 3.53.',
    },
    {
      id: 'preview-education-2',
      qualification: 'Diploma in Business Information Technology',
      institution: 'Zanzibar University',
      period: '',
      description:
        'Masomo ya business information systems, database management, networking na software development.',
    },
  ],
  experience: [
    {
      id: 'preview-experience-1',
      role: 'Field Training - Business Information Technology',
      organization: "People's Bank of Zanzibar (PBZ)",
      period: 'Mwezi 1',
      description:
        'Mafunzo ya vitendo ya IT katika mazingira ya benki.',
    },
    {
      id: 'preview-experience-2',
      role: 'Field Training - Business Information Technology',
      organization: 'Zanzibar e-Government Agency (eGAZ)',
      period: 'Miezi 2',
      description:
        'Mafunzo ya vitendo yaliyolenga software development na system administration.',
    },
  ],
  skills: [
    { id: 'preview-skill-1', name: 'Business Information Technology' },
    { id: 'preview-skill-2', name: 'Database Management' },
    { id: 'preview-skill-3', name: 'Networking' },
    { id: 'preview-skill-4', name: 'Information Security' },
    { id: 'preview-skill-5', name: 'SQL & SQL Server' },
  ],
  achievements: [
    {
      id: 'preview-achievement-1',
      title: 'UNESCO - Mafunzo ya afya na mahusiano',
      date: 'Aprili 2025',
      description:
        'Nilikamilisha kozi ya mwaka mmoja kuhusu Sexuality Education, HIV & AIDS, Gender-Based Violence, Relationships na Resource Management, kwa ushirikiano na UNESCO Dar es Salaam Office.',
    },
    {
      id: 'preview-achievement-2',
      title: 'Uongozi wa IAA Tax Association',
      date: '2026',
      description:
        'Nimetambuliwa na Tanzania Revenue Authority kwa ushiriki wangu kama mwanachama wa IAA Tax Association, Arusha Region.',
    },
    {
      id: 'preview-achievement-3',
      title: 'Class Representative',
      date: '2022/2023',
      description:
        'Nilitumikia kama Class Representative katika Zanzibar University, nikitambuliwa kwa uongozi na kujitolea kwa wanafunzi wenzangu.',
    },
  ],
  hobbies: [
    { id: 'preview-hobby-1', name: 'Swimming', icon: 'fas fa-swimmer' },
    { id: 'preview-hobby-2', name: 'Football', icon: 'fas fa-futbol' },
    { id: 'preview-hobby-3', name: 'Reading', icon: 'fas fa-book-reader' },
    { id: 'preview-hobby-4', name: 'Team Work', icon: 'fas fa-users' },
    { id: 'preview-hobby-5', name: 'Counselling', icon: 'fas fa-hands-helping' },
    { id: 'preview-hobby-6', name: 'Cooperative', icon: 'fas fa-handshake' },
  ],
  training: [
    {
      id: 'preview-training-1',
      title: 'SQL & SQL Server Certification',
      provider: 'Udemy',
      date: '',
      description: 'Completed comprehensive training program on SQL and SQL Server through Udemy, covering essential database management skills.',
      skills: 'SQL Basics, Advanced SQL Queries, Database Design, SQL Server Administration, Stored Procedures & Functions, Performance Tuning, Data Security',
      documents: [],
    },
  ],
  referees: [
    { id: 'preview-referee-1', name: 'MR. ALI ABDULRAHMAN ABDULLA', position: 'Senior Instructor', organization: 'Karume Institute of Science and Technology', phone: '+255 778395610', email: 'ali.abdullah@live.com', address: 'P.O.BOX 1092, Zanzibar-Tanzania' },
    { id: 'preview-referee-2', name: 'MRS ZUHURA IDDI OMAR', position: 'Teacher', organization: 'Ministry of Education and Vocational Training', phone: '+255 777 418200', email: 'zuhuraiddiomar@gmail.com', address: 'P.O.BOX 1092, Zanzibar-Tanzania' },
    { id: 'preview-referee-3', name: 'MR. HILAL SAID AMOUR', position: 'Manager Digital Banking & Innovation', organization: "The People's Bank of Zanzibar", phone: '+255657132387', email: 'Hilal.Amour@pbzbank.co.tz', address: 'P ZIC building, 2nd floor' },
  ],
  certificates: [
    {
      id: 'preview-certificate-1',
      title: 'SQL & SQL Server Certification',
      issuer: 'Udemy',
      issue_date: '',
      image_url: '',
      description:
        'Mafunzo ya database management kwa kutumia SQL na SQL Server.',
    },
  ],
  gallery: [],
}

const tables = ['education', 'experience', 'skills', 'achievements', 'certificates', 'gallery', 'hobbies', 'training', 'referees']

function getCvAssetPath(url) {
  const marker = '/storage/v1/object/public/cv-assets/'
  const pathStart = url?.indexOf(marker) ?? -1
  return pathStart >= 0 ? url.slice(pathStart + marker.length) : null
}

const sectionConfig = {
  education: {
    title: 'Elimu',
    singular: 'elimu',
    table: 'cv_education',
    fields: [
      { name: 'qualification', label: 'Sifa / kozi', required: true },
      { name: 'institution', label: 'Taasisi', required: true },
      { name: 'period', label: 'Muda', placeholder: 'Mf. 2023 - sasa' },
      { name: 'description', label: 'Maelezo', type: 'textarea' },
      {
        name: 'certificate_files',
        label: 'Ambatisha cheti (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
      {
        name: 'transcript_files',
        label: 'Ambatisha transcript (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  experience: {
    title: 'Uzoefu',
    singular: 'uzoefu',
    table: 'cv_experience',
    fields: [
      { name: 'role', label: 'Cheo / jukumu', required: true },
      { name: 'organization', label: 'Taasisi', required: true },
      { name: 'period', label: 'Muda', placeholder: 'Mf. Miezi 2' },
      { name: 'description', label: 'Maelezo', type: 'textarea' },
      {
        name: 'certificate_files',
        label: 'Ambatisha vyeti vya uzoefu (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  skills: {
    title: 'Ujuzi',
    singular: 'ujuzi',
    table: 'cv_skills',
    fields: [
      { name: 'name', label: 'Jina la ujuzi', required: true },
      {
        name: 'certificate_files',
        label: 'Ambatisha vyeti vinavyothibitisha ujuzi (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  achievements: {
    title: 'Mafanikio',
    singular: 'mafanikio',
    table: 'cv_achievements',
    fields: [
      { name: 'title', label: 'Mafanikio', required: true },
      { name: 'date', label: 'Tarehe / mwaka' },
      { name: 'description', label: 'Maelezo', type: 'textarea' },
      {
        name: 'certificate_files',
        label: 'Ambatisha vyeti vya mafanikio (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  hobbies: {
    title: 'Hobbies',
    singular: 'hobby',
    table: 'cv_hobbies',
    fields: [
      { name: 'name', label: 'Jina la hobby', required: true },
      {
        name: 'icon',
        label: 'Icon',
        type: 'select',
        options: [
          ['fas fa-swimmer', 'Swimming'],
          ['fas fa-futbol', 'Football'],
          ['fas fa-book-reader', 'Reading'],
          ['fas fa-users', 'Team Work'],
          ['fas fa-hands-helping', 'Counselling'],
          ['fas fa-handshake', 'Cooperative'],
          ['fas fa-music', 'Music'],
          ['fas fa-camera', 'Photography'],
          ['fas fa-plane', 'Travel'],
          ['fas fa-laptop-code', 'Technology'],
        ],
      },
    ],
  },
  training: {
    title: 'Professional Training',
    singular: 'mafunzo',
    table: 'cv_training',
    fields: [
      { name: 'title', label: 'Jina la mafunzo', required: true },
      { name: 'provider', label: 'Taasisi / mtoa mafunzo' },
      { name: 'date', label: 'Tarehe / mwaka' },
      { name: 'description', label: 'Maelezo', type: 'textarea' },
      { name: 'skills', label: 'Mada / ujuzi (tenganisha kwa koma)', type: 'textarea' },
      {
        name: 'certificate_files',
        label: 'Ambatisha vyeti vya mafunzo (JPG, PNG, WebP au PDF; hadi 10 MB kwa kila faili)',
        type: 'attachments',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  referees: {
    title: 'Referees',
    singular: 'referee',
    table: 'cv_referees',
    fields: [
      { name: 'name', label: 'Jina kamili', required: true },
      { name: 'position', label: 'Cheo / nafasi', required: true },
      { name: 'organization', label: 'Taasisi' },
      { name: 'phone', label: 'Namba ya simu' },
      { name: 'email', label: 'Barua pepe', type: 'email' },
      { name: 'address', label: 'Anwani', type: 'textarea' },
    ],
  },
  certificates: {
    title: 'Vyeti',
    singular: 'cheti',
    table: 'cv_certificates',
    fields: [
      { name: 'title', label: 'Jina la cheti', required: true },
      { name: 'issuer', label: 'Kilichotolewa na' },
      { name: 'issue_date', label: 'Tarehe / mwaka' },
      { name: 'description', label: 'Maelezo', type: 'textarea' },
      {
        name: 'image_file',
        label: 'Picha/PDF ya cheti (unaweza kuchagua kurasa nyingi)',
        type: 'file',
        accept: 'image/jpeg,image/png,image/webp,application/pdf',
      },
    ],
  },
  gallery: {
    title: 'Picha',
    singular: 'picha',
    table: 'cv_gallery',
    fields: [
      { name: 'title', label: 'Jina / kichwa cha picha', required: true },
      { name: 'description', label: 'Maelezo mafupi' },
      {
        name: 'image_file',
        label: 'Picha (JPG, PNG au WebP; hadi 10 MB)',
        type: 'file',
        accept: 'image/jpeg,image/png,image/webp',
      },
    ],
  },
}

function PublicCv({ profile, data, onAdmin, preview }) {
  const frameRef = useRef(null)

  useEffect(() => {
    function handleFrameMessage(event) {
      if (event.source !== frameRef.current?.contentWindow || event.origin !== window.location.origin) return
      if (event.data?.type === 'CV_ADMIN_REQUEST') onAdmin()
    }

    window.addEventListener('message', handleFrameMessage)
    return () => window.removeEventListener('message', handleFrameMessage)
  }, [onAdmin])

  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'CV_DATA', profile, data: preview ? null : data },
      window.location.origin,
    )
  }, [profile, data, preview])

  return (
    <iframe
      ref={frameRef}
      className="cv-design-frame"
      src="/cv-design.html"
      title="CV ya Hussein Ali Abdulrahman"
      onLoad={() => frameRef.current?.contentWindow?.postMessage(
        { type: 'CV_DATA', profile, data: preview ? null : data },
        window.location.origin,
      )}
    />
  )
}

function LoginView({ error, busy, onLogin, onBack, configurationError }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <main className="admin-login">
      <section className="login-card">
        <aside className="login-visual">
          <a className="login-brand" href="/" onClick={(event) => { event.preventDefault(); onBack() }}>
            <img src="/images/me1.jpg" alt="" />
            <span>Hussein Ali<small>WASIFU WA KITAALUMA</small></span>
          </a>
          <div className="login-visual-copy">
            <span className="login-visual-kicker"><i className="fa-solid fa-sparkles" aria-hidden="true" /> CV MANAGER</span>
            <h2>Wasifu wako,<br />kwa udhibiti wako.</h2>
            <p>Simamia taarifa, uzoefu na vyeti vyako kwa urahisi kutoka sehemu moja.</p>
          </div>
          <div className="login-visual-footer"><i /> Eneo salama la msimamizi</div>
        </aside>
        <div className="login-content">
          <button className="back-link" onClick={onBack}><i className="fa-solid fa-arrow-left" aria-hidden="true" /> Rudi kwenye CV</button>
          <div className="login-mark"><i className="fa-solid fa-user-lock" aria-hidden="true" /></div>
          <span className="eyebrow">ENEO LA MSIMAMIZI</span>
          <h1>Karibu tena</h1>
          <p className="login-description">Ingia kwenye akaunti yako ili kuendelea kusimamia CV.</p>
          {configurationError && <div className="notice notice-error">{configurationError}</div>}
          {error && <div className="notice notice-error" role="alert">{error}</div>}
          <form onSubmit={(event) => { event.preventDefault(); onLogin(email, password) }}>
            <label>
              Barua pepe
              <span className="login-input-wrap"><i className="fa-regular fa-envelope" aria-hidden="true" /><input type="email" autoComplete="username" placeholder="jina@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></span>
            </label>
            <label>
              Nenosiri
              <span className="login-input-wrap"><i className="fa-solid fa-lock" aria-hidden="true" /><input type="password" autoComplete="current-password" placeholder="Weka nenosiri lako" value={password} onChange={(event) => setPassword(event.target.value)} required /></span>
            </label>
            <button className="button button-primary login-submit" disabled={busy || Boolean(configurationError)}>
              {busy ? 'Inaingia...' : 'Ingia kwenye dashboard'} {!busy && <i className="fa-solid fa-arrow-right" aria-hidden="true" />}
            </button>
          </form>
          <small><i className="fa-solid fa-shield-halved" aria-hidden="true" /> Usimamizi unapatikana kwa akaunti iliyoidhinishwa tu.</small>
        </div>
      </section>
    </main>
  )
}

function ProfileEditor({ profile, onSave, busy, onCancel }) {
  const [form, setForm] = useState(profile)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const change = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview)
    }
  }, [photoPreview])

  async function submit(event) {
    event.preventDefault()
    const saved = await onSave({ ...form, photo_file: photoFile })
    if (saved) {
      setPhotoFile(null)
      setPhotoPreview('')
      if (typeof saved === 'object') setForm(saved)
    }
  }

  function resetPhoto() {
    setPhotoFile(null)
    setPhotoPreview('')
    change('photo_url', initialProfile.photo_url)
  }

  return (
    <form className="editor-form profile-form" onSubmit={submit}>
      <div className="form-grid">
        {[
          ['name', 'Jina kamili'],
          ['title', 'Taaluma / cheo'],
          ['email', 'Barua pepe', 'email'],
          ['phone', 'Namba ya simu'],
          ['location', 'Eneo'],
          ['linkedin', 'Kiungo cha LinkedIn', 'url'],
          ['github', 'Kiungo cha GitHub', 'url'],
        ].map(([key, label, type = 'text']) => (
          <label key={key} className={key === 'name' || key === 'title' ? 'field-wide' : ''}>
            {label}
            <input type={type} value={form[key] || ''} onChange={(event) => change(key, event.target.value)} />
          </label>
        ))}
        <div className="field-wide profile-photo-field">
          <span>Picha ya wasifu</span>
          <div className="profile-photo-control">
            <img src={photoPreview || form.photo_url || initialProfile.photo_url} alt="Mwonekano wa picha ya wasifu" />
            <div className="profile-photo-options">
              <label>
                Pakia picha mpya (JPG, PNG au WebP; hadi 10 MB)
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null
                    event.target.value = ''
                    setPhotoFile(file)
                    setPhotoPreview(file ? URL.createObjectURL(file) : '')
                  }}
                />
              </label>
              <button type="button" className="button button-quiet" onClick={resetPhoto} disabled={busy}>
                Tumia picha ya kawaida
              </button>
            </div>
          </div>
        </div>
        <label className="field-wide">
          Maelezo mafupi
          <textarea rows="4" value={form.summary || ''} onChange={(event) => change('summary', event.target.value)} />
        </label>
      </div>
      <div className="form-actions">
        <button className="button button-primary" disabled={busy}>{busy ? 'Inahifadhi...' : 'Hifadhi wasifu'}</button>
        <button type="button" className="button button-quiet" onClick={onCancel}>Rudi</button>
      </div>
    </form>
  )
}

function DesignEditor({ profile, onSave, busy }) {
  const [font, setFont] = useState(profile.font_family || 'Poppins')
  const [color, setColor] = useState(profile.accent_color || '#2F3C9E')
  const [language, setLanguage] = useState(profile.language || 'en')
  const [darkMode, setDarkMode] = useState(Boolean(profile.dark_mode))

  return (
    <form className="editor-form design-form" onSubmit={(event) => { event.preventDefault(); onSave({ ...profile, font_family: font, accent_color: color, language, dark_mode: darkMode }) }}>
      <p>Badilisha lugha, mandhari, font na rangi kuu zinazoonekana kwenye CV yako.</p>
      <div className="form-grid">
        <label>
          Lugha ya CV
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="en">English</option>
            <option value="sw">Kiswahili</option>
            <option value="ar">العربية</option>
          </select>
        </label>
        <label>
          Fonti
          <select value={font} onChange={(event) => setFont(event.target.value)}>
            {['Poppins', 'Montserrat', 'Inter', 'Roboto', 'Arial', 'Georgia'].map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          Rangi kuu
          <span className="color-control"><input type="color" value={color} onChange={(event) => setColor(event.target.value)} /><span>{color}</span></span>
        </label>
        <label>
          Mandhari ya CV
          <select value={darkMode ? 'dark' : 'light'} onChange={(event) => setDarkMode(event.target.value === 'dark')}>
            <option value="light">Light mode</option>
            <option value="dark">Dark mode</option>
          </select>
        </label>
      </div>
      <div className="design-preview" style={{ '--accent': color, '--font-family': font }}>
        <span>HA</span><strong>Muonekano wa fonti yako</strong><small>Rangi na fonti vitaonekana hapa.</small>
      </div>
      <div className="form-actions">
        <button className="button button-primary" disabled={busy}>{busy ? 'Inahifadhi...' : 'Hifadhi muonekano'}</button>
      </div>
    </form>
  )
}

function FooterEditor({ profile, onSave, busy }) {
  const [description, setDescription] = useState(profile.footer_description || '')
  const [links, setLinks] = useState(Array.isArray(profile.footer_links) ? profile.footer_links : [])

  function updateLink(index, key, value) {
    setLinks((current) => current.map((link, itemIndex) => (
      itemIndex === index ? { ...link, [key]: value } : link
    )))
  }

  return (
    <form
      className="editor-form footer-editor"
      onSubmit={(event) => {
        event.preventDefault()
        onSave({ ...profile, footer_description: description, footer_links: links })
      }}
    >
      <p>Hariri maelezo na viungo vinavyoonekana kwenye sehemu ya chini ya CV.</p>
      <label className="field-wide">
        Maelezo ya footer
        <textarea rows="3" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <div className="footer-links-editor">
        <div className="list-heading">
          <h3>Viungo vya footer</h3>
          <button
            type="button"
            className="button button-outline footer-add-link"
            onClick={() => setLinks((current) => [...current, { label: '', href: '', icon: 'fas fa-globe' }])}
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Ongeza kiungo
          </button>
        </div>
        {links.length ? links.map((link, index) => (
          <div className="footer-link-row" key={`footer-link-${index}`}>
            <label>
              Jina
              <input value={link.label || ''} onChange={(event) => updateLink(index, 'label', event.target.value)} required />
            </label>
            <label>
              Kiungo (URL, mailto: au tel:)
              <input value={link.href || ''} onChange={(event) => updateLink(index, 'href', event.target.value)} required />
            </label>
            <label>
              Aina ya icon
              <select value={link.icon || 'fas fa-globe'} onChange={(event) => updateLink(index, 'icon', event.target.value)}>
                <option value="fab fa-github">GitHub</option>
                <option value="fab fa-linkedin">LinkedIn</option>
                <option value="fas fa-envelope">Email</option>
                <option value="fas fa-phone">Simu</option>
                <option value="fas fa-globe">Tovuti nyingine</option>
              </select>
            </label>
            <button
              type="button"
              className="footer-remove-link"
              onClick={() => setLinks((current) => current.filter((_, itemIndex) => itemIndex !== index))}
              aria-label={`Futa kiungo ${link.label || index + 1}`}
            >
              <i className="fa-solid fa-trash" aria-hidden="true" />
            </button>
          </div>
        )) : <p className="empty-admin">Bado hakuna viungo vya footer. Bonyeza “Ongeza kiungo” kuanza.</p>}
      </div>
      <div className="form-actions">
        <button className="button button-primary" disabled={busy}>{busy ? 'Inahifadhi...' : 'Hifadhi footer'}</button>
      </div>
    </form>
  )
}

function EntryManager({ section, entries, onSave, onDelete, busy }) {
  const [form, setForm] = useState({})
  const [editingId, setEditingId] = useState(null)
  const config = sectionConfig[section]

  function startEdit(entry) {
    const values = { ...entry }
    delete values.id
    delete values.created_at
    if (['education', 'experience', 'skills', 'achievements', 'training'].includes(section) && !Array.isArray(values.documents)) values.documents = []
    setForm(values)
    setEditingId(entry.id)
  }

  function resetForm() {
    setForm({})
    setEditingId(null)
  }

  async function submit(event) {
    event.preventDefault()
    const saved = await onSave(form, editingId)
    if (saved !== false) resetForm()
  }

  return (
    <div className="entry-manager">
      <form className="editor-form" onSubmit={submit}>
        <h3>{editingId ? `Hariri ${config.singular}` : `Ongeza ${config.singular} mpya`}</h3>
        {section === 'gallery' && editingId && form.image_url && (
          <img className="gallery-edit-preview" src={form.image_url} alt={form.title || 'Picha iliyopo'} />
        )}
        {['education', 'experience', 'skills', 'achievements', 'training'].includes(section) && Array.isArray(form.documents) && form.documents.length > 0 && (
          <div className="education-attachments">
            <strong>Vyeti vilivyowekwa</strong>
            {form.documents.map((document, index) => (
              <div className="education-attachment-row" key={`${document.url}-${index}`}>
                <span><i className="fa-solid fa-file-lines" aria-hidden="true" /> {document.type === 'transcript' ? 'Transcript' : 'Certificate'}: {document.label || `Faili ${index + 1}`}</span>
                <button
                  type="button"
                  className="delete-action"
                  onClick={() => setForm((current) => ({
                    ...current,
                    documents: current.documents.filter((_, documentIndex) => documentIndex !== index),
                  }))}
                  aria-label={`Ondoa ${document.label || `cheti ${index + 1}`}`}
                >
                  Ondoa
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="form-grid">
          {config.fields.map((field) => (
            <label key={field.name} className={field.type === 'textarea' || field.type === 'file' || field.type === 'attachments' ? 'field-wide' : ''}>
              {field.label}
              {field.type === 'textarea' ? (
                <textarea rows="3" value={form[field.name] || ''} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} />
              ) : field.type === 'select' ? (
                <select
                  value={form[field.name] || field.options[0]?.[0] || ''}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                >
                  {field.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              ) : field.type === 'file' || field.type === 'attachments' ? (
                <input
                  type="file"
                  accept={field.accept}
                  multiple={field.type === 'attachments' || (section === 'certificates' && field.name === 'image_file')}
                  onChange={(event) => {
                    setForm({ ...form, [field.name]: Array.from(event.target.files || []) })
                    event.target.value = ''
                  }}
                />
              ) : (
                <input
                  type={field.type === 'email' ? 'email' : 'text'}
                  placeholder={field.placeholder || ''}
                  value={form[field.name] || ''}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                  required={field.required}
                />
              )}
            </label>
          ))}
        </div>
        <div className="form-actions">
          <button className="button button-primary" disabled={busy}>{busy ? 'Inahifadhi...' : editingId ? 'Hifadhi mabadiliko' : `Ongeza ${config.singular}`}</button>
          {editingId && <button type="button" className="button button-quiet" onClick={resetForm}>Ghairi</button>}
        </div>
      </form>

      <div className="managed-list">
        <div className="list-heading"><h3>{config.title} zilizopo</h3><span>{entries.length}</span></div>
        {entries.length ? entries.map((entry) => (
          <article className="managed-row" key={entry.id}>
            <div>
              {section === 'gallery' && entry.image_url && (
                <img className="gallery-row-preview" src={entry.image_url} alt="" />
              )}
              <strong>{entry.title || entry.qualification || entry.role || entry.name}</strong>
              {section === 'referees' ? (
                <span>{[entry.position, entry.organization, entry.phone, entry.email, entry.address].filter(Boolean).join(' · ') || '—'}</span>
              ) : (
                <span>{entry.issuer || entry.institution || entry.organization || entry.provider || entry.date || entry.period || entry.description || entry.icon || '—'}</span>
              )}
            </div>
            <div className="row-actions">
              <button type="button" onClick={() => startEdit(entry)} aria-label={`Hariri ${config.singular}`}>Hariri</button>
              <button type="button" className="delete-action" onClick={() => onDelete(entry)} aria-label={`Futa ${config.singular}`}>Futa</button>
            </div>
          </article>
        )) : <p className="empty-admin">Bado hakuna taarifa katika sehemu hii.</p>}
      </div>
    </div>
  )
}

function Dashboard({ profile, data, onProfileSave, onDesignSave, onEntrySave, onEntryDelete, onSignOut, onClose, busy, error, success }) {
  const [section, setSection] = useState('profile')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const nav = [
    { id: 'profile', label: 'Wasifu', icon: 'fa-solid fa-user' },
    { id: 'education', label: 'Elimu', icon: 'fa-solid fa-graduation-cap' },
    { id: 'experience', label: 'Uzoefu', icon: 'fa-solid fa-briefcase' },
    { id: 'skills', label: 'Ujuzi', icon: 'fa-solid fa-wand-magic-sparkles' },
    { id: 'achievements', label: 'Mafanikio', icon: 'fa-solid fa-award' },
    { id: 'training', label: 'Professional Training', icon: 'fa-solid fa-chalkboard-user' },
    { id: 'hobbies', label: 'Hobbies', icon: 'fa-solid fa-heart' },
    { id: 'referees', label: 'Referees', icon: 'fa-solid fa-address-book' },
    { id: 'certificates', label: 'Vyeti', icon: 'fa-solid fa-certificate' },
    { id: 'gallery', label: 'Picha', icon: 'fa-solid fa-images' },
    { id: 'footer', label: 'Footer', icon: 'fa-solid fa-shoe-prints' },
    { id: 'design', label: 'Muonekano', icon: 'fa-solid fa-palette' },
  ]

  return (
    <main className={`dashboard${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-header">
          <a href="#admin" className="dashboard-brand"><span className="brand-mark">CV</span><span>CV Manager<small>USIMAMIZI WA WASIFU</small></span></a>
          <button
            type="button"
            className="sidebar-collapse-toggle"
            onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={sidebarCollapsed ? 'Fungua menyu' : 'Kunja menyu'}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? 'Fungua menyu' : 'Kunja menyu'}
          >
            <i className={`fa-solid ${sidebarCollapsed ? 'fa-angles-right' : 'fa-angles-left'}`} aria-hidden="true" />
          </button>
        </div>
        <div className="sidebar-label">MENYU</div>
        <nav className="dashboard-nav">
          {nav.map((item) => (
            <button key={item.id} className={section === item.id ? 'active' : ''} onClick={() => setSection(item.id)}>
              <span><i className={item.icon} aria-hidden="true" /></span>{item.label}{section === item.id && <i />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-link" onClick={onClose}><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /> <span>Angalia CV</span></button>
          <button className="sidebar-link" onClick={onSignOut}><i className="fa-solid fa-right-from-bracket" aria-hidden="true" /> <span>Toka</span></button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div><span className="eyebrow">DASHBOARD / {nav.find((item) => item.id === section)?.label.toUpperCase()}</span><strong>Habari, {profile.name.split(' ')[0]}</strong></div>
          <button className="button button-outline" onClick={onClose}>Tazama CV <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></button>
        </header>
        <div className="dashboard-content">
          <div className="dashboard-title">
            <div><span className="eyebrow">USIMAMIZI WA CV</span><h1>{section === 'profile' ? 'Wasifu wangu' : section === 'design' ? 'Muonekano wa CV' : section === 'footer' ? 'Footer ya CV' : sectionConfig[section].title}</h1></div>
            <span className="save-status"><i /> Mabadiliko yako yanahifadhiwa kwenye Supabase</span>
          </div>
          {error && <div className="notice notice-error" role="alert">{error}</div>}
          {success && <div className="notice notice-success" role="status">{success}</div>}
          {section === 'profile' && <ProfileEditor profile={profile} onSave={onProfileSave} busy={busy} onCancel={onClose} />}
          {section === 'design' && <DesignEditor profile={profile} onSave={onDesignSave} busy={busy} />}
          {section === 'footer' && <FooterEditor profile={profile} onSave={onProfileSave} busy={busy} />}
          {tables.includes(section) && (
            <EntryManager
              section={section}
              entries={data[section]}
              onSave={(values, id) => onEntrySave(section, values, id)}
              onDelete={(entry) => onEntryDelete(section, entry)}
              busy={busy}
            />
          )}
        </div>
      </section>
    </main>
  )
}

function App() {
  const [profile, setProfile] = useState(supabase ? null : initialProfile)
  const [data, setData] = useState(supabase ? null : previewData)
  const [adminPage, setAdminPage] = useState(() => window.location.pathname.replace(/\/+$/, '') === '/admin')
  const [loading, setLoading] = useState(Boolean(supabase) && window.location.pathname.replace(/\/+$/, '') !== '/admin')
  const [loadError, setLoadError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [busy, setBusy] = useState(false)
  const [authError, setAuthError] = useState('')
  const [actionError, setActionError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    function syncAdminRoute() {
      setAdminPage(window.location.pathname.replace(/\/+$/, '') === '/admin')
    }

    window.addEventListener('popstate', syncAdminRoute)
    return () => window.removeEventListener('popstate', syncAdminRoute)
  }, [])

  function closeAdmin() {
    if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
      window.history.pushState({}, '', '/')
    }
    setAdminPage(false)
  }

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    async function checkAdmin(user) {
      if (!user) {
        if (active) setIsAdmin(false)
        return
      }
      const { data: admin, error } = await supabase
        .from('cv_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle()
      if (!active) return
      if (error) {
        setAuthError(`Imeshindikana kuthibitisha ruhusa za msimamizi: ${error.message}`)
        setIsAdmin(false)
        return
      }
      setIsAdmin(Boolean(admin))
      if (!admin) setAuthError('Akaunti hii haina ruhusa ya kusimamia CV.')
      else setAuthError('')
    }

    supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
      if (!active) return
      if (error) setAuthError(`Imeshindikana kusoma session: ${error.message}`)
      void checkAdmin(currentSession?.user)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setIsAdmin(false)
      Promise.resolve().then(() => checkAdmin(currentSession?.user))
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase) return
    if (adminPage && !isAdmin) return undefined

    let active = true
    async function load() {
      setLoading(true)
      setLoadError('')
      try {
        const [profileResult, ...listResults] = await Promise.all([
          supabase.from('cv_profile').select('*').eq('id', 1).maybeSingle(),
          ...tables.map((table) => supabase.from(`cv_${table}`).select('*').order('created_at', { ascending: true })),
        ])
        if (profileResult.error) throw new Error(`Wasifu: ${profileResult.error.message}`)
        if (!profileResult.data) throw new Error('Wasifu haujapatikana. Hakikisha schema na taarifa za mwanzo zimeongezwa Supabase.')
        const failedList = listResults.find((result) => result.error)
        if (failedList) throw new Error(failedList.error.message)
        if (!active) return
        setProfile(profileResult.data)
        setData(Object.fromEntries(tables.map((table, index) => [table, listResults[index].data || []])))
      } catch (error) {
        if (active) setLoadError(error instanceof Error ? error.message : 'Imeshindikana kupakia CV.')
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => { active = false }
  }, [adminPage, isAdmin])

  async function login(email, password) {
    if (!supabase) return
    setBusy(true)
    setAuthError('')
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setAuthError(`Imeshindikana kuingia: ${error.message}`)
    } catch (error) {
      setAuthError(`Imeshindikana kuingia: ${error instanceof Error ? error.message : 'Hitilafu isiyojulikana.'}`)
    } finally {
      setBusy(false)
    }
  }

  async function signOut() {
    if (!supabase) return
    try {
      const { error } = await supabase.auth.signOut()
      if (error) setActionError(`Imeshindikana kutoka: ${error.message}`)
      else {
        closeAdmin()
        setIsAdmin(false)
        setAuthError('')
      }
    } catch (error) {
      setActionError(`Imeshindikana kutoka: ${error instanceof Error ? error.message : 'Hitilafu isiyojulikana.'}`)
    }
  }

  async function saveProfile(values, message = 'Wasifu umehifadhiwa.') {
    if (!supabase) return
    setBusy(true)
    setActionError('')
    setSuccess('')
    const uploadedPaths = []
    try {
      const payload = { ...values }
      const photoFile = payload.photo_file
      delete payload.photo_file

      if (photoFile) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(photoFile.type)) {
          throw new Error('Picha lazima iwe JPG, PNG au WebP.')
        }
        if (photoFile.size > 10 * 1024 * 1024) {
          throw new Error('Picha imezidi ukubwa wa 10 MB.')
        }
        const safeName = photoFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const filePath = `profile/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('cv-assets').upload(filePath, photoFile, { upsert: false })
        if (uploadError) throw new Error(`Imeshindikana kupakia picha: ${uploadError.message}`)
        uploadedPaths.push(filePath)
        payload.photo_url = supabase.storage.from('cv-assets').getPublicUrl(filePath).data.publicUrl
      }

      const { data: saved, error } = await supabase.from('cv_profile').upsert({ ...payload, id: 1 }).select().single()
      if (error) throw error
      setProfile(saved)
      uploadedPaths.length = 0
      const previousPhotoPath = getCvAssetPath(profile.photo_url)
      const savedPhotoPath = getCvAssetPath(saved.photo_url)
      if (previousPhotoPath && previousPhotoPath !== savedPhotoPath) {
        try {
          const { error: cleanupError } = await supabase.storage.from('cv-assets').remove([previousPhotoPath])
          if (cleanupError) {
            setActionError(`Wasifu umehifadhiwa, lakini picha ya zamani haikuweza kufutwa kwenye storage: ${cleanupError.message}`)
          }
        } catch (cleanupError) {
          setActionError(`Wasifu umehifadhiwa, lakini picha ya zamani haikuweza kufutwa kwenye storage: ${cleanupError instanceof Error ? cleanupError.message : 'Hitilafu isiyojulikana.'}`)
        }
      }
      setSuccess(message)
      return saved
    } catch (error) {
      let cleanupMessage = ''
      if (uploadedPaths.length) {
        const { error: cleanupError } = await supabase.storage.from('cv-assets').remove(uploadedPaths)
        if (cleanupError) cleanupMessage = ` Pia, picha iliyopakiwa haikuweza kusafishwa: ${cleanupError.message}`
      }
      setActionError(`Imeshindikana kuhifadhi wasifu: ${error instanceof Error ? error.message : 'Hitilafu isiyojulikana.'}${cleanupMessage}`)
      return false
    } finally {
      setBusy(false)
    }
  }

  async function saveEntry(section, values, id) {
    if (!supabase) return
    setBusy(true)
    setActionError('')
    setSuccess('')
    const uploadedPaths = []
    try {
      const payload = { ...values }
      const files = payload.image_file
      const attachmentFields = ['certificate_files', 'transcript_files']
      const attachments = Object.fromEntries(attachmentFields.map((field) => [field, payload[field]]))
      delete payload.image_file
      attachmentFields.forEach((field) => delete payload[field])
      if (['education', 'experience', 'skills', 'achievements', 'training'].includes(section)
        && attachmentFields.some((field) => Array.isArray(attachments[field]) && attachments[field].length)) {
        const documents = Array.isArray(payload.documents) ? [...payload.documents] : []
        for (const field of attachmentFields) {
          const type = field === 'transcript_files' ? 'transcript' : 'certificate'
          for (const file of attachments[field] || []) {
            if (!['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(file.type)) {
              throw new Error(`Faili "${file.name}" lazima liwe JPG, PNG, WebP au PDF.`)
            }
            if (file.size > 10 * 1024 * 1024) {
              throw new Error(`Faili "${file.name}" limezidi ukubwa wa 10 MB.`)
            }
            const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
            const filePath = `${section}-${type}s/${crypto.randomUUID()}-${safeName}`
            const { error: uploadError } = await supabase.storage.from('cv-assets').upload(filePath, file, { upsert: false })
            if (uploadError) throw new Error(`Imeshindikana kupakia faili "${file.name}": ${uploadError.message}`)
            uploadedPaths.push(filePath)
            documents.push({
              type,
              label: file.name.replace(/\.[^.]+$/, ''),
              url: supabase.storage.from('cv-assets').getPublicUrl(filePath).data.publicUrl,
            })
          }
        }
        payload.documents = documents
      } else if (section === 'certificates' && Array.isArray(files) && files.length) {
        const documents = []
        for (const file of files) {
          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
          const filePath = `certificates/${crypto.randomUUID()}-${safeName}`
          const { error: uploadError } = await supabase.storage.from('cv-assets').upload(filePath, file, { upsert: false })
          if (uploadError) throw new Error(`Imeshindikana kupakia cheti: ${uploadError.message}`)
          uploadedPaths.push(filePath)
          documents.push({
            label: file.name.replace(/\.[^.]+$/, ''),
            url: supabase.storage.from('cv-assets').getPublicUrl(filePath).data.publicUrl,
          })
        }
        payload.documents = documents
        payload.image_url = documents[0].url
      } else if (section === 'certificates' && !id) {
        payload.image_url = ''
        payload.documents = []
      } else if (section === 'gallery' && Array.isArray(files) && files.length) {
        const file = files[0]
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          throw new Error('Picha lazima iwe JPG, PNG au WebP.')
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('Picha imezidi ukubwa wa 10 MB.')
        }
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const filePath = `gallery/${crypto.randomUUID()}-${safeName}`
        const { error: uploadError } = await supabase.storage.from('cv-assets').upload(filePath, file, { upsert: false })
        if (uploadError) throw new Error(`Imeshindikana kupakia picha: ${uploadError.message}`)
        uploadedPaths.push(filePath)
        payload.image_url = supabase.storage.from('cv-assets').getPublicUrl(filePath).data.publicUrl
      } else if (section === 'gallery' && !id) {
        throw new Error('Chagua picha ya kupakia.')
      }
      const previousGalleryImage = section === 'gallery' && id
        ? data.gallery.find((item) => item.id === id)?.image_url
        : null
      const previousDocuments = ['education', 'experience', 'skills', 'achievements', 'training'].includes(section) && id
        ? data[section].find((item) => item.id === id)?.documents || []
        : []
      const query = id
        ? supabase.from(sectionConfig[section].table).update(payload).eq('id', id)
        : supabase.from(sectionConfig[section].table).insert(payload)
      const { data: saved, error } = await query.select().single()
      if (error) throw error
      uploadedPaths.length = 0
      setData((current) => ({
        ...current,
        [section]: id
          ? current[section].map((item) => item.id === id ? saved : item)
          : [...current[section], saved],
      }))
      const previousPath = getCvAssetPath(previousGalleryImage)
      const nextPath = getCvAssetPath(saved.image_url)
      if (previousPath && previousPath !== nextPath) {
        const { error: cleanupError } = await supabase.storage.from('cv-assets').remove([previousPath])
        if (cleanupError) {
          setActionError(`Picha imehifadhiwa, lakini picha ya zamani haikuweza kufutwa kwenye storage: ${cleanupError.message}`)
        }
      }
      if (['education', 'experience', 'skills', 'achievements', 'training'].includes(section)) {
        const savedDocumentUrls = new Set((saved.documents || []).map((document) => document.url))
        const removedDocumentPaths = (Array.isArray(previousDocuments) ? previousDocuments : [])
          .filter((document) => !savedDocumentUrls.has(document.url))
          .map((document) => getCvAssetPath(document.url))
          .filter(Boolean)
        if (removedDocumentPaths.length) {
          const { error: cleanupError } = await supabase.storage.from('cv-assets').remove(removedDocumentPaths)
          if (cleanupError) {
            setActionError(`Taarifa imehifadhiwa, lakini baadhi ya vyeti vilivyoondolewa havikuweza kufutwa kwenye storage: ${cleanupError.message}`)
          }
        }
      }
      setSuccess(`${sectionConfig[section].singular} kimehifadhiwa.`)
      return true
    } catch (error) {
      let cleanupMessage = ''
      if (uploadedPaths.length) {
        const { error: cleanupError } = await supabase.storage.from('cv-assets').remove(uploadedPaths)
        if (cleanupError) cleanupMessage = ` Pia, faili zilizopakiwa hazikuweza kusafishwa: ${cleanupError.message}`
      }
      setActionError(`Imeshindikana kuhifadhi ${sectionConfig[section].singular}: ${error instanceof Error ? error.message : 'Hitilafu isiyojulikana.'}${cleanupMessage}`)
      return false
    } finally {
      setBusy(false)
    }
  }

  async function deleteEntry(section, entry) {
    if (!supabase || !window.confirm(`Una uhakika unataka kufuta "${entry.title || entry.qualification || entry.role || entry.name}"?`)) return
    setBusy(true)
    setActionError('')
    setSuccess('')
    try {
      const { error } = await supabase.from(sectionConfig[section].table).delete().eq('id', entry.id)
      if (error) throw error
      setData((current) => ({ ...current, [section]: current[section].filter((item) => item.id !== entry.id) }))
      const imagePath = section === 'gallery' ? getCvAssetPath(entry.image_url) : null
      const attachmentPaths = ['education', 'experience', 'skills', 'achievements', 'training'].includes(section)
        ? (Array.isArray(entry.documents) ? entry.documents : []).map((document) => getCvAssetPath(document.url)).filter(Boolean)
        : []
      const storagePaths = [...(imagePath ? [imagePath] : []), ...attachmentPaths]
      if (storagePaths.length) {
        const { error: storageError } = await supabase.storage.from('cv-assets').remove(storagePaths)
        if (storageError) {
          setActionError(`Taarifa imeondolewa kwenye CV, lakini baadhi ya faili zake hazikuweza kufutwa kwenye storage: ${storageError.message}`)
          return
        }
      }
      setSuccess(`${sectionConfig[section].singular} kimefutwa.`)
    } catch (error) {
      setActionError(`Imeshindikana kufuta taarifa: ${error instanceof Error ? error.message : 'Hitilafu isiyojulikana.'}`)
    } finally {
      setBusy(false)
    }
  }

  const openAdmin = () => {
    setActionError('')
    setSuccess('')
    if (window.location.pathname.replace(/\/+$/, '') !== '/admin') {
      window.history.pushState({}, '', '/admin')
    }
    setAdminPage(true)
  }

  if (adminPage && !isAdmin) {
    return (
      <LoginView
        error={authError}
        busy={busy}
        onLogin={login}
        onBack={() => { closeAdmin(); setAuthError('') }}
        configurationError={!supabase ? 'Supabase haijaunganishwa. Weka VITE_SUPABASE_URL na VITE_SUPABASE_PUBLISHABLE_KEY kwenye .env.' : ''}
      />
    )
  }

  if (loading && adminPage) {
    return <main className="loading-screen"><span className="loading-mark">CV</span><p>Inapakia wasifu...</p></main>
  }

  if (loadError && adminPage && isAdmin) {
    return (
      <main className="load-error">
        <span className="loading-mark">!</span>
        <h1>CV haijaweza kupakiwa</h1>
        <p>{loadError}</p>
        <button className="button button-primary" onClick={() => window.location.reload()}>Jaribu tena</button>
      </main>
    )
  }

  if (adminPage && isAdmin && profile && data) {
    return (
      <Dashboard
        profile={profile}
        data={data}
        onProfileSave={(values) => saveProfile(values)}
        onDesignSave={(values) => saveProfile(values, 'Muonekano umehifadhiwa.')}
        onEntrySave={saveEntry}
        onEntryDelete={deleteEntry}
        onSignOut={signOut}
        onClose={closeAdmin}
        busy={busy}
        error={actionError}
        success={success}
      />
    )
  }

  return (
    <PublicCv
      profile={profile || initialProfile}
      data={data || previewData}
      onAdmin={openAdmin}
      preview={!supabase || !profile || !data}
    />
  )
}

export default App
