export const getLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`https://x7dh58bh-8000.brs.devtunnels.ms/api/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.access) {
      localStorage.setItem('access', data.access);
      console.log('Token guardado en localStorage:', data.access);
    }

    return data;
  } catch (error) {
    console.error('Error en getLogin:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No se encontró el token de acceso en localStorage.");
    }

    const response = await fetch(
      "https://x7dh58bh-8000.brs.devtunnels.ms/api/users/me/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProfile:", error);
    throw error;
  }
};

export const updateProfile = async (id: number, updatedData: any) => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No se encontró el token de acceso en localStorage.");
    }

    const response = await fetch(
      `https://x7dh58bh-8000.brs.devtunnels.ms/api/users/update/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error(`Error al actualizar los datos: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updateProfile:", error);
    throw error;
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No se encontró el token de acceso en localStorage.");
    }

    const response = await fetch(
      "https://x7dh58bh-8000.brs.devtunnels.ms/api/users/password-change/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newPassword }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(
        data.detail || "Error al cambiar la contraseña. Verifica tus datos."
      );
    }

    return { message: "Contraseña cambiada exitosamente." };
  } catch (error) {
    console.error("Error en changePassword:", error);
    throw error;
  }
};

export const getRecognitions = async () => {
  try {

    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      throw new Error('No se encontró el token de acceso en localStorage.');
    }

    const response = await fetch(`https://x7dh58bh-8000.brs.devtunnels.ms/api/reports/dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getRecognitions:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No se encontró el token de acceso en localStorage.");
    }

    const response = await fetch("https://x7dh58bh-8000.brs.devtunnels.ms/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener usuarios: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getUsers:", error);
    throw error;
  }
};

export const toggleUserState = async (id: number) => {
  try {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      throw new Error("No se encontró el token de acceso en localStorage.");
    }

    const response = await fetch(
      `https://x7dh58bh-8000.brs.devtunnels.ms/api/users/state/${id}/`,
      {
        method: "PUT", // Cambiado a PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en la respuesta del backend:", errorData);
      throw new Error(errorData.message || "Error al cambiar el estado del usuario.");
    }

    const data = await response.json();
    console.log("Estado del usuario actualizado:", data); // Log para verificar la respuesta
    return data;
  } catch (error) {
    console.error("Error en toggleUserState:", error);
    throw error;
  }
};
