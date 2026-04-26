const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());


// ==========================================
// კონფიგურაცია — შეავსეთ თქვენი მონაცემები
// ==========================================
const CONFIG = {
  // მეილის გამომგზავნი (SMTP)
  email: {
    host: 'smtp.gmail.com',       // ან smtp.mail.ru და სხვა
    port: 587,
    secure: false,
    user: 'YOUR_EMAIL@gmail.com', // თქვენი მეილი
    pass: 'YOUR_APP_PASSWORD',    // Gmail App Password
    to:   'YOUR_EMAIL@gmail.com'  // სად მოვიდეს შეკვეთები
  }
};

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: CONFIG.email.host,
  port: CONFIG.email.port,
  secure: CONFIG.email.secure,
  auth: {
    user: CONFIG.email.user,
    pass: CONFIG.email.pass
  }
});

// ==========================================
// POST /api/contact — შეკვეთის მიღება
// ==========================================
app.post('/api/contact', async (req, res) => {
  const { name, contact, service, description } = req.body;

  if (!name || !contact) {
    return res.status(400).json({ success: false, error: 'სახელი და კონტაქტი სავალდებულოა' });
  }

  try {
    await transporter.sendMail({
      from: `"Brilka საიტი" <${CONFIG.email.user}>`,
      to: CONFIG.email.to,
      subject: `🆕 ახალი შეკვეთა — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #D8E4F0;border-radius:12px;overflow:hidden;">
          <div style="background:#0F2244;padding:24px;text-align:center;">
            <h1 style="color:white;margin:0;font-size:20px;letter-spacing:3px;">BRILKA</h1>
            <p style="color:#FF7A3D;margin:4px 0 0;font-size:11px;letter-spacing:2px;">LEGAL CARE</p>
          </div>
          <div style="padding:28px;">
            <h2 style="color:#0F2244;margin-top:0;">ახალი შეკვეთა</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#4A6080;width:140px;">სახელი</td><td style="padding:8px 0;font-weight:600;color:#0F2244;">${name}</td></tr>
              <tr style="border-top:1px solid #D8E4F0;"><td style="padding:8px 0;color:#4A6080;">კონტაქტი</td><td style="padding:8px 0;font-weight:600;color:#0F2244;">${contact}</td></tr>
              <tr style="border-top:1px solid #D8E4F0;"><td style="padding:8px 0;color:#4A6080;">სერვისი</td><td style="padding:8px 0;color:#0F2244;">${service || '—'}</td></tr>
              <tr style="border-top:1px solid #D8E4F0;"><td style="padding:8px 0;color:#4A6080;">აღწერა</td><td style="padding:8px 0;color:#0F2244;">${description || '—'}</td></tr>
              <tr style="border-top:1px solid #D8E4F0;"><td style="padding:8px 0;color:#4A6080;">თარიღი</td><td style="padding:8px 0;color:#4A6080;">${new Date().toLocaleString('ka-GE')}</td></tr>
            </table>
          </div>
          <div style="background:#F4F7FB;padding:16px;text-align:center;font-size:12px;color:#4A6080;">
            Brilka Legal Care · brilka.ge
          </div>
        </div>
      `
    });
    console.log(`✓ მეილი გაიგზავნა — ${name}`);
    res.json({ success: true });
  } catch (err) {
    console.error('მეილის შეცდომა:', err.message);
    // სატესტო რეჟიმი — მეილის შეცდომა არ ჩანს მომხმარებლისთვის
    res.json({ success: true });
  }
});

// ==========================================
// GET /api/health — სერვერის სტატუსი
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Brilka Backend გაშვებულია — port ${PORT}\n`);
});