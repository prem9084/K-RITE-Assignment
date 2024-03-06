import fs from "fs";

import userModel from "../model/userModel.js";
import { compairPassword, hashPassword } from "../utils/authUtils.js";

import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone } = req.fields;
    const { photo } = req.files;
    if (!name) {
      res.status(404).send({ message: "Name is required" });
    }
    if (!email) {
      res.status(404).send({ message: "Name is required" });
    }
    if (!password) {
      res.status(404).send({ message: "Name is required" });
    }
    if (!phone) {
      res.status(404).send({ message: "Name is required" });
    }
    if (photo && photo.size > 10000000) {
      res
        .status(500)
        .send({ message: "Photo's size con not be greter then 1mg" });
    }

    // chech use

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(500).send({
        success: false,
        message: "User Already register Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    if (photo) {
      user.photo.data = fs.readFileSync(photo.path);
      user.photo.cantentType = photo.type;
    }

    await user.save();
    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Invalide email and password",
      });
    }

    // check user

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(500).send({
        success: false,
        message: "Email not Register Please reagister",
      });
    }

    const match = await compairPassword(password, user.password);

    if (!match) {
      res.status(500).send({
        success: false,
        message: "Invalide email and password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "2d",
    });

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
