import { update } from '@vercel/edge-config';

export default async function handler(req, res) {
  await update({
    greeting: { "A": 90, "B": 80, "C": 70 }  // Update or change the value
  });
  res.status(200).json({ message: 'Grades updated' });
}
