import QueryBuilder from "../../builder/quiryBuilder";
import { PropertyModel } from "./property.model";
import { TProperty } from "./property.validation";


export const createPropertyService = async (data: TProperty) => {
    const newProperty = new PropertyModel(data);
    return await newProperty.save();
};

export const getAllPropertiesService = async (query: Record<string, unknown>) => {
    const queryBuilder = new QueryBuilder(PropertyModel.find(), query)
        .search(['name', 'location'])
        .filter()
        .sort()
        .paginate()
        .fields();
    
    const properties = await queryBuilder.modelQuery;
    const meta = await queryBuilder.countTotal();
    
    return { properties, meta };
};

export const getPropertyByIdService = async (id: string) => {
    return await PropertyModel.findById(id);
};

export const updatePropertyService = async (id: string, data: Partial<TProperty>) => {
    return await PropertyModel.findByIdAndUpdate(id, data, { new: true });
};

export const deletePropertyService = async (id: string) => {
    return await PropertyModel.findByIdAndDelete(id);
};
