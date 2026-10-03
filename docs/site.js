const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => {
  const opened = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!opened));
  menu.textContent = opened ? 'Menu' : 'Close';
  nav.classList.toggle('is-open', !opened);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.click(); menu.focus();
  }
});
const form = document.querySelector('#quote-form');
if (form) {
  const values = {'power-washing':'Power washing','gutter-cleaning':'Gutter cleaning','window-cleaning':'Window cleaning','soft-washing':'Soft washing','fascia-soffit-cleaning':'Fascia & soffit cleaning'};
  const initial = values[new URLSearchParams(location.search).get('service')];
  if (initial) form.elements.service.value = initial;
  form.addEventListener('input', () => { document.querySelector('#quote-result').hidden = true; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim(), place = data.get('location').trim(), details = data.get('details').trim();
    if (!name || !place || !details) { alert('Please add your name, location and a few details about the job.'); return; }
    const message = `Hi Dolmen, I would like a free quote.\n\nName: ${name}\nLocation: ${place}\nService: ${data.get('service')}\nProperty: ${data.get('property')}\n\n${details}`;
    document.querySelector('#quote-preview').textContent = message;
    document.querySelector('#send-whatsapp').href = 'https://wa.me/353873674155?text=' + encodeURIComponent(message);
    const result = document.querySelector('#quote-result');
    result.hidden = false;
    result.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center'});
  });
}
