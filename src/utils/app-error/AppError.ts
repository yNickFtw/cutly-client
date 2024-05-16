export const doIfError = (error: any): { unauthorized?: boolean; badRequest?: boolean, notFound?: boolean, serverError?: boolean, forbidden?: boolean } => {
    if (error.response.status === 401) {
        return { unauthorized: true };
    }
    if (error.response.status === 400) {
        return { badRequest: true };
    }
    if (error.response.status === 404) {
        return { notFound: true };
    }
    if (error.response.status === 500) {
        return { serverError: true };
    }
    if (error.response.status === 403) {
        return { forbidden: true };
    }
    return { unauthorized: false, badRequest: false, notFound: false, serverError: false, forbidden: false };
};
