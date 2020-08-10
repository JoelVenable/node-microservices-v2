const { config } = require('dotenv')
const execAsync = require('./execAsync')
const path = require('path')
const { promises: fs } = require('fs');

config();

const secrets = {
    'jwt-secret': ['JWT_SIGNING_KEY']
}
const namespace = 'ticketing'

const template = `
apiVersion: v1
kind: Secret
metadata:
  name: {{secretName}}
  namespace: ${namespace}
type: Opaque
stringData:
{{secrets}}
`


const setSecrets = async () => {
    const filePath = path.join(__dirname, 'infra/k8s-static/secrets.yml');
    const secretArr = Object.entries(secrets)
    const fileContents = secretArr.map(([secretName, secrets], index) => {
        let secretObj = template
            .replace('{{secretName}}', secretName)
            .replace('{{secrets}}', secrets.map((envVar) => {
                const secretValue = process.env[envVar]
                if (typeof secretValue !== 'string') throw new Error(`Missing secret value for: ${envVar}`)
                return `  ${envVar}: ${Buffer.from(secretValue).toString('base64')}`
            }).join('\n'))
        if (secretArr.length - 1 !== index) secretObj += '\n---\n'
        return secretObj
    }).join('')

    await fs.writeFile(filePath, fileContents)
}

setSecrets();
