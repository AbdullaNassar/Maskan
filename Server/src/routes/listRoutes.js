import express from 'express'
import { isUserLoggedIn,userPermission } from '../controllers/authControllers.js';
import { createList, deleteList, readLists, updateList } from '../controllers/listControllers.js';

const router = express.Router();

router
    .use(isUserLoggedIn)

router
    .route('/')
    .post(userPermission('admin','user'),createList)
    .get(userPermission('admin','user'),readLists)


router
    .route('/:id')
    .patch(userPermission('admin','user'),updateList)
    .delete(userPermission('admin','user'),deleteList)


export default router;

