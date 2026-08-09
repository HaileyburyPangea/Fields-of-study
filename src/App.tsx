import { useState, useMemo } from 'react'

const DOMAINS = [
  {
    id: 'sci',
    name: 'Natural & Physical Sciences',
    color: '#38bdf8',
    emoji: '⚛',
    subdomains: [
      { name: 'Mathematical Sciences', fields: ['Mathematics', 'Statistics', 'Mathematical Sciences'] },
      { name: 'Physics and Astronomy', fields: ['Physics', 'Astronomy'] },
      { name: 'Chemical Sciences', fields: ['Organic Chemistry', 'Inorganic Chemistry', 'Chemical Sciences'] },
      { name: 'Earth Sciences', fields: ['Atmospheric Sciences', 'Geology', 'Geophysics', 'Geochemistry', 'Soil Science', 'Hydrology', 'Oceanography', 'Earth Sciences'] },
      { name: 'Biological Sciences', fields: ['Biochemistry and Cell Biology', 'Botany', 'Ecology and Evolution', 'Marine Science', 'Genetics', 'Microbiology', 'Human Biology', 'Zoology', 'Biological Sciences'] },
      { name: 'Other Natural Sciences', fields: ['Medical Science', 'Forensic Science', 'Food Science and Biotechnology', 'Pharmacology', 'Laboratory Technology'] },
    ],
  },
  {
    id: 'it',
    name: 'Information Technology',
    color: '#a78bfa',
    emoji: '⌨',
    subdomains: [
      { name: 'Computer Science', fields: ['Formal Language Theory', 'Programming', 'Computational Theory', 'Compiler Construction', 'Algorithms', 'Data Structures', 'Networks and Communications', 'Computer Graphics', 'Operating Systems', 'Artificial Intelligence', 'Computer Science'] },
      { name: 'Information Systems', fields: ['Conceptual Modelling', 'Database Management', 'Systems Analysis and Design', 'Decision Support Systems', 'Information Systems'] },
      { name: 'Other Information Technology', fields: ['Security Science', 'Information Technology'] },
    ],
  },
  {
    id: 'eng',
    name: 'Engineering & Technologies',
    color: '#fb923c',
    emoji: '⚙',
    subdomains: [
      { name: 'Manufacturing Engineering', fields: ['Manufacturing Engineering', 'Printing', 'Textile Making', 'Garment Making', 'Footwear Making', 'Wood Machining and Turning', 'Cabinet Making', 'Furniture Upholstery and Renovation', 'Furniture Polishing'] },
      { name: 'Process & Resources Engineering', fields: ['Chemical Engineering', 'Mining Engineering', 'Materials Engineering', 'Food Processing Technology'] },
      { name: 'Automotive Engineering', fields: ['Automotive Engineering', 'Vehicle Mechanics', 'Automotive Electrics and Electronics', 'Automotive Vehicle Refinishing', 'Automotive Body Construction', 'Panel Beating', 'Upholstery and Vehicle Trimming'] },
      { name: 'Mechanical & Industrial Engineering', fields: ['Mechanical Engineering', 'Industrial Engineering', 'Toolmaking', 'Metal Fitting', 'Turning and Machining', 'Sheetmetal Working', 'Boilermaking and Welding', 'Metal Casting and Patternmaking', 'Precision Metalworking', 'Plant and Machine Operations'] },
      { name: 'Civil Engineering', fields: ['Construction Engineering', 'Structural Engineering', 'Building Services Engineering', 'Water and Sanitary Engineering', 'Transport Engineering', 'Geotechnical Engineering', 'Ocean Engineering', 'Civil Engineering'] },
      { name: 'Geomatic Engineering', fields: ['Surveying', 'Mapping Science', 'Geomatic Engineering'] },
      { name: 'Electrical & Electronic Engineering', fields: ['Electrical Engineering', 'Electronic Engineering', 'Computer Engineering', 'Communications Technologies', 'Powerline Installation and Maintenance', 'Electrical Fitting', 'Electrical Mechanics', 'Refrigeration and Air Conditioning Mechanics', 'Electronic Equipment Servicing'] },
      { name: 'Aerospace Engineering', fields: ['Aerospace Engineering', 'Aircraft Maintenance Engineering', 'Aircraft Operation', 'Air Traffic Control'] },
      { name: 'Maritime Engineering', fields: ['Maritime Engineering', 'Marine Construction', 'Marine Craft Operation'] },
      { name: 'Other Engineering', fields: ['Environmental Engineering', 'Biomedical Engineering', 'Fire Technology', 'Rail Operations', 'Cleaning'] },
    ],
  },
  {
    id: 'arch',
    name: 'Architecture & Building',
    color: '#f472b6',
    emoji: '🏛',
    subdomains: [
      { name: 'Architecture & Urban Environment', fields: ['Architecture', 'Urban Design and Regional Planning', 'Landscape Architecture', 'Interior and Environmental Design'] },
      { name: 'Building', fields: ['Building Science and Technology', 'Building Construction Management', 'Building Surveying', 'Building Construction Economics', 'Bricklaying and Stonemasonry', 'Carpentry and Joinery', 'Ceiling, Wall and Floor Fixing', 'Roof Fixing', 'Plastering', 'Furnishing Installation', 'Floor Coverings', 'Glazing', 'Painting, Decorating and Sign Writing', 'Plumbing', 'Scaffolding and Rigging'] },
    ],
  },
  {
    id: 'agri',
    name: 'Agriculture & Environment',
    color: '#4ade80',
    emoji: '🌿',
    subdomains: [
      { name: 'Agriculture', fields: ['Agricultural Science', 'Wool Science', 'Animal Husbandry', 'Agriculture'] },
      { name: 'Horticulture and Viticulture', fields: ['Horticulture', 'Viticulture'] },
      { name: 'Forestry Studies', fields: ['Forestry Studies'] },
      { name: 'Fisheries Studies', fields: ['Aquaculture', 'Fisheries Studies'] },
      { name: 'Environmental Studies', fields: ['Land, Parks and Wildlife Management', 'Environmental Studies'] },
      { name: 'Other Agriculture', fields: ['Pest and Weed Control', 'Agriculture, Environmental and Related Studies'] },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    color: '#f87171',
    emoji: '✚',
    subdomains: [
      { name: 'Medical Studies', fields: ['General Medicine', 'Surgery', 'Psychiatry', 'Obstetrics and Gynaecology', 'Paediatrics', 'Anaesthesiology', 'Pathology', 'Radiology', 'Internal Medicine', 'General Practice'] },
      { name: 'Nursing', fields: ['General Nursing', 'Midwifery', 'Mental Health Nursing', 'Community Nursing', 'Critical Care Nursing', 'Aged Care Nursing', 'Palliative Care Nursing', 'Mothercraft Nursing and Family and Child Health Nursing'] },
      { name: 'Pharmacy', fields: ['Pharmacy'] },
      { name: 'Dental Studies', fields: ['Dentistry', 'Dental Assisting', 'Dental Technology'] },
      { name: 'Optical Science', fields: ['Optometry', 'Optical Technology', 'Optical Science'] },
      { name: 'Veterinary Studies', fields: ['Veterinary Science', 'Veterinary Assisting'] },
      { name: 'Public Health', fields: ['Occupational Health and Safety', 'Environmental Health', 'Indigenous Health', 'Health Promotion', 'Community Health', 'Epidemiology'] },
      { name: 'Radiography', fields: ['Radiography'] },
      { name: 'Rehabilitation Therapies', fields: ['Physiotherapy', 'Occupational Therapy', 'Chiropractic and Osteopathy', 'Speech Pathology', 'Audiology', 'Massage Therapy', 'Podiatry'] },
      { name: 'Complementary Therapies', fields: ['Naturopathy', 'Acupuncture', 'Traditional Chinese Medicine'] },
      { name: 'Other Health', fields: ['Nutrition and Dietetics', 'Human Movement', 'Paramedical Studies', 'First Aid'] },
    ],
  },
  {
    id: 'edu',
    name: 'Education',
    color: '#facc15',
    emoji: '📖',
    subdomains: [
      { name: 'Teacher Education', fields: ['Teacher Education: Early Childhood', 'Teacher Education: Primary', 'Teacher Education: Secondary', 'Teacher-Librarianship', 'Teacher Education: Vocational Education and Training', 'Teacher Education: Higher Education', 'Teacher Education: Special Education', 'English as a Second Language Teaching', 'Nursing Education Teacher Training'] },
      { name: 'Curriculum and Education Studies', fields: ['Curriculum Studies', 'Education Studies'] },
      { name: 'Other Education', fields: ['Education'] },
    ],
  },
  {
    id: 'mgmt',
    name: 'Management & Commerce',
    color: '#60a5fa',
    emoji: '◈',
    subdomains: [
      { name: 'Accounting', fields: ['Accounting'] },
      { name: 'Business and Management', fields: ['Business Management', 'Human Resource Management', 'Personal Management Training', 'Organisation Management', 'Industrial Relations', 'International Business', 'Public and Health Care Administration', 'Project Management', 'Quality Management', 'Hospitality Management', 'Farm Management and Agribusiness', 'Tourism Management'] },
      { name: 'Sales and Marketing', fields: ['Sales', 'Real Estate', 'Marketing', 'Advertising', 'Public Relations'] },
      { name: 'Tourism', fields: ['Tourism'] },
      { name: 'Office Studies', fields: ['Secretarial and Clerical Studies', 'Keyboard Skills', 'Practical Computing Skills', 'Office Studies'] },
      { name: 'Banking, Finance and Related Fields', fields: ['Banking and Finance', 'Insurance and Actuarial Studies', 'Investment and Securities'] },
      { name: 'Other Management and Commerce', fields: ['Purchasing, Warehousing and Distribution', 'Valuation'] },
    ],
  },
  {
    id: 'soc',
    name: 'Society & Culture',
    color: '#e879f9',
    emoji: '◎',
    subdomains: [
      { name: 'Political Science and Policy Studies', fields: ['Political Science', 'Policy Studies'] },
      { name: 'Studies in Human Society', fields: ['Sociology', 'Anthropology', 'History', 'Archaeology', 'Human Geography', 'Indigenous Studies', 'Gender Specific Studies'] },
      { name: 'Human Welfare Studies and Services', fields: ['Social Work', "Children's Services", 'Youth Work', 'Care for the Aged', 'Care for the Disabled', 'Residential Client Care', 'Counselling', 'Welfare Studies'] },
      { name: 'Behavioural Science', fields: ['Psychology', 'Behavioural Science'] },
      { name: 'Law', fields: ['Business and Commercial Law', 'Constitutional Law', 'Criminal Law', 'Family Law', 'International Law', 'Taxation Law', 'Legal Practice'] },
      { name: 'Justice and Law Enforcement', fields: ['Justice Administration', 'Legal Studies', 'Police Studies'] },
      { name: 'Librarianship and Information Management', fields: ['Librarianship and Information Management', 'Curatorial Studies'] },
      { name: 'Language and Literature', fields: ['English Language', 'Northern European Languages', 'Southern European Languages', 'Eastern European Languages', 'Southwest Asian and North African Languages', 'Southern Asian Languages', 'Southeast Asian Languages', 'Eastern Asian Languages', 'Australian Indigenous Languages', 'Translating and Interpreting', 'Linguistics', 'Literature'] },
      { name: 'Philosophy and Religious Studies', fields: ['Philosophy', 'Religious Studies'] },
      { name: 'Economics and Econometrics', fields: ['Economics', 'Econometrics'] },
      { name: 'Sport and Recreation', fields: ['Sport and Recreation Activities', 'Sports Coaching, Officiating and Instruction', 'Sport and Recreation'] },
      { name: 'Other Society and Culture', fields: ['Family and Consumer Studies', 'Criminology', 'Security Services'] },
    ],
  },
  {
    id: 'arts',
    name: 'Creative Arts',
    color: '#fb7185',
    emoji: '◇',
    subdomains: [
      { name: 'Performing Arts', fields: ['Music', 'Drama and Theatre Studies', 'Dance', 'Performing Arts'] },
      { name: 'Visual Arts and Crafts', fields: ['Fine Arts', 'Photography', 'Crafts', 'Jewellery Making', 'Floristry'] },
      { name: 'Graphic and Design Studies', fields: ['Graphic Arts and Design Studies', 'Textile Design', 'Fashion Design'] },
      { name: 'Communication and Media Studies', fields: ['Audio Visual Studies', 'Journalism', 'Written Communication', 'Verbal Communication'] },
      { name: 'Other Creative Arts', fields: ['Creative Arts'] },
    ],
  },
  {
    id: 'food',
    name: 'Food, Hospitality & Personal Services',
    color: '#fdba74',
    emoji: '◉',
    subdomains: [
      { name: 'Food and Hospitality', fields: ['Hospitality', 'Food and Beverage Service', 'Butchery', 'Baking and Pastrymaking', 'Cookery', 'Food Hygiene'] },
      { name: 'Personal Services', fields: ['Beauty Therapy', 'Hairdressing', 'Personal Services'] },
    ],
  },
  {
    id: 'mixed',
    name: 'Mixed Field Programmes',
    color: '#94a3b8',
    emoji: '⊕',
    subdomains: [
      { name: 'General Education Programmes', fields: ['General Primary and Secondary Education Programmes', 'Literacy and Numeracy Programmes', 'Learning Skills Programmes'] },
      { name: 'Social Skills Programmes', fields: ['Social and Interpersonal Skills Programmes', 'Survival Skills Programmes', 'Parental Education Programmes'] },
      { name: 'Employment Skills Programmes', fields: ['Career Development Programmes', 'Job Search Skills Programmes', 'Work Practices Programmes'] },
      { name: 'Other Mixed Field Programmes', fields: ['Mixed Field Programmes'] },
    ],
  },
]

function hex2rgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export default function App() {
  const [activeDomainIdx, setActiveDomainIdx] = useState<number | null>(null)
  const [activeSubIdx, setActiveSubIdx] = useState<number | null>(null)

  const domain = activeDomainIdx !== null ? DOMAINS[activeDomainIdx] : null
  const subdomain = domain && activeSubIdx !== null ? domain.subdomains[activeSubIdx] : null

  const totalFields = useMemo(() =>
    DOMAINS.reduce((sum, d) => sum + d.subdomains.reduce((s, sd) => s + sd.fields.length, 0), 0),
    []
  )

  function handleDomainClick(idx: number) {
    if (activeDomainIdx === idx) {
      setActiveDomainIdx(null)
      setActiveSubIdx(null)
    } else {
      setActiveDomainIdx(idx)
      setActiveSubIdx(null)
    }
  }

  function handleSubClick(idx: number) {
    setActiveSubIdx(activeSubIdx === idx ? null : idx)
  }

  const col = domain?.color ?? '#38bdf8'

  return (
    <div style={{ background: '#060612', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Star field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: [
            'radial-gradient(1px 1px at 15% 20%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 72% 8%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1.5px 1.5px at 43% 55%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 88% 32%, rgba(255,255,255,0.6) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 27% 79%, rgba(255,255,255,0.35) 0%, transparent 100%)',
            'radial-gradient(1.5px 1.5px at 60% 88%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 5% 46%, rgba(255,255,255,0.4) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 93% 71%, rgba(255,255,255,0.5) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 52% 13%, rgba(255,255,255,0.45) 0%, transparent 100%)',
            'radial-gradient(1.5px 1.5px at 33% 37%, rgba(255,255,255,0.3) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 79% 62%, rgba(255,255,255,0.55) 0%, transparent 100%)',
            'radial-gradient(1px 1px at 18% 93%, rgba(255,255,255,0.4) 0%, transparent 100%)',
          ].join(', '),
        }} />
        {/* Nebula glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(56,189,248,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 80% 70%, rgba(167,139,250,0.04) 0%, transparent 60%)',
        }} />
      </div>

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, padding: '48px 48px 32px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, boxShadow: `0 0 12px ${col}`, transition: 'all 0.4s ease' }} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: '#64748b', textTransform: 'uppercase' }}>
              Knowledge Navigator
            </span>
          </div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 16px', color: '#f1f5f9' }}>
            Academic Fields Explorer
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#94a3b8', maxWidth: 560, margin: 0 }}>
            A navigable map of academic disciplines across{' '}
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{DOMAINS.length} domains</span>{' '}
            and over <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{totalFields} specialisations</span>.{' '}
            <span style={{ color: '#475569', fontStyle: 'italic' }}>
              Note: this is not an exhaustive list — many emerging, interdisciplinary, and regional fields are not represented here.
            </span>
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{ position: 'relative', zIndex: 10, height: 40, display: 'flex', alignItems: 'center', padding: '0 48px', borderBottom: '1px solid rgba(255,255,255,0.04)', gap: 8, fontSize: 12, color: '#475569', fontFamily: 'Outfit, sans-serif' }}>
        <span style={{ color: '#334155' }}>All fields</span>
        {domain && (
          <>
            <span>›</span>
            <span style={{ color: domain.color }}>{domain.name}</span>
          </>
        )}
        {subdomain && (
          <>
            <span>›</span>
            <span style={{ color: '#94a3b8' }}>{subdomain.name}</span>
          </>
        )}
        {!domain && (
          <span style={{ marginLeft: 8, color: '#1e293b', fontSize: 11, fontStyle: 'italic' }}>
            Select a domain to begin exploring
          </span>
        )}
      </div>

      {/* Main 3-column explorer */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '280px 1fr 1fr',
        gap: 0,
        overflow: 'hidden',
        minHeight: 0,
      }}>
        {/* Column 1: Domains */}
        <div style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
          padding: '16px 0',
        }}>
          <div style={{ padding: '0 16px 8px', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: '#334155', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
            Domains
          </div>
          {DOMAINS.map((d, i) => {
            const isActive = activeDomainIdx === i
            const total = d.subdomains.reduce((s, sd) => s + sd.fields.length, 0)
            return (
              <button
                key={d.id}
                onClick={() => handleDomainClick(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? hex2rgba(d.color, 0.08) : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${isActive ? d.color : 'transparent'}`,
                  padding: '10px 16px 10px 13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'all 0.18s ease',
                  color: isActive ? '#f1f5f9' : '#64748b',
                  fontFamily: 'Outfit, sans-serif',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                    ;(e.currentTarget as HTMLElement).style.color = '#94a3b8'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = '#64748b'
                  }
                }}
              >
                <span style={{
                  width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 14,
                  background: isActive ? hex2rgba(d.color, 0.15) : 'rgba(255,255,255,0.04)',
                  color: isActive ? d.color : '#475569',
                  flexShrink: 0,
                  transition: 'all 0.18s ease',
                }}>
                  {d.emoji}
                </span>
                <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, lineHeight: 1.3, flex: 1 }}>
                  {d.name}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: isActive ? d.color : '#1e293b',
                  background: isActive ? hex2rgba(d.color, 0.12) : 'rgba(255,255,255,0.04)',
                  padding: '2px 6px', borderRadius: 4,
                  transition: 'all 0.18s ease',
                  flexShrink: 0,
                }}>
                  {total}
                </span>
              </button>
            )
          })}
        </div>

        {/* Column 2: Sub-domains */}
        <div style={{
          borderRight: '1px solid rgba(255,255,255,0.06)',
          overflowY: 'auto',
          padding: '16px',
          position: 'relative',
        }}>
          {domain ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: domain.color, boxShadow: `0 0 8px ${domain.color}` }} />
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: domain.color, textTransform: 'uppercase', opacity: 0.8 }}>
                  {domain.subdomains.length} sub-domains
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {domain.subdomains.map((sd, i) => {
                  const isActive = activeSubIdx === i
                  return (
                    <button
                      key={i}
                      onClick={() => handleSubClick(i)}
                      style={{
                        textAlign: 'left',
                        background: isActive ? hex2rgba(domain.color, 0.1) : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isActive ? hex2rgba(domain.color, 0.4) : 'rgba(255,255,255,0.06)'}`,
                        borderRadius: 10,
                        padding: '12px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        transition: 'all 0.18s ease',
                        color: isActive ? '#f1f5f9' : '#94a3b8',
                        fontFamily: 'Outfit, sans-serif',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
                          ;(e.currentTarget as HTMLElement).style.color = '#e2e8f0'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
                          ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
                          ;(e.currentTarget as HTMLElement).style.color = '#94a3b8'
                        }
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, lineHeight: 1.3, marginBottom: 3 }}>
                          {sd.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#475569' }}>
                          {sd.fields.length} {sd.fields.length === 1 ? 'field' : 'fields'}
                        </div>
                      </div>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? hex2rgba(domain.color, 0.2) : 'rgba(255,255,255,0.04)',
                        color: isActive ? domain.color : '#334155',
                        fontSize: 14,
                        transition: 'all 0.18s ease',
                        flexShrink: 0,
                      }}>
                        {isActive ? '›' : '›'}
                      </div>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <EmptyState col={1} />
          )}
        </div>

        {/* Column 3: Fields */}
        <div style={{
          overflowY: 'auto',
          padding: '16px',
        }}>
          {subdomain && domain ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: domain.color, boxShadow: `0 0 8px ${domain.color}` }} />
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', color: domain.color, textTransform: 'uppercase', opacity: 0.8 }}>
                  {subdomain.fields.length} specialisations
                </span>
              </div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, fontWeight: 600, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.3 }}>
                {subdomain.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {subdomain.fields.map((field, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '7px 12px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 500,
                      background: hex2rgba(domain.color, 0.08),
                      border: `1px solid ${hex2rgba(domain.color, 0.2)}`,
                      color: '#cbd5e1',
                      transition: 'all 0.15s ease',
                      cursor: 'default',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = hex2rgba(domain.color, 0.16)
                      ;(e.currentTarget as HTMLElement).style.borderColor = hex2rgba(domain.color, 0.4)
                      ;(e.currentTarget as HTMLElement).style.color = '#f1f5f9'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${hex2rgba(domain.color, 0.15)}`
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = hex2rgba(domain.color, 0.08)
                      ;(e.currentTarget as HTMLElement).style.borderColor = hex2rgba(domain.color, 0.2)
                      ;(e.currentTarget as HTMLElement).style.color = '#cbd5e1'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                    }}
                  >
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: domain.color, opacity: 0.7, flexShrink: 0 }} />
                    {field}
                  </span>
                ))}
              </div>
            </>
          ) : domain ? (
            <EmptyState col={2} domain={domain} />
          ) : (
            <EmptyState col={1} />
          )}
        </div>
      </div>

      {/* Footer stat bar */}
      <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.04)', padding: '12px 48px', display: 'flex', gap: 32, fontSize: 11, color: '#334155', fontFamily: 'Outfit, sans-serif' }}>
        {[
          { label: 'Domains', value: DOMAINS.length },
          { label: 'Sub-domains', value: DOMAINS.reduce((s, d) => s + d.subdomains.length, 0) },
          { label: 'Specialisations', value: totalFields },
        ].map(stat => (
          <div key={stat.label} style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#475569' }}>{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        ))}
        <span style={{ marginLeft: 'auto', fontStyle: 'italic', color: '#1e293b' }}>
          Source: Australian Standard Classification of Education (ASCED)
        </span>
      </div>
    </div>
  )
}

function EmptyState({ col, domain }: { col: number; domain?: typeof DOMAINS[0] }) {
  const messages = [
    { heading: 'Choose a domain', sub: 'Select a field of study from the left panel to begin exploring its sub-disciplines.' },
    { heading: 'Choose a sub-domain', sub: `${domain?.name ?? 'This domain'} contains ${domain?.subdomains.length ?? ''} sub-domains. Select one to view its specialisations.` },
  ]
  const msg = messages[col - 1] ?? messages[0]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 240, gap: 12, textAlign: 'center', padding: 32 }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, color: '#1e293b',
        background: 'rgba(255,255,255,0.02)',
        marginBottom: 4,
      }}>
        {col === 1 ? '⊛' : '⊙'}
      </div>
      <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, fontWeight: 600, color: '#334155' }}>
        {msg.heading}
      </div>
      <div style={{ fontSize: 12, color: '#1e293b', lineHeight: 1.6, maxWidth: 220 }}>
        {msg.sub}
      </div>
    </div>
  )
}
