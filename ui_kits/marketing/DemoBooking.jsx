/* Marketing — "Book a demo": single-date picker (js/np-datepicker.js) + time-slot chips + a validated form.
   The picker owns the date input (uncontrolled); React listens to its np-datepicker:change / :invalid events. */
const DEMO_SLOTS = ['09:00', '10:30', '13:00', '15:30'];
const DEMO_POINTS = [
  ['activity', 'A live node on your own traffic.'],
  ['timer', '20 minutes. No slides.'],
  ['shield-check', 'No card. No follow-up spam.'],
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DAY_LABEL = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const MSG = {
  dateEmpty: 'Pick a day for the demo.',
  dateFormat: 'Use DD/MM/YYYY.',
  dateRange: 'Weekdays within the next 60 days only.',
  slot: 'Choose a time slot.',
  emailEmpty: 'Enter your work email.',
  email: 'That email looks off. Try name@company.com.',
};

function DemoBooking() {
  const pickerRef = React.useRef(null);
  const [date, setDate] = React.useState(null);   // { label } once a valid day is picked or typed
  const [slot, setSlot] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(null);
  const liveRef = React.useRef(null);
  const setError = (key, msg) => setErrors(e => ({ ...e, [key]: msg }));

  React.useEffect(() => {
    const el = pickerRef.current;
    const api = window.NPDatepicker.mount(el, { min: 'today', max: '+60d', weekends: false, locale: 'en-GB' });
    const onChange = e => {
      setDone(null);
      if (e.detail.value) { setDate({ label: DAY_LABEL.format(e.detail.start) }); setError('date', null); } else setDate(null);
    };
    const onInvalid = e => { setDone(null); setDate(null); setError('date', e.detail.reason === 'format' ? MSG.dateFormat : MSG.dateRange); };
    el.addEventListener('np-datepicker:change', onChange);
    el.addEventListener('np-datepicker:invalid', onInvalid);
    return () => { el.removeEventListener('np-datepicker:change', onChange); el.removeEventListener('np-datepicker:invalid', onInvalid); api.close(); };
  }, []);

  // on a phone the confirmation lands below the fold: bring it into view
  React.useEffect(() => { if (done) liveRef.current.scrollIntoView({ block: 'nearest' }); }, [done]);

  const submit = e => {
    e.preventDefault();
    const mail = email.trim();
    const err = {
      date: date ? null : (errors.date || MSG.dateEmpty),
      slot: slot ? null : MSG.slot,
      email: EMAIL_RE.test(mail) ? null : (mail ? MSG.email : MSG.emailEmpty),
    };
    setErrors(err);
    const firstBad = err.date ? 'demo-date' : err.slot ? 'demo-slot-0' : err.email ? 'demo-email' : null;
    if (firstBad) { setDone(null); document.getElementById(firstBad).focus(); return; }
    setDone({ when: date.label + ' · ' + slot, email: mail });
  };
  const edit = (setter, key) => e => { setter(e.target.value); setDone(null); if (key) setError(key, null); };

  return (
    <section id="demo" aria-labelledby="demo-title" className="np-container" style={{ paddingBlock: '0 90px' }}>
      <div className="np-card mk-demo">
        <div className="mk-demo-grid">
          <div>
            <div className="np-eyebrow"><span className="np-livedot" />Demo</div>
            <h2 id="demo-title" style={{ font: 'var(--h1)', color: 'var(--color-text)', letterSpacing: '-0.02em', margin: '16px 0 0' }}>See it live.</h2>
            <p style={{ font: 'var(--body-lg)', color: 'var(--color-text-secondary)', maxWidth: 420, margin: '16px 0 0' }}>
              Pick a slot. An engineer deploys a node with you and you watch it go live.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {DEMO_POINTS.map(([icon, text]) => (
                <li key={text} style={{ display: 'flex', gap: 10, alignItems: 'center', font: 'var(--body-sm)', color: 'var(--color-text-secondary)' }}>
                  <span aria-hidden="true" style={{ color: 'var(--color-accent)', display: 'flex' }}><Icon name={icon} size={16} /></span>{text}
                </li>
              ))}
            </ul>
          </div>

          <form noValidate onSubmit={submit} aria-label="Book a demo" className="np-stack" style={{ gap: 20 }}>
            <div className={'np-field' + (errors.date ? ' is-invalid' : '')}>
              <label className="np-field__label" htmlFor="demo-date">Date</label>
              <div ref={pickerRef} className="np-datepicker">
                <div className="np-inputgroup">
                  <input id="demo-date" autoComplete="off" aria-describedby="demo-date-h" aria-invalid={errors.date ? 'true' : undefined} />
                  <button type="button" className="np-icon-btn np-icon-btn--sm np-icon-btn--ghost np-datepicker__toggle" aria-label="Open calendar"><Icon name="calendar" size={16} /></button>
                </div>
              </div>
              <span className="np-field__hint" id="demo-date-h">{errors.date || 'Weekdays, next 60 days.'}</span>
            </div>

            <div className={'np-field' + (errors.slot ? ' is-invalid' : '')} role="group" aria-labelledby="demo-slot-l" aria-describedby="demo-slot-h">
              <span className="np-field__label" id="demo-slot-l">Time slot</span>
              <div className="np-cluster" style={{ gap: 8 }}>
                {DEMO_SLOTS.map((s, i) => (
                  <button key={s} id={'demo-slot-' + i} type="button" className="np-chip" aria-pressed={slot === s}
                    onClick={() => { setSlot(s); setDone(null); setError('slot', null); }}>{s}</button>
                ))}
              </div>
              <span className="np-field__hint" id="demo-slot-h">{errors.slot || 'Your local time.'}</span>
            </div>

            <div className="np-field">
              <label className="np-field__label" htmlFor="demo-name">Name · optional</label>
              <input id="demo-name" className="np-input" autoComplete="name" placeholder="Kira Vance" value={name} onChange={edit(setName)} />
            </div>

            <div className={'np-field' + (errors.email ? ' is-invalid' : '')}>
              <label className="np-field__label" htmlFor="demo-email">Work email</label>
              <input id="demo-email" type="email" className="np-input" autoComplete="email" inputMode="email" placeholder="you@company.com"
                value={email} onChange={edit(setEmail, 'email')} aria-describedby="demo-email-h" aria-invalid={errors.email ? 'true' : undefined} />
              <span className="np-field__hint" id="demo-email-h">{errors.email || 'The invite goes here.'}</span>
            </div>

            <button type="submit" className="np-btn np-btn--primary np-btn--lg np-btn--block"><Icon name="calendar-check" size={16} /><span>Book demo</span></button>

            <div ref={liveRef} aria-live="polite" style={{ scrollMarginBottom: 24 }}>
              {done && (
                <div className="np-banner np-banner--success">
                  <span className="np-banner__icon" aria-hidden="true"><Icon name="circle-check" size={18} /></span>
                  <div><strong>Demo booked.</strong> {done.when}. Invite sent to {done.email}.</div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DemoBooking });
