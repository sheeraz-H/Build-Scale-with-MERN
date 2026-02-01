import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // 1. Extract & validate user data
    const { fullName, email, username, password } = req.body;
    
    // Early validation exit
    const requiredFields = [fullName, email, username, password];
    if (requiredFields.some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    // 2. Check for existing user (optimized query)
    const existedUser = await User.findOne({
        $or: [
            { email },
            { username: username.toLowerCase() }
        ]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // 3. Handle file uploads safely
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // 4. Upload files to Cloudinary (parallel execution)
    const [avatar, coverImage] = await Promise.allSettled([
        uploadOnCloudinary(avatarLocalPath),
        coverImageLocalPath && uploadOnCloudinary(coverImageLocalPath)
    ]);

    // Validate avatar upload
    if (avatar.status === 'rejected' || !avatar.value?.url) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // 5. Create user with bcrypt (handled in User model pre-save hook)
    const user = await User.create({
        fullName: fullName.trim(),
        email: email.toLowerCase().trim(),
        username: username.toLowerCase().trim(),
        password,
        avatar: avatar.value.url,
        coverImage: coverImage.status === 'fulfilled' ? coverImage.value.url : ""
    });

    // 6. Return sanitized user (password/refreshToken excluded)
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Failed to register user");
    }

    // 7. Success response (production standard)
    res.status(201).json(
        new ApiResponse(createdUser, "User registered successfully", true, 201)
    );
});

export { registerUser };
