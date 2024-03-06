import DNSModel from "../model/DNSModel.js";
import fs from "fs";
export const createDNSController = async (req, res) => {
  try {
    const { name, title, description } = req.fields;
    const { photo } = req.files;
    if (!name) {
      res.status(500).send({ message: "DNS Name is required" });
    }
    if (!title) {
      res.status(500).send({ message: "title is required" });
    }
    if (!description) {
      res.status(500).send({ message: "Description is required" });
    }
    if (photo && photo.size > 10000000) {
      res
        .status(500)
        .send({ message: "Photo's size con not be greter then 1mg" });
    }

    const record = await DNSModel({
      name,
      description,
      title,
    });

    if (photo) {
      record.photo.data = fs.readFileSync(photo.path);
      record.photo.cantentType = photo.type;
    }
    await record.save();
    res.status(201).send({
      success: true,
      message: "DNS Record Created Successfully",
      record,
    });
  } catch (error) {
    console.log(error);
  }
};

// for update post

export const updateDNSController = async (req, res) => {
  try {
    const { name, title, description } = req.fields;
    const { photo } = req.files;

    if (photo && photo.size > 1000000) {
      res
        .status(500)
        .send({ message: "Photo's size must be lesthen than 1mb" });
    }

    const record = await DNSModel.findByIdAndUpdate(
      req.params.uid,
      { ...req.fields },
      { new: true }
    );

    if (photo) {
      record.photo.data = fs.readFileSync(photo.path);
      record.photo.cantentType = photo.type;
    }
    await record.save();
    res.status(200).send({
      success: true,
      message: "DNS Record Update Successfully",
      record,
    });
  } catch (error) {
    console.log(error);
  }
};

// for delete post

export const deleteDNSController = async (req, res) => {
  try {
    const record = await DNSModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "DNS Record deleted successfully",
      record,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllDNSController = async (req, res) => {
  try {
    const record = await DNSModel.find({}).select("-photo");

    res.status(200).send({
      success: true,
      message: "All Dns Records Get Successfully",
      record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting dns records",
      error,
    });
  }
};

// photo controller

export const DNSPhotoController = async (req, res) => {
  try {
    const record = await DNSModel.findById(req.params.id).select("photo");
    if (record.photo.data) {
      res.set("Cantent-Type", record.photo.cantentType);
      return res.status(200).send(record.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};

// get single DNS Revord

export const getSingleRecord = async (req, res) => {
  try {
    const record = await DNSModel.findOne({ uid: req.params.id }).select(
      "-photo"
    );

    res.status(200).send({
      success: true,
      message: "Get Single DNS Record Successfully",
      record,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single record",
      error,
    });
  }
};
