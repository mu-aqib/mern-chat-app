export const getUserName = (activeUser, users)=>{
    return users[0]._id == activeUser._id ? users[1].name : users[0].name;
}

export const getUser = (active, users)=>{
    return users[0]._id == active._id ? users[1] : users[0];
}