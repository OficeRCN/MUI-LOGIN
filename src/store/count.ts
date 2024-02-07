// import create from "zustand";
// import axios from "../libs/axios";

// interface CounterState {
//   count: number;
//   decrement: () => void;
//   getCupos: () => Promise<void>;
// }

// export const countState = create<CounterState>((set) => {
//   let initialCount = 0;

//   const getCupos = async () => {
//     if (initialCount === 0) {
//       const cupos = await axios.get("http://localhost:3000/getmaxcupos");
//       initialCount = cupos.data.msg.maxCupos;
//       set({ count: initialCount });
//     }
//   };

//   return {
//     count: initialCount,
//     getCupos,
//     decrement: () => {
//       if (initialCount > 0) {
//         initialCount--;
//         set({ count: initialCount });
//       }
//     },
//   };
// });

import create from "zustand";
import axios from "../libs/axios";

interface CounterState {
  count: number;
  decrement: () => void;
  getCupos: () => Promise<void>;
}

export const countState = create<CounterState>((set) => {
  let initialCount = 0;
  let idConfig = 0; 
  let link = ""; 

  const getCupos = async () => {
    const cupos = await axios.get("http://localhost:3000/allconfigs");
    initialCount = cupos.data[0].cantidadCupos; 
    idConfig = cupos.data[0].id; 
    link = cupos.data[0].linksReuniones; 
    set({ count: initialCount });
  };

  const decrement = async () => {
    if (initialCount > 0) {
      initialCount--;
      await axios.put("http://localhost:3000/configs", {
        cantidadCupos: initialCount,
        linkReuniones: link,
        id: idConfig
      });
      set({ count: initialCount });
    }
  };

  return {
    count: initialCount,
    getCupos,
    decrement,
  };
});
