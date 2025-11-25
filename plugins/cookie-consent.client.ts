import type { CookieConsentConfig } from 'vanilla-cookieconsent';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export default defineNuxtPlugin(() => {
    if (!process.client) return;

    // 你原文件里的默认配置大致结构（可按需细化）
    const defaultConfig: CookieConsentConfig = {
        guiOptions: {
            consentModal: {
                layout: 'bar inline',
                position: 'bottom',
                equalWeightButtons: true,
                flipButtons: false
            },
            preferencesModal: {
                layout: 'box',
                position: 'right',
                equalWeightButtons: true,
                flipButtons: false
            }
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'Cookie Statement',
                        description: `
                        <p>
                            We use cookies to improve your experience and analyze site traffic. We will honor any Do Not Sell or Share My Personal Information preference. See
                            <a href="/cookies-policy" target="_self">Cookies Policy</a> 
                            and 
                            <a href="/privacy-policy" target="_self">Privacy Notice</a> .
                        </p>
                     `,
                        acceptAllBtn: 'Accept all',
                        acceptNecessaryBtn: 'Reject all',
                    },
                    preferencesModal: {
                        sections: []
                    }
                }
            }
        },
        categories: {
            necessary: {
                enabled: true,
                readOnly: true
            },
            analytics: {
                enabled: false
            }
        }
    };

    CookieConsent.run({ ...defaultConfig });
});
