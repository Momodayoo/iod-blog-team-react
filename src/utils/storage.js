export const setItem = (name, item) => {
    if (!window.localStorage) return false;
    window.localStorage.setItem(name, item);
    return true;
};

export const getItem = (name) => {
    return window.localStorage.getItem(name);
};

export const clearStorage = () => {
    window.localStorage.clear();
};
