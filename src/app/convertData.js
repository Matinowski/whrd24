"use client"


export default function convert (pointsArray) {

    const seatLayout = [[], [], [], [], [], [], [], []];

let globalIndex = 0;
if (globalIndex == 112) {
    globalIndex -= 1
}

// Używamy pętli do przekształcenia tablicy points w seatLayout
for (let i = 0; i < 14; i++) {
  for (let j = 0; j < 4; j++) {
    console.log(globalIndex + " a")
    seatLayout[j].push(points[globalIndex].number);
    globalIndex++;
  }
}


for (let i = 0; i < 14; i++) {
    for (let j = 4; j < 8; j++) {
      console.log(globalIndex + " a")
      seatLayout[j].push(points[globalIndex].number);
      globalIndex++;
    }
  }

return seatLayout

}