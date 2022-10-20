export const getUserName = (activeUser, users)=>{
    return users[0]._id == activeUser._id ? users[1].name : users[0].name;
}