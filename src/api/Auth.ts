import axios from "../libs/axios";

export const loginRequest = async (usuario: string, contrasenia: string) => {
  const data = await axios.post("/login", {
    usuario,
    contrasenia,
  });

  console.log(data);

  return data;
};

export const userRequest = async () => {
  return await axios.get("/user");
};
