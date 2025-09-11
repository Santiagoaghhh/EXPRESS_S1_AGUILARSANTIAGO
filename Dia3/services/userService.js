export class UserService{
    constructor (userRepository){
        this.repo=userRepository
    }

    async createUser(data){
        // Cuando ingrese el correo, no esté existente
    }

    async listUser(){
        //Limitar a exportar, max: 10
    }
    async getUser(id){
        return this.repo.findById(id);
    }
    async updateUser(id, data){}
    
}