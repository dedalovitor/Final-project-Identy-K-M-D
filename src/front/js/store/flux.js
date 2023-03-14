const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      dataUser: null,
      userInfo: null,
      favorites: [],
    },

    actions: {
      getFavorites: async (id) => {
        const response = fetch(`${process.env.BACKEND_URL}/favorite/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setStore({
            favorites: data.data,
          });
          return data.data;
        }
      },
      addFavorite: async (id) => {
        fetch(`/addfavorite?id=${id}`, { method: "POST" })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            const element = elements.find((e) => e.id === id);
            setFavorites((favorites) => [...favorites, element]);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      FavoriteItem: async ({ favorite, onDelete }) => {
        const handleDelete = () => {
          fetch(`/deletefavorites/${favorite.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message);
              onDelete(favorite.id);
            })
            .catch((error) => console.error(error));
        };
      },
      getCurrentUser: async () => {
        const response = await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "content-Type": "application/json",
          },
          body: JSON.stringify({ user: localStorage.getItem("user") }),
        });
        const data = await response.json();
        if (response.ok) {
          setStore({
            dataUser: localStorage.getItem("user"),
            userInfo: data.data,
          });
          return data.user;
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
