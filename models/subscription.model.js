import {mongoose} from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price : {
        type: Number,
        required: [true, "Subscription price is required"],
        minlength: [0, "Price must be greater than 0"],
    },
    currency : {
        type: String,
        enum : ['INR', 'NPR', 'USD'],
        default : "INR"
    },
    frequency: {
        type: String,
        enum : ['Daily', 'Weekly', 'Monthly', 'Yearly'],
    },
    category: {
        type: String,
        enum : ['Sports', 'Education', 'Finance', 'Entertainment', 'Technology', 'Politics', 'Lifestyle', 'News', 'other'],
        required: [true, "Please enter category"]
    },
    paymentMethod : {
        type: String,
        required: [true, "Please enter a valid Payment Method"],
        trim : true,
    },
    status : {
        type: String,
        enum : ['active', 'cancelled', 'expired'],
        default: 'active',

    },
    startDate:{
        type: Date,
        default: Date.now,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past' +
                '',
        }
    },
    renewalDate:{
        type: Date,
        default: Date.now,
        required: true,
        validate: {
            validator: function (value) {
                return value > this.StartDate;
            },
            message: 'Renewal date must be after start date.'
        }
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
        index : true

    }
}, {timestamps: true});


//auto-calculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
             daily : 1,
            weekly : 7,
            monthly : 30,
            yearly : 365
        };


        this.renewalDate = new Date(this.startDate);
        //Basically what we are doing that
        //user start the subscription on date Jan 1st
        //the frequency of the subscription is Monthly
        //then it will calculate and the subscription will be ended in Jan 31st
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //Auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;