export const getAllUsers = (req, res) => {
    res.send("Getting all users");
}

export const signUp = (req, res) => {
    res.send("Signing Up");
}

export const login = (req, res) => {
    res.send("Logging In");
}

export const getUserProfile = (req, res) => {
    res.send("Getting a user profile");
}

export const updateUserProfile = (req, res) => {
    res.send("Updating a user profile");
}

export const deleteUserProfile = (req, res) => {
    res.send("Deleting a particular User Profile");
}
