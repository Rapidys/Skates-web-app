import React from "react";

const useDebouncedCallback = (
    callback: Function,
    delay: number,
    dependencies?: any[]
) => {
    const timeout = React.useRef<number>();

    // Avoid error about spreading non-iterable (undefined)
    const comboDeps = dependencies
        ? [callback, delay, ...dependencies]
        : [callback, delay];

    return React.useCallback((...args) => {
        if (timeout.current != null) {
            clearTimeout(timeout.current);
        }

        // @ts-ignore
        timeout.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, comboDeps);
};

export default useDebouncedCallback;
