class TagService {

    static getUrl = () => 'http://localhost:8080/tags/'

    // Returns a Promise for a list of expenses
    static getAll(accessToken) {
        return fetch(TagService.getUrl(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    // Returns a Promise for the deleted expense
    static save(accessToken, tag) {
        // TODO
    }

    static delete(accessToken, tag) {
        // TODO
    }
}

export default (TagService); 