export class UserRepository{
    constructor(UserModel){
        this.User = UserModel;
    }
    async create(data){
        return this.User.create(data);   
    }
    async findAll(){
        return this.User.find;
    }
    async findById(id){
    }
    async updateById (id){

    }
    
}