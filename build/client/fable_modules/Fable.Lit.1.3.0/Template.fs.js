
export function transform(tag, fmt) {
    return tag(fmt.strs, ...fmt.args);
}

