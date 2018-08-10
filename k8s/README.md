# Install redis through helm
`$ helm install -n redis --set usePassword=false stable/redis`

# Minikube
## Ensure ingress is enabled in windows
`$ minikube.exe addons enable ingress`

## Ensure local host resolution is pointing to the minikube IP, not localhost
retrieve local minikube ip `minikube ip` and edit hosts