export class UserInfo {
    constructor(userNameSelector, userStatusSelector, userAvatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userStatus = document.querySelector(userStatusSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const profileInfo = {
            name: this._userName.textContent,
            status: this._userStatus.textContent
        }
        return profileInfo;
    }

    getUserAvatar() {
        const avatarInfo = {
            avatar: this._userAvatar.src
        }
        return avatarInfo;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userStatus.textContent = data.about;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}