import { Observable, Subject } from "rxjs";

export const SESSION_KEYS = {
    ACCESS_TOKEN: 'ACCESS_TOKENS',
    REFRESH_TOKEN: 'REFRESH_TOKEN',
    EXPIRE_IN: 'EXPIRE_IN',
    USER_INFO: 'USER_INFO'
  };
export class SessionService {
    private session: Map<string, any> = new Map<string, any>();
    private loginSuccessful = new Subject<{email: string, accessToken: string}>();

    set(key: string, value: any) {
        this.session.set(key, value);
        localStorage.setItem(key, value);
    }

    isValidSession(): boolean {
        if (this.session.get(SESSION_KEYS.ACCESS_TOKEN)) {
            return true;
        }
        return false;
    }

    setLoginInfo(email: string, accessToken: string) {
        this.loginSuccessful.next({email: email, accessToken: accessToken});
    }

    getLoginInfo(): Observable<{email: string, accessToken: string}> {
        return this.loginSuccessful.asObservable();
    }

    clear() {
        this.session.clear();
        localStorage.clear();
    }
}
