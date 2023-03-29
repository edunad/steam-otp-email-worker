export interface Env {}

export const extractKey = (str: string): string | null => {
    return str.split(`color: #3a9aed;`)[1]?.split('</td>')[0]?.split('>')[1]?.trim() ?? null;
};

export default {
    async email(message: EmailMessage, env: Env, ctx: ExecutionContext) {
        const fromSteam = message.from.indexOf('noreply@steampowered.com') !== -1 ?? false;
        if (!fromSteam) return Promise.reject(new Error(`Invalid email '${message.from}'`));

        const reader = message.raw.getReader();
        const data = await reader.read();

        const decoder = new TextDecoder('utf-8');
        const token = extractKey(decoder.decode(data.value));
        if (!token) return Promise.reject(new Error(`Failed to find email '${message.from}'`));

        console.warn(`Found token: ${token}`);
    },
};
