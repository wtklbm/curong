export default function typeGuard(
    value: Record<PropertyKey, unknown>,
    message: string,
    isType: (value: any, ...args: any[]) => boolean,
    ...args: unknown[]
) {
    Object.entries(value).forEach(([key, value]) => {
        if (isType(value, ...args)) {
            return;
        }

        const error = new TypeError('', {
            cause: { [key]: value, ...args }
        });

        error.stack = `[TypeError] "${key}" ${message}\n${error.stack?.replace(/([^\n]+\n)(?:[^\n]+\n){4}/, '')}`;

        throw error;
    });
}
