function getIconUrl(name) {
    return new URL(`/icon/courier/${name}.svg`, import.meta.url).href;
}

export {
    getIconUrl
}