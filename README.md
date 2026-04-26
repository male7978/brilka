<<<<<<< HEAD
# Brilka Backend — გაშვების ინსტრუქცია

## 📁 სტრუქტურა
```
brilka-backend/
├── server.js          ← მთავარი სერვერი
├── package.json       ← დამოკიდებულებები
├── .env.example       ← კონფიგურაციის მაგალითი
├── data/
│   └── submissions.json  ← შეკვეთები (ავტომატურად იქმნება)
└── README.md
```

## ⚙️ პირველი გაშვება

### 1. Node.js დაყენება
გადმოწერეთ: https://nodejs.org (LTS ვერსია)

### 2. პაკეტების დაყენება
```bash
cd brilka-backend
npm install
```

### 3. მეილის კონფიგურაცია
`server.js` ფაილში მოძებნეთ `CONFIG` ობიექტი და შეავსეთ:

```js
const CONFIG = {
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: 'თქვენი@gmail.com',   // ← თქვენი Gmail
    pass: 'xxxx xxxx xxxx xxxx', // ← App Password (იხ. ქვემოთ)
    to:   'თქვენი@gmail.com'    // ← სად მოვიდეს შეკვეთები
  }
};
```

### Gmail App Password-ის მიღება:
1. Gmail → Settings → Security
2. ჩართეთ 2-Step Verification
3. App Passwords → შექმენით ახალი → დააკოპირეთ

### 4. სერვერის გაშვება
```bash
npm start
```

ან development რეჟიმში (ავტო-გადატვირთვა):
```bash
npm run dev
```

---

## 🌐 API Endpoints

| Method | URL | აღწერა |
|--------|-----|--------|
| POST | `/api/contact` | შეკვეთის მიღება |
| GET | `/api/submissions` | ყველა შეკვეთის სია |
| GET | `/api/health` | სერვერის სტატუსი |

---

## 📋 შეკვეთების ნახვა

ბრაუზერში გახსენით:
```
http://localhost:3001/api/submissions
```

ან პირდაპირ `data/submissions.json` ფაილი.

---

## 🚀 სერვერზე განთავსება (Hosting)

პოპულარული ვარიანტები:
- **Railway** — railway.app (უფასო tier)
- **Render** — render.com (უფასო tier)
- **VPS** — DigitalOcean, Hetzner

განთავსების შემდეგ `brilka-site-2.html`-ში შეცვალეთ:
```js
const res = await fetch("http://localhost:3001/api/contact", ...
// →
const res = await fetch("https://თქვენი-სერვერი.com/api/contact", ...
```
=======
# brilka
>>>>>>> d068468c61d04879bfe10827625cb01b1ddb4725
