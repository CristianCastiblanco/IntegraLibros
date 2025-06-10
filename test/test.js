import test from 'node:test'
import assert from 'node:assert'

test ('fetch', async () => {
  try {
    const response = await fetch('http://localhost:8081')
    
    if (response.status == 200) {
      // La respuesta fue exitosa
      console.log('Respuesta exitosa:', response.status)
    }

  } catch (error) {
    console.log('Error durante la solicitud:', error);
  }
})