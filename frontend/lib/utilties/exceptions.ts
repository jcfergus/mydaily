
export const exceptionToFriendlyError = (exception: string): string => {
    const validationError = exception.match(/Validation failed: (.*)>/);
    if ( validationError?.[1] ) return validationError[1];

    return "Unknown error.";
}