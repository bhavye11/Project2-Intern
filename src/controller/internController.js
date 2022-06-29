const internModel = require("../models/internModels");
const collegeModel = require("../models/collegeModels");

//-------------------------POST API CREATE INTERN DETAILS---------------------------------------
const createIntern = async function (req, res) {
    try {
        let userRequest = req.body;

        let { name, email, mobile, collegeName } = userRequest

        let collegeData = await collegeModel.findOne({ fullName: collegeName }).select({ _id: 1 })

        let collegeId = collegeData._id

        let data = { name, email, mobile, collegeId }

        let internData = await internModel.create(data);

        res.status(201).send({ status: true, data: internData });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createIntern = createIntern;