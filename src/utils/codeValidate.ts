const PARENT_ACCOUNT_REGEX = /^[1-9](?:\.[1-9](?:\.\d{1,3})?)?$/;

export function codeValidate(parent_account: string){
    // todo qualquer nível.
    const isValid = parent_account.match(PARENT_ACCOUNT_REGEX);
    return true;
}