import React, { useEffect, useState } from "react";
import { axiosRequest } from "../utils/axiosConfig";

export const History = ({ totalCorrects, timeTable }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        setIsLoading(true);
        const res = await axiosRequest.get("/math/math_results");

        setData(res.data);
        setIsLoading(false);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-start">
        {isLoading ? (
          <div className="loader"></div>
        ) : (
          <table className="border border-slate-400 border-separate border-spacing-4">
            <thead>
              <tr>
                <th className="py-1 px-3 border border-slate-300">Addition</th>
                <th className="py-1 px-3 border border-slate-300">
                  Subtraction
                </th>
                <th className="py-1 px-3 border border-slate-300">
                  Multiplication
                </th>
                <th className="py-1 px-3 border border-slate-300">Division</th>
                <th className="py-1 px-6 border border-slate-300">Total</th>
                <th className="py-1 px-3 border border-slate-300">
                  Submition Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((data) => {
                return (
                  <tr className="" key={data.math_results_id}>
                    <td className="border border-slate-300 text-center">
                      {data.Addition}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {data.Subtraction}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {data.Multiplication}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {data.Division}
                    </td>
                    <td className="border border-slate-300 text-center font-bold">
                      {data.total_math_result}
                    </td>
                    <td className="border border-slate-300 text-center">
                      {data.created_at.slice(0, 10)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
