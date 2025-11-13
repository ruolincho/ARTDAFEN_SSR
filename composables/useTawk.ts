import {base64ToHex} from "~/utils";

export const useTawk = () => {
    const isClient = process.client && typeof window !== 'undefined';
    const isLoaded = isClient && !!window.Tawk_API;

    const tawkLogin = (data: { userId: string, name?: string, email?: string, hash: string }) => {
        if (!isLoaded) return;

        if (window.__tawk_logged_in__) return;

        const {userId, name, email, hash: hashStr} = data

        const hash = base64ToHex(hashStr);

        window.Tawk_API.login?.({
            userId,
            name,
            email,
            hash
        }, (error: any) => {
            if (!error) {
                window.__tawk_logged_in__ = true;
                console.log('Tawk login success');
            } else {
                console.error('Tawk login error:', error);
            }
        });
    };

    const tawkLogout = () => {
        if (!isLoaded) return;

        window.Tawk_API.logout?.((error: any) => {
            if (!error) {
                window.__tawk_logged_in__ = false;
                console.log('Tawk logout success');
            } else {
                console.error('Tawk logout error:', error);
            }
        });
    };

    return { tawkLogin, tawkLogout };
};
