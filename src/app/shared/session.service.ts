import { Observable, Subject } from "rxjs";

export const SESSION_KEYS = {
    ACCESS_TOKEN: 'ACCESS_TOKENS',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    EXPIRE_IN: 'EXPIRE_IN',
    USER_INFO: 'USER_INFO'
  };
export class SessionService {
    private session: Map<string, any> = new Map<string, any>();

    set(key: string, value: any) {
        this.session.set(key, value);
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return this.session.get(key);
    }

    isValidSession(): boolean {
        if (this.session.get(SESSION_KEYS.ACCESS_TOKEN)) {
            return true;
        }
        return false;
    }

    isValidStorage(): boolean {
        if (localStorage.getItem(SESSION_KEYS.ACCESS_TOKEN) && localStorage.getItem(SESSION_KEYS.REFRESH_TOKEN)
        && localStorage.getItem(SESSION_KEYS.USER_INFO) && localStorage.getItem(SESSION_KEYS.EXPIRE_IN)) {
            return true;
        }
        return false;
    }

    reInitializeSession() {
        this.session.set(SESSION_KEYS.ACCESS_TOKEN, localStorage.getItem(SESSION_KEYS.ACCESS_TOKEN));
        this.session.set(SESSION_KEYS.REFRESH_TOKEN, localStorage.getItem(SESSION_KEYS.REFRESH_TOKEN));
        this.session.set(SESSION_KEYS.USER_INFO, localStorage.getItem(SESSION_KEYS.USER_INFO));
        this.session.set(SESSION_KEYS.EXPIRE_IN, localStorage.getItem(SESSION_KEYS.EXPIRE_IN));
    }

    clear() {
        this.session.clear();
        localStorage.clear();
    }
}
