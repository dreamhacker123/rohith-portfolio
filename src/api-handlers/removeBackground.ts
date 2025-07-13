import axios from "axios";
import { Buffer } from "buffer";

async function removeBackground(imageUrl: string): Promise<string> {
    const apiKey = "YOUR_REMOVE_BG_API_KEY";
    const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        {
            image_url: imageUrl,
            size: "auto",
        },
        {
            headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
            },
            responseType: "arraybuffer",
        }
    );

    if (response.status !== 200) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const buffer = Buffer.from(response.data);
    return buffer.toString("base64");
}

export default removeBackground;