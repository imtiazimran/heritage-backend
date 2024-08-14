import { Request, Response } from 'express';
import {
    createPropertyService,
    getAllPropertiesService,
    getPropertyByIdService,
    updatePropertyService,
    deletePropertyService
} from './property.service';
import { z } from 'zod';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// Create a new property
export const createProperty = catchAsync(async (req: Request, res: Response) => {
    const newProperty = await createPropertyService(req.body);
    sendResponse(res, { statusCode: 201, success: true, data: newProperty });
});

// Get all properties
export const getAllProperties = catchAsync(async (req: Request, res: Response) => {
    const { properties, meta } = await getAllPropertiesService(req.query);
    console.log( properties.length, req.query);
    sendResponse(res, { statusCode: 200, success: true, data: properties, meta });
});

// Get a single property by ID
export const getPropertyById = catchAsync(async (req: Request, res: Response) => {
    const property = await getPropertyByIdService(req.params.id);
    if (!property) {
        return sendResponse(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    sendResponse(res, { statusCode: 200, success: true, data: property });
});

// Update a property
export const updateProperty = catchAsync(async (req: Request, res: Response) => {
    const updatedProperty = await updatePropertyService(req.params.id, req.body);
    if (!updatedProperty) {
        return sendResponse(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    sendResponse(res, { statusCode: 200, success: true, data: updatedProperty });
});

// Delete a property
export const deleteProperty = catchAsync(async (req: Request, res: Response) => {
    const deletedProperty = await deletePropertyService(req.params.id);
    if (!deletedProperty) {
        return sendResponse(res, { statusCode: 404, success: false, message: 'Property not found', data: null });
    }
    sendResponse(res, { statusCode: 200, success: true, message: 'Property deleted successfully', data: null });
});
