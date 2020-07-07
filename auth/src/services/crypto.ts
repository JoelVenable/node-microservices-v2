import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt)

interface CompareArgs {
    stored: string
    supplied: string
}


export class Crypto {

    static async toHash(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`
    }

    static async compare({ stored, supplied }: CompareArgs): Promise<boolean> {
        const [hashed, salt] = stored.split('.');

        const buffer = (await scryptAsync(supplied, salt, 64)) as Buffer;

        return buffer.toString('hex') === hashed;

    }
}