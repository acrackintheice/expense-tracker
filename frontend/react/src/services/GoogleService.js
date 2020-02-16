class GoogleService {
  static clientId = () =>
    '707870445329-iu74qui75vgsh1kthhnit54unadb9tva.apps.googleusercontent.com'

  static getProfile () {
    const localGoogleProfileObject = localStorage.getItem('googleProfileObj')
    return localGoogleProfileObject
      ? JSON.parse(localGoogleProfileObject)
      : null
  }

  static getToken () {
    const localGoogleTokenObj = localStorage.getItem('googleTokenObj')
    return localGoogleTokenObj ? JSON.parse(localGoogleTokenObj) : null
  }

  static getAvatar () {
    if (GoogleService.isGoogleInfoSet()) {
      if (!GoogleService.isGoogleInfoExpired()) {
        const googleProfile = GoogleService.getProfile()
        return { image: googleProfile.imageUrl, name: googleProfile.name }
      }
    }
  }

  static setProfile (profile) {
    localStorage.setItem('googleProfileObj', JSON.stringify(profile))
  }

  static setToken (token) {
    localStorage.setItem('googleTokenObj', JSON.stringify(token))
  }

  static setGoogleInfo (googleResponse) {
    GoogleService.setProfile(googleResponse.profileObj)
    GoogleService.setToken(googleResponse.tokenObj)
  }

  static clearGoogleInfo () {
    localStorage.removeItem('googleTokenObj')
    localStorage.removeItem('googleProfileObj')
  }

  static isGoogleInfoSet () {
    return GoogleService.getProfile() && GoogleService.getToken()
  }

  static isGoogleInfoExpired () {
    return Date.now() > GoogleService.getToken().expires_at
  }

  static async getGoogleInfo () {
    if (!GoogleService.isGoogleInfoSet()) {
      throw new Error('Error. Could not find any Google information')
    } else if (GoogleService.isGoogleInfoExpired()) {
      throw new Error('Error. Your Google credentials have expired')
    } else {
      return { profile: this.getProfile(), token: this.getToken() }
    }
  }
}

export default GoogleService
