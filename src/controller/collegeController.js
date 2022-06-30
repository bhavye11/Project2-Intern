const collegeModel = require("../models/collegeModels");
const internModel = require("../models/internModels");
const ObjectId = require("mongoose").Types.ObjectId

let validUrl = /^(https:\/\/)[a-zA-Z\-_]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z]+\.[a-zA-Z]+\/[a-zA-Z]+\/[a-zA-Z\-]+\.[a-zA-Z]{2,5}/;


const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
};

const isValidBody = function (x) {
    return Object.keys(x).length > 0;
};




//-------------------------POST API CREATE COLLEGE DETAILS---------------------------------------
const createCollege = async function (req, res) {
    try {
        let data = req.body;

        if (!isValidBody(data)) {
            return res.status(400).send({ status: false, message: "Invalid Request Parameter, Please Provide Another Details", });
        }
        const { name, fullName, logoLink } = data;

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }

        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: "fullName is required" })
        }

        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink is required" })
        }
        if (!validUrl.test(logoLink)) {
            return res.status(400).send({ status: false, message: "Enter Valid Url" })
        }

        //for checking duplication
        let uniqueName = await collegeModel.findOne({ name })
        if (uniqueName) return res.status(400).send({ message: "Dublicate name" })

        let collegeData = await collegeModel.create(data);

        let requiredCollegeData= {name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, isDeleted: collegeData.isDeleted}
        res.status(201).send({ status: true, data: requiredCollegeData });

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


//-------------------------GET API COLLEGE DETAILS---------------------------------------


const getCollegeAndInternsDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;

        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }

        const getCollege = await collegeModel.findOne({ name: collegeName }).select({ isDeleted: 0 })
        if (!getCollege) return res.status(404).send({ status: false, message: "data not found" })


        let collegeId = getCollege._id

        if (!ObjectId.isValid(collegeId)) return res.status(400).send({ status: false, message: "Not a valid college ID" })

        let getInterns = await internModel.find({ collegeId: collegeId }).select({ isDeleted: 0, collegeId: 0, __v: 0 })

        if (!getInterns) return res.status(404).send({ status: false, message: "data not found" })

        let collegeWithInterns = { name: getCollege.name, fullName: getCollege.fullName, logoLink: getCollege.logoLink, interns: getInterns }

        res.status(200).send({ status: true, data: collegeWithInterns })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

module.exports = { createCollege, getCollegeAndInternsDetails }