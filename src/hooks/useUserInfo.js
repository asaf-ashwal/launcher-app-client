import axios from "axios";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useUserinfo = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      error: null,
      isLoading: null,
      setLogout: () => set({user: null, token: null}),
      setLogin: async ({username, password}, setMessage) => {
        set({isLoading: true});
        try {
          const {data: token} = await axios.post(
            "http://localhost:3000/api/auth/login",
            {
              username,
              password,
            },
          );
          set({token});
          const {data: user} = await axios.get(
            "http://localhost:3000/api/auth/getUser",
            {headers: {token}},
          );
          set({user});
          setMessage({class: "good", message: "laucher added secssasfuly"});
          setTimeout(() => {
            setMessage({message: "", class: ""});
          }, 4000);
        } catch (err) {
          console.error(err.message);
          setMessage({class: "form-error", message: err.message});
          setTimeout(() => {
            setMessage({message: "", class: ""});
          }, 4000);
          set({error: err.message});
        } finally {
          set({isLoading: false});
        }
      },
    }),
    {name: "storage"},
  ),
);
