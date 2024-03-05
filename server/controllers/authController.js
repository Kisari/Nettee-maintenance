const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const Thread = require("./../models/threadModel");
const sendEmail = require("./../utils/email");
const { promisify } = require("util");
const StreamChat = require("stream-chat").StreamChat;
const axios = require("axios");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

// const connectToStreamChat = async (id, name, image) => {
//   const streamchat = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_KEY_SECRET);

//   //check if the user is existed
//   const isExist = await streamchat.queryUsers({ id });
//   if (isExist.users.length > 0) {
//     const token = streamchat.createToken(id);
//     return token
//   } else {
//     await streamchat.upsertUser({ id, name, image });
//     const token = streamchat.createToken(id);
//     return token
//   }
// }

const createSendToken = async (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  // const streamToken = await connectToStreamChat(
  //   user._id.toString(),
  //   user.name,
  //   user.image
  // );

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
    // streamToken,
  });
};

exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const data = {
    username: `${req.body.email}`,
    first_name: `${req.body.name}`,
    email: `${req.body.email}`,
    secret: `${req.body.email}`,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.chatengine.io/users/",
    headers: {
      "PRIVATE-KEY": "debcf359-8bde-4f01-97fc-40a5100959c8",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

  createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
  // Check if email and password exists
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      res.status(400).json({
        status: "Please provide email and password!",
      })
    );
  }
  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  // If everything is ok, send token to client
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      res.status(401).json({
        status: "Incorrect email or password",
      })
    );
  }
  createSendToken(user, 200, res);
};

exports.getAllUser = async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json({
      status: "Success",
      results: userData.length,
      data: {
        userData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed to get all user",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Successfully updated user data",
      data: {
        userData,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed updating user data",
      message: err,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        res.status(404).json({
          status: "There is no user with email address",
        })
      );
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        res.status(500).json({
          status: "There was an error sending the email. Try again later!",
        })
      );
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(
      res.status(400).json({
        message: "Token is invalid or has expired",
      })
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send
  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    return next(
      res.status(401).json({
        status: "You are not logged in! Please log in to get access.",
      })
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      res.status(401).json({
        status: "The user belonging to this token does no longer exist.",
      })
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      res.status(401).json({
        status: "User recently changed password! Please log in again.",
      })
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

exports.updatePassword = async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
};

exports.likeUnlikePost = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const post = await Thread.findByIdAndUpdate(req.params.id);
    if (!post) {
      return next(
        res.status(404).json({
          status: "Post not found",
        })
      );
    }

    if (post.likes.includes(currentUser._id)) {
      const index = post.likes.indexOf(currentUser._id);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        message: "Post unliked",
      });
    } else {
      post.likes.push(currentUser._id);
      await post.save();
      return res.status(200).json({
        message: "Post liked",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Function Like/Unlike failed",
      message: err,
    });
    console.log(err);
  }
};

exports.pinUnpinnedPost = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const post = await Thread.findByIdAndUpdate(req.params.id);
    if (!post) {
      return next(
        res.status(404).json({
          status: "Post not found",
        })
      );
    }

    if (post.pins.includes(currentUser._id)) {
      const index = post.pins.indexOf(currentUser._id);
      post.pins.splice(index, 1);
      await post.save();

      return res.status(200).json({
        message: "Post unpinned",
      });
    } else {
      post.pins.push(currentUser._id);
      await post.save();
      return res.status(200).json({
        message: "Post pinned",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Function Pin/Unpinned failed",
      message: err,
    });
    console.log(err);
  }
};

exports.tagUntaggedPost = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const post = await Thread.findByIdAndUpdate(req.params.id);
    if (!post) {
      return next(
        res.status(404).json({
          status: "Post not found",
        })
      );
    }

    if (post.tags.includes(currentUser._id)) {
      const index = post.tags.indexOf(currentUser._id);
      post.tags.splice(index, 1);
      await post.save();

      return res.status(200).json({
        message: "Post untagged",
      });
    } else {
      post.tags.push(currentUser._id);
      await post.save();
      return res.status(200).json({
        message: "Post tagged",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Function Tag/Untagged failed",
      message: err,
    });
    console.log(err);
  }
};

exports.shareUnsharedPost = async (req, res, next) => {
  try {
    // Params id here is the id of the thread
    const threadData = await Thread.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!threadData) {
      return next(
        res.status(404).json({
          status: "Thread not found",
        })
      );
    } else {
      res.status(200).json({
        status: "Successfully shared",
        data: threadData,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Function Share/Unshared failed",
      message: err,
    });
    console.log(err);
  }
};
