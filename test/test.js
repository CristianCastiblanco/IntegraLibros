import test from 'node:test'
import assert from 'node:assert'

test ('fetch', async () => {
    const response = await fetch('http://localhost:8081')
    
    if (response.status == 200) {
      // La respuesta fue exitosa
      console.log('Respuesta exitosa:', response.status)
    } else {
      // La respuesta no fue exitosa
      console.error(`Error al obtener la página: ${response.status}`);
    }
})