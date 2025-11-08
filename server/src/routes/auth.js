import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Participant from '../models/Participant.js';
import { sendVerificationEmail } from '../utils/email.js';
import { generateQr } from '../utils/qr.js';

const router = Router();

router.post('/check-email', async (req, res) => {
  const { email, event } = req.body;
  const exists = await Participant.findOne({ email, event });
  return res.json({ exists: !!exists });
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, dept, rollNo, event } = req.body;

    // Basic backend validation
    if (!name || !email || !mobile || !dept || !rollNo || !event) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (!/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: 'Mobile must be 10 digits.' });
    }

    const exists = await Participant.findOne({ email, event });
    if (exists) {
      return res.status(409).json({ message: 'You already registered for this event.' });
    }

    // Create unverified participant (no QR yet)
    const p = await Participant.create({ name, email, mobile, dept, rollNo, event });

    const token = jwt.sign({ id: p._id, email }, process.env.JWT_SECRET, { expiresIn: '2d' });
    const link = `${process.env.CLIENT_URL}/verify?token=${token}`;

    await sendVerificationEmail(email, link);

    return res.status(201).json({
      message: 'Registration submitted. Check your email to verify.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const p = await Participant.findById(data.id);
    if (!p) return res.status(404).json({ message: 'Participant not found' });
    if (p.verified) return res.json({ message: 'Already verified', qrCode: p.qrCode });

    // Generate QR once verified
    const qr = await generateQr({ id: p._id, email: p.email, event: p.event });
    p.verified = true;
    p.qrCode = qr;
    await p.save();

    return res.json({ message: 'Verification successful', qrCode: p.qrCode });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid || expired token' });
  }
});

router.get('/participants', async (_req, res) => {
  const list = await Participant.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

export default router;
