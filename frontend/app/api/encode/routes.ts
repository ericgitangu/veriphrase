import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  encoded?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { code } = req.body;

    try {
      const response = await axios.post('http://localhost:8000/api/encode/', { code });
      res.status(200).json({ encoded: response.data.encoded });
    } catch (error) {
      res.status(500).json({ error: 'Failed to encode the confirmation code' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
