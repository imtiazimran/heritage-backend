import express from 'express';
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from './property.controller';
import validateRequest from '../../middlewares/handleValidation';
import { propertySchema } from './property.validation';


const router = express.Router();

router.post('/create', validateRequest(propertySchema), createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);
router.put('/:id', validateRequest(propertySchema.partial()), updateProperty);
router.delete('/:id', deleteProperty);

export default router;
