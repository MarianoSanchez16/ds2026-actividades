import { Router } from 'express';
import { libroController } from '../controllers/libro.controller';
import { validate, validateParams } from '../middlewares/validate';
import { libroCreateSchema, libroUpdateSchema, idParamSchema } from '../validations/libreria.schemas';

const router = Router();

router.get('/', libroController.getAll);

router.get('/:id',
    validateParams(idParamSchema), 
    libroController.getById
);

router.post('/', 
    validate(libroCreateSchema), 
    libroController.create
);

router.put('/:id', 
    validateParams(idParamSchema), 
    validate(libroUpdateSchema), 
    libroController.update
);

router.delete('/:id', 
    validateParams(idParamSchema), 
    libroController.delete
);

export default router;