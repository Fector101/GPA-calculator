import { get } from '@vercel/edge-config'

export default async function handler(req, res) {
  try {
    // Fetch the value for the key "grading_scale"
    const gradingScale = await get('grading_scale'); // Replace 'grading_scale' with your actual key

    if (!gradingScale) {
      return res.status(404).json({ error: 'Grading scale not found' })
    }

    res.status(200).json({ scale: gradingScale });
  } catch (error) {
    console.error('Error fetching Edge Config:', error);
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
