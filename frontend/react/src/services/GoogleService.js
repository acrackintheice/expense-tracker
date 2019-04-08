class GoogleService {


    static clientId = () => '707870445329-iu74qui75vgsh1kthhnit54unadb9tva.apps.googleusercontent.com'

    static getProfile() {
        const localGoogleProfileObject = localStorage.getItem('googleProfileObj')
        return localGoogleProfileObject ? JSON.parse(localGoogleProfileObject) : undefined
    }

    static getToken() {
        const localgoogleTokenObj = localStorage.getItem('googleTokenObj')
        return localgoogleTokenObj ? JSON.parse(localgoogleTokenObj) : undefined
    }

    static setProfile(profile) {
        localStorage.setItem('googleProfileObj', JSON.stringify(profile));
    }

    static setToken(token) {
        localStorage.setItem('googleTokenObj', JSON.stringify(token));
    }

    static setGoogleInfo(googleResponse){
        GoogleService.setProfile(googleResponse.profileObj);
        GoogleService.setToken(googleResponse.tokenObj);
    }
    
    static clearGoogleInfo(){
        localStorage.removeItem('googleTokenObj');
        localStorage.removeItem('googleProfileObj');
    }

    static isGoogleInfoExpired() {
        return Date.now() > GoogleService.getToken().expires_at
    }

    static isGoogleInfoSet(){
        return GoogleService.getProfile() && GoogleService.getToken()
    }

}

export default (GoogleService); 