import React, { useEffect, useState } from "react";
import AuthImagePattern from "../../components/AuthImagePattern/AuthImagePattern";
import { useAuthStore } from "../../store/useAuthStore";
import { ErrorToast } from "../../components/Toast/Toasters";
import SendLoader from "../../components/Spinner/SendLoader";

import { useNavigate } from "react-router-dom";
export default function ConfirmDisable() {
  const navigate = useNavigate();
  const [Password, setPassword] = useState("");
  const [Code, setCode] = useState("");
  const {
    ConfirmDisableAccount,
    isConfirmingDisable,
    DisableAccount,
    isDisabling,
    CancelOperations,
    authUser,
    isCancelingOperations,
  } = useAuthStore();
  useEffect(() => {
    if (
      !authUser.user.codeAuthentication ||
      authUser.user.codeType !== "email_verification"
    ) {
      ErrorToast("You are not authorized to access this page.");
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="flex flex-col text-center justify-center items-center min-h-screen px-6 md:px-24 gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="size-20 rounded-xl p-2 bg-second/25 flex items-center justify-center hover:bg-main/25 transition-all shadow-md">
              <img
                src=" /Let's Topic mlogo.png"
                alt="Let's Topic"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h1 className="text-xl font-semibold  px-4 py-2 rounded-lg shadow">
              Changing Password
            </h1>
            <p className="text-sm text-base-content/70">
              fill out these data to change your password
            </p>
          </div>
          <input
            type="text"
            placeholder="Code"
            className="w-full max-w-lg p-4 pl-5 rounded-lg border transition-all border-main focus:ring-2 focus:outline-none focus:ring-main text-sm shadow-sm"
            onChange={(e) => setCode(e.target.value)}
            value={Code}
          />
          <div className="flex gap-4 w-full max-w-lg max-sm:flex-col">
            <input
              type="text"
              placeholder="Password"
              className="w-full max-w-lg p-4 pl-5 rounded-lg border transition-all border-main focus:ring-2 focus:outline-none focus:ring-main text-sm shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              onPaste={(e) => {
                e.preventDefault();
                ErrorToast("You cannot paste text in this input.");
              }}
              onCopy={(e) => {
                e.preventDefault();
                ErrorToast("You cannot copy text in this input.");
              }}
            />
          </div>
          <button
            className="btn bg-main disabled:bg-main/60 hover:bg-main/80 w-full max-w-lg"
            onClick={async () => {
              await navigate("/");
            }}
            disabled={!Password.trim() || !Code.trim()}
            type="submit"
          >
            {isConfirmingDisable ? (
              <SendLoader color={"#645EE2"} />
            ) : (
              "Change Password"
            )}
          </button>
          <div className="w-full max-w-lg flex flex-row justify-between items-center gap-6">
            <button className="btn border-main border-2 bg-transparent flex-1 hover:bg-main hover:text-white text-main rounded-md font-semibold transition-all ring-0">
              Resend
            </button>
            <button
              onClick={async () => {
                await CancelOperations({
                  id: authUser.user._id,
                  code: Code,
                });
                navigate("/");
              }}
              className="btn flex-1 border-main border-2 disabled:border-gray-600 disabled:text-gray-500 bg-transparent hover:bg-main hover:text-white text-main rounded-md font-semibold transition-all ring-0"
              disabled={!Code.trim()}
            >
              {isCancelingOperations ? (
                <SendLoader color={"#645EE2"} />
              ) : (
                "Cancel Request"
              )}
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center p-12">
          <AuthImagePattern
            title={"Change your Password"}
            subtitle={
              "Enter the code sent to your email to verify and change your password."
            }
          />
        </div>
      </div>
    </>
  );
}
