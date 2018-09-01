# Install redis through helm
`helm install -n redis --set usePassword=false stable/redis`
`helm install -n redis --set password=testpassword stable/redis`

# Minikube
## Ensure ingress is enabled in windows
`$ minikube.exe addons enable ingress`

## Ensure local host resolution is pointing to the minikube IP, not localhost
retrieve local minikube ip `minikube ip` and edit hosts

## Configure SSL
`helm install stable/kube-lego --namespace kube-system --set config.LEGO_EMAIL=randy.mikkelsaar@gmail.com,config.LEGO_URL=https://acme-v01.api.letsencrypt.org/directory`
