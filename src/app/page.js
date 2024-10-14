"use client";
import React, { useEffect, useState } from "react";
import useSWR from 'swr';
import fetchPoints from "@/app/utils/fetchPoints";

export default function Component() {
  const { data: points, error, isLoading } = useSWR('/api/points', fetchPoints, {
    refreshInterval: 10000, 
  });
  
  const [seatLayout, setSeatLayout] = useState([[], [], [], [], [], [], [], []]);

  useEffect(() => {
    if (points) {
      generateSeatLayout(points);
    }
  }, [points]);

  const generateSeatLayout = (pointsArray) => {
    let newSeatLayout = [[], [], [], [], [], [], [], []];
    let globalIndex = 0;

    // Fill first 4 rows (0-3)
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        if (globalIndex >= pointsArray.length) return;
        newSeatLayout[j].push(pointsArray[globalIndex].number);
        globalIndex++;
      }
    }

    // Fill last 4 rows (4-7)
    for (let i = 0; i < 14; i++) {
      for (let j = 4; j < 8; j++) {
        if (globalIndex >= pointsArray.length) return;
        newSeatLayout[j].push(pointsArray[globalIndex].number);
        globalIndex++;
      }
    }

    setSeatLayout(newSeatLayout);
  };

  if (error) return <div>Error loading points</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-2 flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-4 text-center">
        ZAPEŁNIENIE SPORT ARENA ŁÓDŹ
      </h1>
      <div className="flex flex-col md:flex-row gap-8 flex-grow">
        <div className="md:w-1/5 flex">
          <div className="bg-blue-600 px-6 rounded-2xl shadow-lg flex items-center justify-center w-full">
            <span className="text-white text-3xl font-bold md:rotate-0 md:writing-mode-vertical-rl">
              Scena
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col-reverse">
            {seatLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={
                  row[0] === 4
                    ? "flex my-4 border-2 border-dashed border-indigo-300 rounded-xl bg-gray-800 bg-opacity-50 mt-10"
                    : "flex my-4 border-2 border-dashed border-indigo-300 rounded-xl bg-gray-800 bg-opacity-50"
                }
              >
                {row.map((seat, seatIndex) => (
                  <div key={seatIndex} className="rounded-lg px-4 py-3">
                    <div
                      className={
                        points[seat - 1]?.active
                          ? "bg-green-300 flex items-center justify-center text-sm font-bold text-white w-20 h-12 rounded-2xl text-black"
                          : "bg-red-600 flex items-center justify-center text-sm font-bold text-white w-20 h-12 rounded-2xl"
                      }
                    >
                      {seat}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
