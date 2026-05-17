import { useContext, useState } from 'react'
import { UserContext } from './UserContext'
import { ThemeContext } from './ThemeContext'

// ─────────────────────────────────────────────
// LEVEL 3 (deepest) — reads user directly from
// context; no props needed at all
// ─────────────────────────────────────────────
function DemoUserProfile() {
  const { user, updateUser } = useContext(UserContext)
  const { themeValues } = useContext(ThemeContext)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ name: user.name, email: user.email, role: user.role })

  const labelStyle = { color: themeValues.subtext, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }
  const valueStyle = { color: themeValues.text, fontSize: '0.95rem', margin: '2px 0 12px' }
  const inputStyle = {
    border: `1px solid ${themeValues.border}`,
    borderRadius: '8px',
    padding: '8px 10px',
    font: 'inherit',
    background: themeValues.background,
    color: themeValues.text,
    width: '100%',
    marginBottom: '10px',
  }

  function handleSave() {
    updateUser(draft)
    setEditing(false)
  }

  return (
    <div style={{ padding: '16px', border: `1px dashed ${themeValues.border}`, borderRadius: '10px', background: themeValues.background }}>
      <p style={{ margin: '0 0 10px', fontSize: '0.7rem', color: themeValues.subtext }}>
        📍 <strong>DemoUserProfile</strong> — Level 3 (deepest) — reads via <code>useContext(UserContext)</code>, zero props passed
      </p>

      {editing ? (
        <>
          <input style={inputStyle} value={draft.name} onChange={e => setDraft(p => ({ ...p, name: e.target.value }))} placeholder="Name" />
          <input style={inputStyle} value={draft.email} onChange={e => setDraft(p => ({ ...p, email: e.target.value }))} placeholder="Email" />
          <input style={inputStyle} value={draft.role} onChange={e => setDraft(p => ({ ...p, role: e.target.value }))} placeholder="Role" />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleSave} style={{ flex: 1 }}>💾 Save</button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, background: '#6b7280' }}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p style={labelStyle}>Name</p>
          <p style={valueStyle}>{user.name}</p>
          <p style={labelStyle}>Email</p>
          <p style={valueStyle}>{user.email}</p>
          <p style={labelStyle}>Role</p>
          <p style={valueStyle}>{user.role}</p>
          <p style={labelStyle}>Member Since</p>
          <p style={{ ...valueStyle, marginBottom: 0 }}>{user.joinDate}</p>
          <button onClick={() => { setDraft({ name: user.name, email: user.email, role: user.role }); setEditing(true) }}
            style={{ marginTop: '12px', width: '100%', background: '#7c3aed' }}>
            ✏️ Edit Profile
          </button>
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// LEVEL 2 — middle layer; does NOT use user at
// all, just renders DemoUserProfile
// ─────────────────────────────────────────────
function DemoSidebar() {
  const { themeValues } = useContext(ThemeContext)
  return (
    <div style={{ padding: '14px', border: `1px dashed ${themeValues.border}`, borderRadius: '10px' }}>
      <p style={{ margin: '0 0 10px', fontSize: '0.7rem', color: themeValues.subtext }}>
        📍 <strong>DemoSidebar</strong> — Level 2 — does <em>not</em> use user data, passes nothing down
      </p>
      <DemoUserProfile />
    </div>
  )
}

// ─────────────────────────────────────────────
// LEVEL 1 — middle layer; also does NOT use
// user, just renders DemoSidebar
// ─────────────────────────────────────────────
function DemoDashboard() {
  const { themeValues } = useContext(ThemeContext)
  return (
    <div style={{ padding: '14px', border: `1px dashed ${themeValues.border}`, borderRadius: '10px' }}>
      <p style={{ margin: '0 0 10px', fontSize: '0.7rem', color: themeValues.subtext }}>
        📍 <strong>DemoDashboard</strong> — Level 1 — does <em>not</em> use user data, passes nothing down
      </p>
      <DemoSidebar />
    </div>
  )
}

// ─────────────────────────────────────────────
// Root demo component — owns UserProvider so
// the tree is self-contained in the dashboard
// ─────────────────────────────────────────────
export default function PropDrillingDemo() {
  const { themeValues } = useContext(ThemeContext)

  return (
    <section style={{ borderTop: `1px solid ${themeValues.border}`, paddingTop: '24px' }}>
      <h2 style={{ margin: '0 0 6px', color: themeValues.text }}>Prop Drilling → Context Refactor</h2>
      <p style={{ margin: '0 0 4px', color: themeValues.subtext, fontSize: '0.9rem' }}>
        The component tree below is <strong>App → DemoDashboard → DemoSidebar → DemoUserProfile</strong>.
      </p>
      <p style={{ margin: '0 0 16px', color: themeValues.subtext, fontSize: '0.9rem' }}>
        In the "before" scenario, <code>user</code> would be threaded as a prop through every level.
        After the refactor, only the deepest component consumes it via <code>useContext(UserContext)</code> — the middle layers are prop-free.
      </p>

      {/* Visual "before" callout */}
      <div style={{
        background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d',
        borderRadius: '10px', padding: '12px 16px', marginBottom: '12px', fontSize: '0.82rem',
      }}>
        <strong>❌ Before (Prop Drilling):</strong>
        <br />
        <code>{'<App user={user}>'}</code> →{' '}
        <code>{'<DemoDashboard user={user}>'}</code> →{' '}
        <code>{'<DemoSidebar user={user}>'}</code> →{' '}
        <code>{'<DemoUserProfile user={user}>'}</code>
      </div>

      {/* Visual "after" callout */}
      <div style={{
        background: '#dcfce7', color: '#166534', border: '1px solid #86efac',
        borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', fontSize: '0.82rem',
      }}>
        <strong>✅ After (Context):</strong>
        <br />
        <code>{'<UserProvider>'}</code> wraps all → <code>DemoUserProfile</code> calls{' '}
        <code>{'useContext(UserContext)'}</code> directly — no props drilled
      </div>

      <DemoDashboard />
    </section>
  )
}
