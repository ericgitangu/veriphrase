import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
	const { encoded } = await req.json();

	try {
		const response = await axios.post("http://localhost:8000/api/decode/", {
			encoded,
		});
		return NextResponse.json({ decoded: response.data.decoded });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to decode the confirmation code" },
			{ status: 500 },
		);
	}
}
