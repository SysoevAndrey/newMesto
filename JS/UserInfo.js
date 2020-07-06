class UserInfo {
    setUserInfo = (name, desc) => {
        this.name = name;
        this.desc = desc;
    }

    updateUserInfo = (resultName, resultDesc) => {
        this.resultName = resultName;
        this.resultDesc = resultDesc;

        this.resultName.textContent = this.name;
        this.resultDesc.textContent = this.desc;
    }
}
