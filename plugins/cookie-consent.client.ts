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
                            Cookie NoticeThis website uses cookies and other tracking technologies to enhance user experience and to analyze performance and traffic on our website. We also share information about your use of our site with our social media, advertising and analytics partners. If a Do Not Sell or Share My Personal Information preference is detected it will be honored. Further information is available in our 
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
