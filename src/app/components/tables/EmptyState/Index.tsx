// import React from "react";

export default function EmptyState() {
  return (
    <div className="w-full bg-white h-96 flex justify-center items-center border mt-5">
      <div className="flex flex-col items-center justify-center">
        <div>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 40V50M15 10V20M17.5 45H7.5M20 15H10M32.5 10L36.8821 21.1109C37.3519 22.3021 37.5868 22.8976 37.9464 23.3999C38.2652 23.845 38.655 24.2348 39.1001 24.5536C39.6024 24.9132 40.1979 25.1481 41.3891 25.6179L52.5 30L41.3891 34.3821C40.1979 34.8519 39.6024 35.0868 39.1001 35.4464C38.655 35.7652 38.2652 36.155 37.9464 36.6001C37.5868 37.1024 37.3519 37.6979 36.8821 38.8891L32.5 50L28.1179 38.8891C27.6481 37.6979 27.4132 37.1024 27.0536 36.6001C26.7348 36.155 26.345 35.7652 25.8999 35.4464C25.3976 35.0868 24.8021 34.8519 23.6109 34.3821L12.5 30L23.6109 25.6179C24.8021 25.1481 25.3976 24.9132 25.8999 24.5536C26.345 24.2348 26.7348 23.845 27.0536 23.3999C27.4132 22.8976 27.6481 22.3021 28.1179 21.1109L32.5 10Z"
              stroke="#036E03"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-center mt-5 w-8/12 m-auto text-lg text-slate-600">
          Sorry, No information yet, Click on any quick actions above
        </p>
      </div>
    </div>
  );
}
