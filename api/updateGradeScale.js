import { update } from '@vercel/edge-config';

export default async function handler(req, res) {
  try {
    const { newScale } = req.body;  // Assume newScale is sent in the request body

    // Update the "grading_scale" key with a new value
    await update({
      greeting: newScale,  // Replace 'grading_scale' with your actual key
    });

    res.status(200).json({ message: 'Grading scale updated successfully' });
  } catch (error) {
    console.error('Error updating Edge Config:', error);
    res.status(500).json({ error: 'Failed to update the config' });
  }
}
