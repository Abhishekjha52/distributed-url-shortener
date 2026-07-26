import mongoose, { Schema } from "mongoose";
import validator from "validator";
const urlSchema = new Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            validate: {
                validator: (value: string) => validator.isURL(value),
                message: "Invalid URL",
            },
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
        },

        clicks: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Url = mongoose.model("Url", urlSchema);