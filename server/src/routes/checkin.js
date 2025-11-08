import { Router } from 'express';
import Participant from '../models/Participant.js';

const router = Router();

router.post('/checkin', async (req, res) => {
  try {
    const { id } = req.body; // scanned payload should include id
    if (!id) return res.status(400).json({ message: 'Invalid QR payload' });
    const p = await Participant.findById(id);
    if (!p || !p.verified) return res.status(404).json({ message: 'Not found or not verified' });
    if (p.attended) return res.json({ message: 'Already checked in' });
    p.attended = true;
    await p.save();
    return res.json({ message: 'Check-in successful', participant: { name: p.name, event: p.event } });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
