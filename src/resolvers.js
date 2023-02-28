let users = [
    { id : 1, name : "loic", email : "baudouxloic@gmail.com", age : 31},
    { id : 2, name : "sarah", email : "sarahdebeve@gmail.com", age : 35}
]


let gardens = [
    { id : 1, taille : 50, x : 10, y : 15, userId : 1 },
    { id : 2, taille : 152, x : 19, y : 22, userId : 2 }
]


const resolvers = {

    Query : {
        hello : () => "Bonjour à tous",
        users : () => users,
        user : (_, args) => {

            let hisGardens = gardens.find(garden => garden.userId == args.userId)
            let user = users.find(user => user.id == args.userId)

            user.gardens = [hisGardens]

            return user
        }

    },
    Mutation : {
        createUser : (_, { name, email, age }) => {
            let checkId = users.findIndex(user => user.email == email )

            if(checkId == -1)
            {
                let newUser = {name, email, age, id : users.length+1}
                users.push(newUser)
                return newUser
            }
            else
            {
                throw new Error("Email already exist")
            }
        },
        deleteUser : (_, { userId }) => {
            let checkId = users.findIndex(user => user.id == userId )

            if(checkId != -1)
            {
                users.splice(checkId, 1)
                return true
            }
            else{
                throw new Error("User does not exist")
            }
        }
    }

}


export default resolvers