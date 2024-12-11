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


