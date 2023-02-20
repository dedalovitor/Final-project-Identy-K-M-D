const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataUser: null,
    },

    actions: {

      getCurrentUser: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-Type": "application/json",
          },
          body: JSON.stringify({ "user": localStorage.getItem("user") })
        });
        const data = await response.json();
        if (response.ok) {
          setStore({ dataUser: localStorage.getItem("user"), userInfo: data.data });
          return data.user
        }

      },
      logout: () => {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setStore({ dataUser: null });
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
