const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const DEFAULT_TO_EMAIL = 'hola@kvlabstudio.com';
const DEFAULT_FROM_EMAIL = 'hola@kvlabstudio.com';

const json = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
};

const clean = (value, maxLength = 1000) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    json(res, 405, { ok: false, message: 'Metodo no permitido.' });
    return;
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    json(res, 500, { ok: false, message: 'Falta configurar BREVO_API_KEY.' });
    return;
  }

  try {
    const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 80);
    const project = clean(body.project, 3000);
    const website = clean(body.website, 120);

    if (website) {
      json(res, 200, { ok: true });
      return;
    }

    if (!name || !email || !project || !isEmail(email)) {
      json(res, 400, {
        ok: false,
        message: 'Revisa nombre, email y proyecto antes de enviar.',
      });
      return;
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL;
    const subject = `Nueva consulta web de ${name}`;
    const safePhone = phone || 'No especificado';
    const safeNameHtml = escapeHtml(name);
    const safeEmailHtml = escapeHtml(email);
    const safePhoneHtml = escapeHtml(safePhone);
    const safeProjectHtml = escapeHtml(project);

    const textContent = [
      'Nueva consulta desde kvlabstudio.com',
      '',
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Telefono: ${safePhone}`,
      '',
      'Proyecto:',
      project,
    ].join('\n');

    const htmlContent = [
      '<h2>Nueva consulta desde kvlabstudio.com</h2>',
      `<p><strong>Nombre:</strong> ${safeNameHtml}</p>`,
      `<p><strong>Email:</strong> ${safeEmailHtml}</p>`,
      `<p><strong>Telefono:</strong> ${safePhoneHtml}</p>`,
      '<p><strong>Proyecto:</strong></p>',
      `<p>${safeProjectHtml}</p>`,
    ].join('');

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'KvLab Studio Web', email: fromEmail },
        to: [{ email: toEmail }],
        replyTo: { name, email },
        subject,
        textContent,
        htmlContent,
      }),
    });

    if (!brevoResponse.ok) {
      const errorBody = await brevoResponse.text();
      console.error('Brevo error:', brevoResponse.status, errorBody);
      json(res, 502, {
        ok: false,
        message: 'No se pudo enviar la consulta. Probalo de nuevo en unos minutos.',
      });
      return;
    }

    json(res, 200, { ok: true, message: 'Consulta enviada correctamente.' });
  } catch (error) {
    console.error('Contact form error:', error);
    json(res, 500, {
      ok: false,
      message: 'No se pudo procesar la consulta. Probalo de nuevo en unos minutos.',
    });
  }
};
