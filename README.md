# Blue Green App

This repo is meant to be used as a resource for a blue green deployment. I decided to create my own page, since most examples look like this:

![](https://via.placeholder.com/150/0000FF/000000?text=Blue)
![](https://via.placeholder.com/150/00FF00/000000?text=Green)

# Requirements

* System with the following applications installed:
    * minikube
    * istioctl
    * tkn
    * virtual machine (this example will use VirtualBox)

# Setup

Start minikube with (adapt to best suit your machine config):


## Kubernetes Apps Installation

```
minikube start --memory=16384 --cpus=8 --vm-driver=virtualbox 
```

### Install tekton:

Install Tekton pipelines:

```
kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
```

```
tkn hub install task git-clone --version 0.6
tkn hub install task buildah --version 0.3
tkn hub install task kubernetes-actions --version 0.2
```

[Optional] Install tekton dashboard:

```
kubectl apply --filename https://storage.googleapis.com/tekton-releases/dashboard/latest/tekton-dashboard-release.yaml
```

### Install Istio:

```
istioctl install --set profile=demo -y
```

Enable istio automatic injection
```
kubectl label namespace default istio-injection=enabled
```

Install Kiali:

```
kubectl apply --filename https://raw.githubusercontent.com/istio/istio/release-1.14/samples/addons/kiali.yaml
```
You can check deployment status with:
```
kubectl rollout status deployment/kiali -n istio-system
```

Install Prometheus:

```
kubectl apply --filename https://raw.githubusercontent.com/istio/istio/release-1.14/samples/addons/prometheus.yaml
```

## App Setup

Clone this app:
```
TODO
```
Change directories:
```
cd blue-green-app
```

### Deploy the Secret
Create a `secrets.yaml` file based on `tekton/secrets.example.yaml` by replacing `username` and `password`

```
kubectl apply -f secrets.yaml
```

### Deploy Base Resources
```
kubectl apply -f base/
kubectl apply -f tekton/ 
```

### Configure the App
You can go to `app/index.html` and change the color to css color names (red, green, blue, etc.)

And change `pipeline_run.yaml` version to v2

### Deploy the App
Run:

```
kubectl create -f pipeline_run.yaml
```


If you installed Tekton Dashboard, you can check the pipeline running:

```
kubectl port-forward -n tekton-pipelines service/tekton-dashboard 9097:9097
```

# Running the code

Get the app url:
```
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export INGRESS_HOST=$(kubectl get po -l istio=ingressgateway -n istio-system -o jsonpath='{.items[0].status.hostIP}')
echo $INGRESS_HOST:$INGRESS_PORT
```

Visit the output url and you should see the app



# Inspecting the Deployment

Running Kiali:
```
istioctl dashboard kiali
```

## Utility script
There is a utility script on the repo that can be run with:

```
./requests.sh [http://]<ip>:<port>
```
E.g. 
```
./request.sh http://192.168.59.100:30955
```
or 
```
./requests.sh 192.168.59.100:30955
```

And should output the following, highlighting the app version that is being fetched:
```
blue;
green;
```
