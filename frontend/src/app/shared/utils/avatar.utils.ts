import axios from 'axios';
import { generateUsername } from 'unique-username-generator';

export async function generateRandomUsernameAndAvatar() {
    const username = generateUsername('', 0, 10);
    let avatarUrl = '';

    try {
        const avatarResponse = await axios.get(
            `https://api.dicebear.com/7.x/micah/svg?flip=true&backgroundType=gradientLinear&backgroundRotation[]&baseColor=f9c9b6,ac6651&earringsProbability=15&facialHair=scruff&facialHairProbability=30&hair=dannyPhantom,fonze,full,pixie,turban,mrClean&hairProbability=95&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&seed=${username}`
        );
        // Dicebear API returns the SVG string directly, not a URL to an image usually, unless requesting specific format?
        // The original code used `avatarResponse.request.responseURL`. 
        // If axios follows redirects, this works.
        avatarUrl = avatarResponse.request.responseURL;
    } catch (error) {
        console.error('API request failed:', error);
        avatarUrl = 'https://res.cloudinary.com/dnp36kqdc/image/upload/v1694805447/user_s2emcd.png';
    }
    return { username, avatarUrl };
}
