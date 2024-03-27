interface User {
     _id?: string,
     name: string,
     mobile: number,
     email: string,
     password: string,
     isBlock: boolean,
     isPicker: boolean
}

export default User