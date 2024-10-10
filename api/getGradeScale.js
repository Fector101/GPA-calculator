import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  const studentGrades = await get('greeting');  // Use the key you just added
  res.status(200).json({ grades: studentGrades });
}
