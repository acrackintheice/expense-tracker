class TagService {

    static getUrl = () => 'http://localhost:8080/tags/'

    static getHeaders = (token) =>  ({'Content-Type' : 'application/json', 'Accept' : 'application/json', 'Authorization': 'Bearer ' + token})

    // Returns a Promise for a list of expenses
    static getAll(accessToken) {
        return fetch(TagService.getUrl(), {
            method: 'GET',
            headers: this.getHeaders(accessToken)
        })
    }

    static save(accessToken, tag) {
        // TODO
    }

    static delete(accessToken, tag) {
        // TODO
    }
}

export default (TagService); 