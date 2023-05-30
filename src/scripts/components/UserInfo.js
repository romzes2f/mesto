export class UserInfo {
    constructor(userNameSelector, userDescriptionSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }

    getUserInfo() {
        const profileInfo = {
            name: this._userName.textContent,
            description: this._userDescription.textContent
        }
        return profileInfo;
    }

    setUserInfo(data) {
        this._userName.textContent = data.nameInput;
        this._userDescription.textContent = data.descriptionInput;
    }
}