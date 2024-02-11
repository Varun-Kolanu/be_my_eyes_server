import { RoleCount } from "../models/roleCount.js"

export const roleCountHandler = async (req, res, next) => {
    const blindDoc = await RoleCount.findOne({role: 'blind'});
    const volunteerDoc = await RoleCount.findOne({role: 'volunteer'});
    return res.status(200).json({ blind: blindDoc.count, volunteer: volunteerDoc.count });
}