export const createRepository = (req, res) => {
    res.send("Created a Repository");
}

export const getAllRepositories = (req, res) => {
    res.send("All Repositories");
}

export const fetchRepositoryById = (req, res) => {
    res.send("Fetching a Repo by Id");
}

export const fetchRepositoryByName = (req, res) => {
    res.send("Fetching a Repo by Name");
}

export const fetchRepositoriesOfCurrentUser = (req, res) => {
    res.send("Created a Repository");
}

export const updateRepositoryById = (req, res) => {
    res.send("Updated a Repo By Id");
}

export const deleteRepositoryById = (req, res) => {
    res.send("Created a Repository");
}

export const toggleVisibilityById = (req, res) => {
    res.send("Toggled Visibility!!");
}
