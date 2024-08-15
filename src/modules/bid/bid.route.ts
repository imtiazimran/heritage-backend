// routes/bid.routes.ts
import { Router } from 'express';
import { placeBid, getBidsForProperty, getBidById, deleteBid } from './bid.controller';
import validateRequest from '../../middlewares/handleValidation';
import { bidSchema } from './bid.validation';


// Create a router instance
const router = Router();

// Routes
router.post('/create', placeBid);
router.get('/properties/:propertyId', getBidsForProperty);
router.get('/:id', getBidById);
router.delete('/:id', deleteBid);

export default router;
