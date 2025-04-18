import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: 0,
    },
    currency: {
        type: String,
        required: [true, "Subscription currency is required"],
        trim: true,
        enum: ["USD", "EUR", "INR"],
        default: "USD",
    },
    frequency: {
        type: String,
        required: [true, "Subscription frequency is required"],
        trim: true,
        enum: ["monthly", "yearly"],
        default: "monthly",
    },
    category: {
        type: String,
        required: [true, "Subscription category is required"],
        trim: true,
        enum: ["basic", "premium", "enterprise"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true,
        enum: ["credit_card", "paypal", "UPI"],
    },
    status: {
        type: String,
        required: [true, "Subscription status is required"],
        trim: true,
        enum: ["active", "inactive"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator:(value) => value <= new Date(),
            message: "Start date cannot be in the future",
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                 value > this.startDate;
            },
            message: "Start date cannot be in the future",
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
        index: true,
    },
}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
    if(!this.renrewalDate){
        const renewalPeriod = {
            daily: 1,
            weekly:7,
            monthly:28,
            yearly:365
        };
        this.renewalDate= new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriod[this.frequency]);
    }

    if(this.renewalDate < this.Date){
        this.status = "inactive";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;