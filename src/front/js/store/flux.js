const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUserEmail: null,
    },

    actions: {
      sendLoginRegionCredential: async (email, password) => {
        const response = await fetch(
          process.env.BACKEND_URL + "/api/loginregion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          setStore({ currentUserEmail: data.email });
          // await actions.getCurrentUserEmail();
        } else {
          setError(true);
        }
      },

      getCurrentUserEmail: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (response.ok) setStore({ currentUserEmail: data.email });
      },
      logout: () => {
        try {
          localStorage.removeItem("token");
          setStore({ currentUserEmail: null });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      },
    },
  };
};

export default getState;
