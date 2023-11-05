import React, { forwardRef, useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorHandler() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: AxiosError | unknown) => {
      const errorMessage =
          error instanceof AxiosError ? error.message : JSON.stringify(error);
      setOpenSnackbar(true);
      setErrorMessage(errorMessage);
    };

    const interceptor = axios.interceptors.response.use(
        resInterceptor,
        errInterceptor
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const handleClose = (): void => {
    setOpenSnackbar(false);
  };

  return (
      <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleClose}
      >
        <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
  );
}

