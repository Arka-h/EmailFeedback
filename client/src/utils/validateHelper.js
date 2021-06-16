/* eslint-disable import/no-anonymous-default-export */
export const validateEmails = (emails) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const invalidEmails = emails.split(',').map(s => s.trim()).filter(s => re.test(s) === false);
    if (invalidEmails.length) return `These emails are invalid: ${invalidEmails.join(", ")}`
    return
}