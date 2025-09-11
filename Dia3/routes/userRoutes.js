import {Router} from 'express';

export function buildUserRouter(UserController){
    const router = Router();
    router.get("/", UserController.list);
    router.get("/:id",UserController.get);
    router.get("/", UserController.create);
    router.get("")
}