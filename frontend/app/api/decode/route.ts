import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  decoded?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { encoded } = req.body;

    try {
      const response = await axios.post('http://localhost:8000/api/decode/', { encoded });
      res.status(200).json({ decoded: response.data.decoded });
    } catch (error) {
      res.status(500).json({ error: 'Failed to decode the confirmation code' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
