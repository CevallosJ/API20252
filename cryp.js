// cryp.js
import { randomBytes } from 'crypto';

// Ejemplo: generar un secreto de 32 bytes (256 bits)
const secret = randomBytes(64).toString('hex');
console.log('JWT_SECRET generado:', secret);

// Resto de tu lógica con createHmac, cifrado, etc.
