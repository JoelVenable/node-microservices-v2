const { config } = require('dotenv')
const execAsync = require('./execAsync')
const path = require('path')
const { promises: fs } = require('fs');

config();

const secrets = {
    'jwt-secret': ['JWT_SIGNING_KEY']
}

const template = `
apiVersion: v1
kind: Secret
metadata:
  name: {{secretName}}
type: Opaque
stringData:
  config.yaml: |-
{{secrets}}
`


const setSecrets = async () => {
    const filePath = path.join(__dirname, 'infra/k8s/secrets.yml');
    const secretArr = Object.entries(secrets)
    const fileContents = secretArr.map(([secretName, secrets], index) => {
        let secretObj = template
            .replace('{{secretName}}', secretName)
            .replace('{{secrets}}', secrets.map((envVar) => {
                const secretValue = process.env[envVar]
                if (typeof secretValue !== 'string') throw new Error(`Missing secret value for: ${envVar}`)
                return `    ${envVar}: ${secretValue}`
            }).join('\n'))
        if (secretArr.length - 1 !== index) secretObj += '\n---\n'
        return secretObj
    }).join('')

    await fs.writeFile(filePath, fileContents)
}

setSecrets();