import userModel from "../models/userModel.js"
import { sendOTPEmail } from "../utilities/sendEmail.utilies.js";
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req,res)=>{  
    try {

        const users = await userModel.find({},{password:0,phoneNumber:0,role:0,__v:0});
        
        if(!users){

            return res.status(404).json({
                status:"Failed",
                message:"No Users Found"
            })
        }

        res.status(200).json({
            status:"Success",
            user_length:users.length,
            data:users
        })

    } catch (error) {

        res.status(500).json({
            status:"Failed",
            mesage:"Internal server error",
            error:error.message
        })
    }
}

export const updateUser =async (req,res)=>{
    try {

        const id = req.user._id;

        await userModel.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators: true
        });

        res.status(204).json({
            status:"Success",
            message:"User Updated Successfuly",
        })

    } catch (error) {

        res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        });
    }
}

export const deleteUser = async (req,res)=>{
    try {

        const id = req.user._id;
        await userModel.deleteOne({_id:id});

        res.status(204).json({
            status:"Success",
            message:"User Deleted Successfuly"
        })

    } catch (error) {

        res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        })
    }
}

export const deleteAllUsers = async (req,res)=>{
    try {

        const users = await userModel.deleteMany({role:{$ne:'admin'}});

        res.status(204).json({
            status:"Success",
            message:"All Users Deleted Successfuly",
        })

    } catch (error) {

        res.status(500).json({
            status:"Failed",
            message:"Internal Server Error"
        })
    }
}

export const verifyOTP = async (req, res) => {

    try {
        const { email, otp } = req.body;

        if(!email || !otp){

            return res.status(400).json({
                status:"Failed",
                message:"Provied All Fields"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({

            status:"Failed",
            message: 'User not found' 
        });

        if (user.isVerified) {
            return res.status(400).json({

                status:"Failed",
                message: 'User already verified' 
            });
        }

        const isOTPValid = (user.otp === otp) && (user.otpExpiresAt > new Date());

        if (!isOTPValid) {
            return res.status(400).json({

                status:"Failed",
                message: 'Invalid or expired OTP' 
            });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        await user.save();

        res.status(204).json({

            status:"Success",
            message: 'Email verified successfully' 
        });

    } catch (error) {

        return res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        })
    }
};

export const resendOTP = async (req, res) => {
    try {

        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                status:"Failed",
                message:"Email Is required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status:"Failed",
                message: 'User not found' 
            });
        }

        if (user.isVerified) {

            return res.status(400).json({
                status:"Failed",
                message: 'User is already verified'
            });
        }

        // Generate new OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpiresAt = otpExpiresAt;
        await user.save();

        await sendOTPEmail(user.email, otp);

        return res.status(200).json({

            status:"Successfuly",
            message: 'New OTP sent to email'
        });

    } catch (error) {

        return res.status(500).json({
            status:"Failed",
            message: 'Internal Server Error'

        });
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json({
                status:"Failed",
                message:"Email Is required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                status:"Failed",
                message: 'User not found'
            });
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpires = otpExpires;
        await user.save();


        await sendOTPEmail(user.email, otp);
        return res.status(200).json({
            status:"Success",
            message: 'OTP sent to email for password reset'
        });

    } catch (error) {

        return res.status(500).json({
            status:"Failed",
            message: 'Internal Server Error',
            error:error.message
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if(!email || !otp || !newPassword){

            return res.status(400).json({
                status:"Failed",
                message:"Provide All Fields"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(404).json({
                status:"Failed",
                message: 'User Not Found'
            });
        }

        if (user.resetPasswordOTP !== otp || new Date() > user.resetPasswordOTPExpires) {

            return res.status(400).json({
                status:"Failed",
                message: 'Invalid or expired OTP'
            });
        }

        user.password = newPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;
        await user.save();

        res.status(204).json({
            status:"Success",
            message: 'Password reset Successfully'
        });

    } catch (error) {

        return res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        })
    }
};

export const changePassword = async (req,res)=>{
    try {

        const {currentPassword,newPassword,confirmPassword} = req.body;

        if(!currentPassword||!newPassword||!confirmPassword){

            return res.status(400).json({
                status:"Failed",
                message:"All Fields Are required"
            });
        }

        if(newPassword !== confirmPassword){

            return res.status(400).json({
                status:"Failed",
                message:"Password do not Match"
            });
        }

        const user = await userModel.findById(req.user._id).select('+password')

        if(!user){
            return res.status(404).json({

                status:"Failed",
                message:"User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(currentPassword,req.user.password);

        if(!isMatch){
            return res.status(400).json({

                status:"Failed",
                message:"Current Password Is incorrect"
            })
        }

        user.password = newPassword;
        
        await user.save();

        return res.status(204).json({
            status:"Success",
            message:"Password Changed Successfuly"
        })
        
    } catch (error) {
        return res.status(500).json({
            status:"Failed",
            message:"Internal Server Error",
            error:error.message
        })
    }
}