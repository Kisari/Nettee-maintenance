import React from "react";
import {
  Grid,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Link,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewUser } from "../../actions/user";

export default function Signup() {
  // const updateObject = useSelector((state) => state.testReducer.find((eles) => eles?._id === edit));
  const history = useNavigate();
  const dispatch = useDispatch();
  const secondary = grey[500];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createNewUser(data, history));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            padding: [2, 4],
          }}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
                variant="outlined"
                {...register("name", {
                  required: "Your must specific your name",
                })}
                error={Boolean(errors.name)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                {...register("email", {
                  required: "E-mail Address is required.",
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                {...register("password", {
                  required: "Password is required.",
                  // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Password is required",
                  // pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                })}
                error={Boolean(errors.passwordConfirm)}
                helperText={errors.passwordConfirm?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="medium"
            sx={{
              padding: [1, 1],
              marginY: [3, 2],
            }}
          >
            Register
          </Button>
          <Grid
            container
            columnSpacing={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // marginTop: "12px"
            }}
          >
            <Grid item>
              <Typography
                component="span"
                color={secondary}
                sx={{
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Already have an account?
              </Typography>
            </Grid>
            <Grid item>
              <Link
                href="/login"
                underline="none"
                variant="span"
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
