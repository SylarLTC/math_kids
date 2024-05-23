import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl, postRequest } from "../utils/service";

export const VerifyEmail = () => {
  const { currentUser, updateCurrentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    (async () => {
      if (currentUser?.isVerified === 1) {
        setTimeout(() => {
          return navigate("/");
        }, 3000);
      } else {
        if (emailToken) {
          setIsLoading(true);

          const res = await postRequest(
            `${baseUrl}/auth/verify-email`,
            JSON.stringify({ emailToken })
          );

          setIsLoading(false);

          if (res.error) {
            console.log(res);
            return setError(res);
          }

          return updateCurrentUser({ ...res, isVerified: 1, emailToken: null });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailToken, currentUser]);

  return (
    <div className="flex justify-center items-center h-screen bg-orange-50">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <div>
          {currentUser?.isVerified === 1 ? (
            <div>Email succesfully verified, redirecting...</div>
          ) : (
            <div>
              {error ? (
                <div>{error.message}</div>
              ) : (
                <div className="text-2xl leading-loose">
                  We sent you a verification letter, Please check your email.
                  <br />
                  If you will not find the email from us, please check the spam
                  folder.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
