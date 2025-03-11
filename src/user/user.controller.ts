import { UserPipe } from './user.pipe';
import { Body, Controller, Delete, Get, Param, Post, Put,  UsePipes } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { createUser } from './user.tdo';


interface User {
    id: number;
    userName: string;
    email: string;
    createdAt: string;
  }


@Controller('user')
export class UserController {

    constructor(private appservice : AppService){}

     users : User [] = []

    @Get('/get')
    getdata(){
        return this.appservice.getData()
    }   


    @Post('/create')
    createUser(@Body() data : createUser){
        const userdata = {
            id : new Date().getTime(),
            ...data,
            createdAt : new Date().toLocaleString()
        }

        this.users.push(userdata);
        return {
            status : "200",
            data : this.users,
            message : "User created successfully!"
        }
    }


    @Get('/getUsers')
    getUsers(){
        return {
            data : this.users,
            total : this.users.length
        }
    }

    @Put('/updateUser/:id')
    updateUser(@Param('id') id : number, @Body() data  ){
        const user = this.users.map((curr,i) => {
            if(curr.id === Number(id))
            {
                return {
                    ...curr,
                    userName : data.userName 
                } 
            }
            else {
                return {
                    status : "404",
                    success : false,
                    message : "User not found!"
                }
            }
        } )
        
        return {
            status : 201,
            success : true,
            data : user,
            message : "User updated successfully!"
        }
    }

    @Delete('/deleteUser/:id')
    deleteUser(@Param('id') id : Number){
        try {
            const user = this.users.findIndex((curr) => curr.id == Number(id))
            if(user === -1){
                return {
                    status : 404,
                    message : "User not found!"
                }
            }

            this.users.splice(1,user);
            
            return {
                status : 200,
                message : "User deleted successfully!"
            }
        } catch (error) {
            return {
                status : 500,
                message : error
            }
        }
    }

    @Get('/getdata/:id')
    @UsePipes(UserPipe)
    getById(@Param('id') id : number){
        return id
    }
}
