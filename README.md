# A socket chat app abstracted from socket.io's examples

## Ported to work in kubernetes as a means of reference and learning

## Run locally in docker
`docker-compose build && docker-compose up`


# To install using helm / kubernetes
1. Navigate to deploy directory
```cd deploy/```

2. Modify any values you wish to change in `values.yaml`

3. Update dependencies from `./requirements.yaml` with
```helm dependency update .```

4. Run deployment where <name> is the deployment name you wish to use
```helm install -n <name> .```
