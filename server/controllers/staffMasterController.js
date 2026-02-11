import staffMaster from "../models/staffMasterModel.js";

// create staff type
export const createStaffType = async (req,res) =>{
    try{
        const staff = await StaffMaster.create(req.body);
        res.status(201).json(staff);
    }catch(err){
        res.status(400).json({error: err.message });
    }
};

//get all 
export const getStaffTypes = async (req,res)=>{
    try{
        const staff = await staffMaster.find().sort({createdAt: -1});
        res.json(staff);

    }catch(err){
        res.status(500).jaon({error: err.message});
    }
};

//update staff
export const updateStaffType = async (req, res) =>{
    try{
        const staff = await staffMaster.findByIdUpdate(req.params.id, req.body, {new: true});
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

// Delete staff
export default deleteStaffType = async (req, res)=>{
    try{
        await StaffMaster.findByIdDelete(req.params.id);
        res.json({message: "Deleted successfully"});
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

