export class UserInfo {
    constructor( { titleSelector, captionSelector, avatarSelector } ) {
        this._profileTitle = document.querySelector(titleSelector);
        this._profileCaption = document.querySelector(captionSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return { 
            title: this._profileTitle.textContent, 
            caption: this._profileCaption.textContent 
        }
    }

    setUserInfo(info) {
        this._profileTitle.textContent = info["name"]; 
        this._profileCaption.textContent = info["about"];
        this._profileAvatar.src = info["avatar"];
    }

    setAvatar(newAvatar) {
        this._profileAvatar.src = newAvatar;
    }
}