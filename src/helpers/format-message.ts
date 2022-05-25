import messages from '@app/messages.json';

/**
 * Fetches the message using provided path,
 * and hydrates it with provided variables.
 *
 * @param path
 * @param variables
 */
export const formatMessage = (path: keyof typeof messages, variables?: Record<string, string>): string => {
    let message = messages[path];
    if (!message) {
        return path;
    }

    if (variables) {
        for (const key in variables) {
            message = message.replaceAll(`{{${key}}}`, variables[key]);
        }
    }

    return message;
};