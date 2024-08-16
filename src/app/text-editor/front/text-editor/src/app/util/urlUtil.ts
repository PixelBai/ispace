export class urlUtil{
 
    static getUrlParameter(name: string): string {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }

}