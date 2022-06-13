# Blue Green App

This repo is meant to be used as a resource for a blue green deployment. I decided to create my own app, since most examples look like this:

![](https://via.placeholder.com/150/0000FF/000000?text=Blue)
![](https://via.placeholder.com/150/00FF00/000000?text=Green)

# Requirements

* System with the following applications installed:
    * istioctl
    * tkn
    * minikube
    * virtual machine (this example will use VirtualBox)

# Setup

Start minkube with:
  
```
minikube start --memory=16384 --cpus=8 --vm-driver=virtualbox 
```

Install tekton tasks:

```
tkn hub install task git-clone --version 0.6
tkn hub install task npm --version 0.1
tkn hub install task buildah --version 0.2
tkn hub install task kubernetes-actions --version 0.2
```

[Optional] install tekton dashboard:

```
kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/latest/tekton-dashboard-release.yaml
```

    * Istio
    * Kiali
    * Tekton

Install Tekton pipeline:
```
kubectl apply --filename \
https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```

Change
    Create a `secrets.yaml` file based on `tekton/secrets.example.yaml` by replacing `username` and `password`

# Running the code


Tekton dashboard:

```
kubectl port-forward -n tekton-pipelines service/tekton-dashboard 9097:9097
```

Get the app url:
```
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
echo $INGRESS_HOST:$INGRESS_PORT
```

Visit the output url and you should see the app

Running Kiali:
```
istioctl dashboard kiali
```




