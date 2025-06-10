import test from 'node:test'
import assert from 'node:assert'
import { assert } from 'node:console'

test ('fetch', async () => {
    const response = await fetch('http://localhost:8081')
    assert.eqaul(response.status_code, 200)
})