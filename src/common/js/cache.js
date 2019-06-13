const USER_KEY = '__user__';
const TOKEN_KEY = '__token__';


export function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
    return user
}

export function loadUser(def) {
    let user = localStorage.getItem(USER_KEY)
    if (!user) {
        return def
    }
    return JSON.parse(user)
}

export function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
    return token
}

export function loadToken(def) {
    let token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
        return def
    }
    return token
}